/**================================================================================================
 * ?                                      ABOUT
 * @description    : Service for secure storage on device
 * @link          : https://docs.expo.dev/versions/latest/sdk/securestore/
 *================================================================================================**/

import * as SecureStore from 'expo-secure-store'
import { SecureStorageTypes } from '../../types/storage.d'

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
  return save(SecureStorageTypes.azureAccessToken, token)
}

/**
 * Get access token from storage
 * @returns promise
 */
function getAccessToken() {
  return getValueFor(SecureStorageTypes.azureAccessToken)
}

/**
 * Store refresh token to storage
 * @param token refresh token to store
 * @returns promise
 */
function setRefreshToken(token: string) {
  return save(SecureStorageTypes.azureRefreshToken, token)
}

/**
 * Get refresh token from storage
 * @returns promise
 */
function getRefreshToken() {
  return getValueFor(SecureStorageTypes.azureRefreshToken)
}

/**
 * Clear tokens from storage
 */
async function clearAuthTokens() {
  await clear(SecureStorageTypes.azureAccessToken)
  await clear(SecureStorageTypes.azureRefreshToken)
}

/**
 * Save udr id of app
 * @param udrId udr id to store
 * @returns promise
 */
function setSelectedUdr(udrId: string) {
  return save(SecureStorageTypes.selectedUdr, udrId)
}

/**
 * Get udr id of app
 * @returns promise
 */
function getSelectedUdr() {
  return getValueFor(SecureStorageTypes.selectedUdr)
}

/**
 * Clear udr id of app
 * @returns promise
 */
function clearSelectedUdr() {
  return clear(SecureStorageTypes.selectedUdr)
}

/**
 * Set session
 * @param sessionId session id of employee
 * @returns promise
 */
function setSessionId(sessionId: string) {
  return save(SecureStorageTypes.sessionId, sessionId)
}

/**
 * Get session
 * @returns promise
 */
function getSessionId() {
  return getValueFor(SecureStorageTypes.sessionId)
}

/**
 * Clear session
 * @returns promise
 */
function clearSessionId() {
  return clear(SecureStorageTypes.sessionId)
}

/**
 * Clear all storage
 * @returns promise
 */
function clearStorage() {
  return Promise.all([clearAuthTokens(), clearSelectedUdr(), clearSessionId()])
}

const secureStorageService = {
  clearStorage,
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
  /**
   * session
   */
  setSessionId,
  getSessionId,
  clearSessionId,
}

export default secureStorageService
