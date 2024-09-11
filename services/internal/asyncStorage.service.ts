import { IUdrFeaturesInfo } from '@models/pricing/udr/udr'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageTypes } from '../../types/storage.d'
import { captureException, captureMessage } from './sentry.service'

/**
 * Save udrs of app
 * @param udrs udrs data to store
 * @returns Promise<void>
 */
async function setUdrs(udrs: IUdrFeaturesInfo[]) {
  try {
    const jsonValue = JSON.stringify(udrs)
    await AsyncStorage.setItem(AsyncStorageTypes.udrs, jsonValue)
  } catch (e) {
    captureMessage('setUdrs to async storage error')
    captureException(e)
  }
}

/**
 * Get udrs data of app
 * @returns Promise<IUdrFeaturesInfo[] | null>
 */
async function getUdrs() {
  const jsonValue = await AsyncStorage.getItem(AsyncStorageTypes.udrs)
  return jsonValue != null
    ? (JSON.parse(jsonValue) as IUdrFeaturesInfo[])
    : null
}

/**
 * Clear udrs of app
 * @returns Promise<void>
 */
async function clearUdrs() {
  await AsyncStorage.removeItem(AsyncStorageTypes.udrs)
}

const asyncStorageService = {
  /**
   * udrs
   */
  setUdrs,
  getUdrs,
  clearUdrs,
}

export default asyncStorageService
