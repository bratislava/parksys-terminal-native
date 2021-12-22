import authService from '@services/internal/auth.service'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import MockAdapter from 'axios-mock-adapter/types'
import Constants from 'expo-constants'

interface IBaseApiConfig {
  /**
   * Include bearer token from secure storage
   */
  includeAuthorization: boolean
}

abstract class BaseApi {
  protected axios: AxiosInstance
  protected mockInstance?: MockAdapter
  static isRefreshing = false
  static refreshSubscribers = []

  constructor(private baseURL: string, config?: IBaseApiConfig) {
    /**
     * Create axios config with base url and timeout from env
     */
    const axiosConfig: AxiosRequestConfig = {
      timeout: Constants.manifest?.extra?.apiTimeout
        ? Number(Constants.manifest?.extra?.apiTimeout)
        : 0,
      baseURL,
    }

    this.axios = axios.create(axiosConfig)

    /**
     * If we should include auth, add interceptor to include token to each request
     */
    if (config?.includeAuthorization) {
      this.axios.interceptors.request.use(
        async (config) => {
          const tokens = await authService.getSession()

          const newConfig: AxiosRequestConfig = {
            ...config,
            headers: {
              ...config.headers,
            },
          }

          if (tokens && tokens.accessToken && newConfig.headers) {
            newConfig.headers['Authorization'] = `Bearer ${tokens.accessToken}`
          }

          return newConfig
        },
        (error: AxiosError) => Promise.reject(error)
      )

      /**
       * Intercept response and handle token errors
       */
      this.axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
          const { config, response } = error
          const originalRequest = config
          const status = response?.status
          console.log('[API error]', config.url, status, response)

          /**
           * Refresh token if needed
           */
          if (status === 401) {
            if (!BaseApi.isRefreshing) {
              BaseApi.isRefreshing = true
              console.log('[BaseApi]: refreshing token')
              authService
                .refreshAccessToken()
                .then((tokens) => {
                  console.log('[BaseApi]: refresh success')
                  BaseApi.onRefreshed(tokens.accessToken)
                })
                .catch(() => {
                  console.log('[BaseApi]: refresh failed')
                  authService.revokeTokens()
                })
                .finally(() => {
                  BaseApi.isRefreshing = false
                })
            }

            // Postpone all requests with invalid token in array
            return new Promise((resolve) => {
              // we are passing a function, that accepts token, all wrapped in Promise
              BaseApi.subscribeTokenRefresh((token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`
                  resolve(axios(originalRequest))
                }
              })
            })
          }

          // Create verbose error, not just error message
          return Promise.reject(error)
        }
      )
    }

    /**
     * Extract error response form axios error
     */
    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error.response)
    )
  }

  /**
   * Function to subscribe to refresh token queue
   * @param callback callback after refresh
   */
  static subscribeTokenRefresh(callback: (token: string) => void): void {
    BaseApi.refreshSubscribers.push(callback as never)
  }

  /**
   * Pop all requests in queue and give them new access token
   * @param token new access token
   */
  static onRefreshed(token: string): void {
    // in this case an "fnc" is a function, which we call with new token, its original request
    BaseApi.refreshSubscribers.map((fnc: (token: string) => void) => fnc(token))
    // clear an array after reply
    BaseApi.refreshSubscribers = []
  }

  /**
   * Function to leverage inner instance of axios to make call with interceptors based on configuration
   * @param path path to call
   * @param params axios request paramsä
   * @throws AxiosError
   * @returns axios promise
   */
  request = async <D extends any>(
    path: string,
    params?: Omit<AxiosRequestConfig, 'baseURL' | 'url'>
  ): Promise<D> => {
    const response = await this.axios({
      ...params,
      url: path,
      method: params?.method || 'GET',
    })

    return response.data
  }

  /**
   * Function to leverage inner instance of axios to make call with interceptors based on configuration.
   * If Yup validation objects are provided, request data/ response data will be validated
   * @param path path to call
   * @param params axios request params
   * @param requestValidation Yup validation Object
   * @param responseValidation Yup validation Object
   * @throws AxiosError or ValidationError
   * @returns axios promise
   */
  requestValidate = async <D extends any>(
    path: string,
    config?: Omit<AxiosRequestConfig, 'baseURL' | 'url'>,
    requestDataValidation?: any,
    responseDataValidation?: any,
    requestParamsValidation?: any
  ): Promise<D> => {
    if (config?.data && requestDataValidation) {
      requestDataValidation.validateSync(config?.data)
    }
    if (config?.params && requestParamsValidation) {
      requestParamsValidation.validateSync(config?.params)
    }

    const response = await this.axios({
      ...config,
      url: path,
      method: config?.method || 'GET',
    })

    if (response.data && responseDataValidation) {
      return responseDataValidation.validateSync(response.data)
    }

    return response.data
  }
}

export default BaseApi
