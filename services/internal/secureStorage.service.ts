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
function setAccessToken(token: string) {
  return save(EStorage.azureAccessToken, token)
}

/**
 * Get access token from storage
 * @returns promise
 */
function getAccessToken() {
  return getValueFor(EStorage.azureAccessToken)
}

/**
 * Store refresh token to storage
 * @param token refresh token to store
 * @returns promise
 */
function setRefreshToken(token: string) {
  return save(EStorage.azureRefreshToken, token)
}

/**
 * Get refresh token from storage
 * @returns promise
 */
function getRefreshToken() {
  return getValueFor(EStorage.azureRefreshToken)
}

/**
 * Clear tokens from storage
 */
async function clearAuthTokens() {
  await clear(EStorage.azureAccessToken)
  await clear(EStorage.azureRefreshToken)
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
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearAuthTokens,
  /**
   * udr
   */
  setSelectedUdr,
  getSelectedUdr,
  clearSelectedUdr,
}

export default secureStorageService
