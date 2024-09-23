import secureStorageService from '@services/internal/secureStorage.service'
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import decode from 'jwt-decode'
import { IAuthSession, IAzureToken, TListener } from 'types/authService.d'
import {
  ILoginReqParams,
  ILoginRes,
  IRefreshReqParams,
} from '@models/azure/authRequests/authRequests'
import {
  loginReqValidation,
  loginResValidation,
  refreshReqValidation,
} from '@models/azure/authRequests/authRequests.schema'
import createXWwwForm from '@utils/api/createXWwwForm'
import axios, { AxiosResponse } from 'axios'
import { captureException } from './sentry.service'

/**------------------------------------------------------------------------------------------------
 **                                   Constants
 *------------------------------------------------------------------------------------------------**/

const REQUIRED_SCOPES = new Set([
  `api://${Constants.expoConfig?.extra?.azureClientId}/user_auth`,
  'offline_access',
])
const BASE_URL = 'https://login.microsoftonline.com'
const AUTH_BASE_URL = `${BASE_URL}/${Constants.expoConfig?.extra?.azureTenantId}`

/**================================================================================================
 * ?                                    ABOUT
 * @description    : Service for handling auth flows as login/logout/refresh-token
 *================================================================================================**/
class AuthService {
  private session: IAuthSession | null
  private decoded: IAzureToken | null
  private listeners: Record<string, TListener>
  private refreshPromise?: Promise<IAuthSession>

  constructor() {
    this.session = null
    this.listeners = {}
    this.decoded = null
    this.rehydrate()
  }

  /**
   * Load session on start and notify all listeners
   */
  public rehydrate = async () => {
    const accessToken = await secureStorageService.getAccessToken()
    const refreshToken = await secureStorageService.getRefreshToken()
    if (accessToken && refreshToken) {
      await this.setSession({ accessToken, refreshToken })
    } else {
      await this.setSession(null)
    }
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
      await this.rehydrate()
    }

    return this.session
  }

  /**
   * Get tokens from session
   * @returns parsed tokens
   */
  public getDecoded = async () => {
    /**
     * If decoded null, try to load from storage
     */
    if (!this.decoded) {
      await this.rehydrate()
    }

    return this.decoded
  }

  /**
   * Set session and notify listeners
   * @param session session
   */
  private setSession = async (session: IAuthSession | null) => {
    if (session) {
      try {
        this.session = session
        this.decoded = decode<IAzureToken>(session.accessToken)
        await secureStorageService.setAccessToken(session.accessToken)
        await secureStorageService.setRefreshToken(session.refreshToken)
      } catch (error) {
        captureException(error)
      }
    } else {
      this.session = null
      this.decoded = null
      await secureStorageService.clearAuthTokens()
    }

    for (const listener of Object.values(this.listeners)) {
      listener(this.session, this.decoded)
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
    listener(this.session, this.decoded)

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
   * Refresh tokens function
   * ! Don't use alone, use refreshAccessToken instead
   * @throws refresh error
   * @returns tokes
   */
  private refreshFuncPromise = async () => {
    const tokens = await this.getSession()

    if (!tokens || !tokens.refreshToken) {
      throw new Error("Can't refresh tokens")
    }

    const params: IRefreshReqParams = {
      grant_type: 'refresh_token',
      refresh_token: tokens.refreshToken,
      client_id: Constants.expoConfig?.extra?.azureClientId,
      scope: Array.from(REQUIRED_SCOPES.values()).join(' '),
    }

    const validated = refreshReqValidation.validateSync(params)
    const [reqBody, headers] = createXWwwForm(validated)

    const response: AxiosResponse<ILoginRes> = await axios.post(
      `${AUTH_BASE_URL}/oauth2/v2.0/token`,
      reqBody,
      { headers }
    )
    const responseData = loginResValidation.validateSync(response.data)

    const newSession: IAuthSession = {
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token,
    }
    await this.setSession(newSession)

    return newSession
  }

  /**
   * Refresh tokens
   * @returns new tokens
   */
  public refreshAccessToken = async () => {
    /**
     * If refreshing wait for ongoing request
     */
    if (this.refreshPromise) {
      const newSession = await this.refreshPromise
      return newSession
    }

    /**
     * Start refresh and wait to finish.
     * After that clean promise and return tokens
     * Or clear auth
     */
    this.refreshPromise = this.refreshFuncPromise()
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

  /**
   * Authenticate user with credentials
   * @param username username of user
   * @param password users password
   * @param scopes scopes/permissions
   * @returns promise
   */
  public authenticate = async (
    username: string,
    password: string,
    scopes: string[] = []
  ) => {
    /**
     * Create unique scopes
     */
    const finalScopes = new Set(REQUIRED_SCOPES)
    for (const scope of scopes) {
      finalScopes.add(scope)
    }

    const reqParams: ILoginReqParams = {
      client_id: Constants.expoConfig?.extra?.azureClientId,
      grant_type: 'password',
      username,
      password,
      scope: Array.from(finalScopes.values()).join(' '),
    }
    const validated = loginReqValidation.validateSync(reqParams)
    const [reqBody, headers] = createXWwwForm(validated)

    try {
      const response: AxiosResponse<ILoginRes> = await axios.post(
        `${AUTH_BASE_URL}/oauth2/v2.0/token`,
        reqBody,
        { headers }
      )
      const responseData = loginResValidation.validateSync(response.data)

      const newSession: IAuthSession = {
        accessToken: responseData.access_token,
        refreshToken: responseData.refresh_token,
      }
      await this.setSession(newSession)
      return newSession
    } catch (error) {
      throw (error as any).response
    }
  }

  /**
   * Clear tokens
   * ? Look for API logout on azure
   */
  public revokeTokens = async () => {
    await this.setSession(null)
  }
}

const authService = new AuthService()
export default authService
