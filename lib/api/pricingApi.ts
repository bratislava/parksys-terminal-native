import BaseApi from './baseApi'
import Constants from 'expo-constants'
import { registerPricingMocks } from '@mock/pricingApi'
import MockAdapter from 'axios-mock-adapter'

class PricingApi extends BaseApi {
  constructor() {
    super(Constants.manifest?.extra?.pricingApiUrl, {
      includeAuthorization: true,
    })

    /**
     * Register mocks for api if in env
     */
    if (Constants.manifest?.extra?.enableMockApi) {
      this.mockInstance = new MockAdapter(this.axios, {
        onNoMatch: 'passthrough',
      })
      registerPricingMocks(this.mockInstance)
    }
  }
}

const pricingApi = new PricingApi()

export default pricingApi
