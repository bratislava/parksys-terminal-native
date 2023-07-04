import MockAdapter from 'axios-mock-adapter'
import BaseApi from './baseApi'
import Constants from 'expo-constants'
import { registerPapayaMocks } from '@mock/papayaApi'

class PapayaApi extends BaseApi {
  constructor() {
    super(Constants.expoConfig?.extra?.papayaApiUrl, {
      includeAuthorization: false,
    })

    /**
     * Register mocks for api if in env
     */
    if (
      Constants.expoConfig?.extra?.enableMockApi === 'true' ||
      Constants.expoConfig?.extra?.enableMockApi === true
    ) {
      this.mockInstance = new MockAdapter(this.axios, {
        onNoMatch: 'passthrough',
        delayResponse: Constants.expoConfig?.extra?.mockApiDelay
          ? Number(Constants.expoConfig?.extra?.mockApiDelay)
          : 0,
      })
      registerPapayaMocks(this.mockInstance)
    }
  }
}

const papayaApi = new PapayaApi()

export default papayaApi
