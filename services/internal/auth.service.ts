import secureStorageService from '@services/internal/secureStorage.service'
import { fetchDiscoveryAsync, TokenResponse } from 'expo-auth-session'
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'

export type TListener = (
  session: Record<string, string> | null,
  tokens: TokenResponse | null
) => void

/**
 * Service to handle auth tokens
 */
class AuthService {
  private session: Record<string, string> | null
  private tokens: TokenResponse | null
  private listeners: Record<string, TListener>
  private refreshPromise?: Promise<TokenResponse>

  constructor() {
    this.session = null
    this.tokens = null
    this.listeners = {}

    this.rehydrate()
  }

  /**
   * Load session on start and notify all listeners
   */
  public rehydrate = async () => {
    const stored = await secureStorageService.getAuthSession()
    this.setSession(stored)
  }

  /**
   * Get session params from auth
   * @returns session params
   */
  public getSession = async () => {
    /**
     * If session null, try to load from storage
     */
    if (this.session === null) {
      const session = await secureStorageService.getAuthSession()

      if (session) {
        this.session = session
        return session
      }
    }

    return this.session
  }

  /**
   * Get tokens from session
   * @returns parsed tokens
   */
  public getTokens = async () => {
    if (!this.tokens) {
      const session = await this.getSession()

      if (session) {
        return TokenResponse.fromQueryParams(session)
      }

      return null
    }

    return this.tokens
  }

  /**
   * Set session and notify listeners
   * @param session session
   */
  public setSession = async (session: Record<string, string> | null) => {
    if (session) {
      this.session = session
      this.tokens = session ? TokenResponse.fromQueryParams(session) : null
      secureStorageService.setAuthSession(this.session)
    } else {
      secureStorageService.clearAuthSession()
    }

    for (const listener of Object.values(this.listeners)) {
      listener(this.session, this.tokens)
    }
  }

  /**
   * Register listener for session changes
   * @param listener listener cb
   * @returns unsubscribe function
   */
  public addEventListener = (listener: TListener) => {
    /**
     * Store reference
     */
    const id = uuid.v4() as string
    this.listeners[id] = listener

    /**
     * Call listener
     */
    listener(this.session, this.tokens)

    /**
     * Return unsubscribe
     */
    return () => this.removeListener(id)
  }

  /**
   * Unregister listener
   * @param id id of listener
   */
  private removeListener = (id: string) => {
    delete this.listeners[id]
  }

  /**
   * Refresh tokens
   * @returns new tokens
   */
  public refreshAccessToken = async () => {
    /**
     * If refreshing return existing promise
     */
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    /**
     * Refresh tokens
     * @throws refresh error
     * @returns tokes
     */
    const refreshFuncPromise = async () => {
      const tokens = await this.getTokens()

      if (!tokens || !tokens.refreshToken) {
        throw new Error("Can't refresh tokens")
      }

      // TODO: REFRESH
      const document = await fetchDiscoveryAsync(
        `https://login.microsoftonline.com/${Constants.manifest?.extra?.azureTenantId}/v2.0`
      )
      const freshTokens = await tokens.refreshAsync(
        { clientId: Constants.manifest?.extra?.azureClientId },
        document
      )

      const serialized = JSON.parse(JSON.stringify(freshTokens))
      const newSession = { ...this.session, ...serialized }
      await this.setSession(newSession)

      return freshTokens
    }

    /**
     * Start refresh and wait to finish.
     * After that clean promise and return tokens
     * Or clear auth
     */
    this.refreshPromise = refreshFuncPromise()
    try {
      const newTokens = await this.refreshPromise
      return newTokens
    } catch (error) {
      this.setSession(null)
      throw error
    } finally {
      this.refreshPromise = undefined
    }
  }
}

const authService = new AuthService()
export default authService
