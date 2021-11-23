import MockAdapter from 'axios-mock-adapter'
import BaseApi from './baseApi'
import Constants from 'expo-constants'
import { registerPapayaMocks } from '@mock/papayaApi'

class PapayaApi extends BaseApi {
  constructor() {
    super(Constants.manifest?.extra?.papayaApiUrl, {
      includeAuthorization: false,
    })

    /**
     * Register mocks for api if in env
     */
    if (Constants.manifest?.extra?.enableMockApi) {
      this.mockInstance = new MockAdapter(this.axios, {
        onNoMatch: 'passthrough',
      })
      registerPapayaMocks(this.mockInstance)
    }
  }
}

const papayaApi = new PapayaApi()

export default papayaApi
