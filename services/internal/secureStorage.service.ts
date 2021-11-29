import { TokenResponse } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import { EStorage } from '../../types/storage.d'
/**
 * Service for secure storage on device
 * https://docs.expo.dev/versions/latest/sdk/securestore/
 */

/**
 * Store key value pair to secure storage
 * @param key key of item
 * @param value value to store for key
 */
async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

/**
 * Store key value pair to secure storage
 * @param key key of item
 * @param value value to store for key
 */
async function clear(key: string) {
  await SecureStore.deleteItemAsync(key)
}

/**
 * Get value for given key
 * @param key key of value
 * @returns value or null
 */
async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key)
  return result ?? null
}

/**
 * Store access token to storage
 * @param token access token to store
 * @returns promise
 */
function setAuthSession(session: Record<string, string>) {
  return save(EStorage.azureSession, JSON.stringify(session))
}

/**
 * Get azure session from storage or null
 * @returns promise
 */
async function getAuthSession(): Promise<Record<string, string> | null> {
  const session = await getValueFor(EStorage.azureSession)

  if (session) {
    return JSON.parse(session)
  }

  return null
}

/**
 * Clear tokens from storage
 */
async function clearAuthSession() {
  await clear(EStorage.azureSession)
}

/**
 * Save udr id of app
 * @param udrId udr id to store
 * @returns promise
 */
function setSelectedUdr(udrId: string) {
  return save(EStorage.selectedUdr, udrId)
}

/**
 * Get udr id of app
 * @returns promise
 */
function getSelectedUdr() {
  return getValueFor(EStorage.selectedUdr)
}

/**
 * Clear udr id of app
 * @returns promise
 */
function clearSelectedUdr() {
  return clear(EStorage.selectedUdr)
}

const secureStorageService = {
  /**
   * Tokens
   */
  setAuthSession,
  getAuthSession,
  clearAuthSession,
  /**
   * udr
   */
  setSelectedUdr,
  getSelectedUdr,
  clearSelectedUdr,
}

export default secureStorageService
