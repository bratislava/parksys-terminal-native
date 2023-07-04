import BaseApi from './baseApi'
import Constants from 'expo-constants'
import { registerPricingMocks } from '@mock/pricingApi'
import MockAdapter from 'axios-mock-adapter'

class PricingApi extends BaseApi {
  constructor() {
    super(Constants.expoConfig?.extra?.pricingApiUrl, {
      includeAuthorization: true,
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
      registerPricingMocks(this.mockInstance)
    }
  }
}

const pricingApi = new PricingApi()

export default pricingApi
