import { IUdrFeaturesInfo } from '@models/pricing/udr/udr'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EStorage } from '../../types/storage.d'

/**
 * Save udrs of app
 * @param udrs udrs data to store
 * @returns promise
 */
async function setUdrs(udrs: IUdrFeaturesInfo[]) {
  try {
    const jsonValue = JSON.stringify(udrs)
    await AsyncStorage.setItem(EStorage.udrs, jsonValue)
  } catch (e) {
    // saving error
  }
}

/**
 * Get udrs data of app
 * @returns promise
 */
async function getUdrs() {
  const jsonValue = await AsyncStorage.getItem(EStorage.udrs)
  return jsonValue != null
    ? (JSON.parse(jsonValue) as IUdrFeaturesInfo[])
    : null
}

/**
 * Clear udrs of app
 * @returns promise
 */
async function clearUdrs() {
  await AsyncStorage.removeItem(EStorage.udrs)
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
