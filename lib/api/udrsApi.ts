import BaseApi from './baseApi'
import Constants from 'expo-constants'

class UdrsApi extends BaseApi {
  constructor() {
    super(Constants.expoConfig?.extra?.udrsApiUrl)
  }
}

const udrsApi = new UdrsApi()

export default udrsApi
