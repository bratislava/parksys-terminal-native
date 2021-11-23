import secureStorageService from '@services/internal/secureStorage.service'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
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

  constructor(private baseURL: string, config?: IBaseApiConfig) {
    /**
     * Create axios config with base url and timeout from env
     */
    const axiosConfig: AxiosRequestConfig = {
      timeout: Constants.manifest?.extra?.apiTimeout,
      baseURL,
    }

    this.axios = axios.create(axiosConfig)

    /**
     * Extract error response form axios error
     */
    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error.response)
    )

    /**
     * If we should include auth, add interceptor to include token to each request
     */
    if (config?.includeAuthorization) {
      this.axios.interceptors.request.use(
        async (config) => {
          const accessToken = await secureStorageService.getAccessToken()
          const newConfig: AxiosRequestConfig = {
            ...config,
            headers: {
              ...config.headers,
              // TODO: add access token from azure
              Authorization: `Bearer ${accessToken}`,
            },
          }
          return newConfig
        },
        (error: AxiosError) => error
      )
    }
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
    params?: Omit<AxiosRequestConfig, 'baseURL' | 'url'>,
    requestValidation?: any,
    responseValidation?: any
  ): Promise<D> => {
    if (params?.data && requestValidation) {
      requestValidation.validateSync(params?.data)
    }

    const response = await this.axios({
      ...params,
      url: path,
      method: params?.method || 'GET',
    })

    if (response.data && responseValidation) {
      return responseValidation.validateSync(response.data)
    }

    return response.data
  }
}

export default BaseApi
