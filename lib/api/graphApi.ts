import BaseApi from './baseApi'

const BASE_URL = 'https://graph.microsoft.com'

class GraphApi extends BaseApi {}

const graphApi = new GraphApi(BASE_URL, {
  includeAuthorization: true,
})

export default graphApi
