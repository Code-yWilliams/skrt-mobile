import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import config from 'config'
import humps from 'humps'
import DeviceStorage from '~lib/utils/DeviceStorage'
import base64 from 'react-native-base64'

const { HOST, BASE_PATH } = config

type ApiError = {
  code: string
  detail: string
  status: number
  title: string
}

type ApiErrorResponse = {
  error: ApiError
}

const isApiErrorResponse = (e: any): e is ApiErrorResponse => {
  return e?.error?.code && e.error.detail && e.error.status && e.error.title
}

export const getApiError = (e: any): ApiError | undefined => {
  if (isApiErrorResponse(e)) {
    return e.error
  }
  return undefined
}

class Base {
  private static httpClient: AxiosInstance = axios.create({
    baseURL: `${HOST}${BASE_PATH}`,
    headers: {
      'User-Agent': 'skrt-mobile',
      'Content-Type': 'application/json',
    },
    transformRequest: (data) => {
      return JSON.stringify(humps.decamelizeKeys(data))
    },
    transformResponse: (data) => {
      try {
        return humps.camelizeKeys(JSON.parse(data))
      } catch (e) {
        return data
      }
    },
  })

  // TODO: maybe setup interceptor to catch api JSON error responses and throw a js error for the app to handle

  static setupInterceptors = () => {
    this.httpClient.interceptors.request.use(async (config) => {
      const authHeader = await this.authHeader()
      config.headers.Authorization = authHeader
      return config
    })
  }

  protected static async authHeader() {
    const storedUser = await DeviceStorage.getSecureItem('user')
    if (!storedUser) return ''

    const { email, mobileAuthToken } = storedUser
    console.log({ email })
    const auth = base64.encode(`${email}:${mobileAuthToken}`)
    return `Basic ${auth}`
  }

  protected static async get<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await Base.httpClient.get<T>(url, config)
    return response.data
  }

  protected static async put<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await Base.httpClient.put<T>(url, data, config)
    return response.data
  }

  protected static async patch<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await Base.httpClient.patch<T>(url, data, config)
    return response.data
  }

  protected static async post<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await Base.httpClient.post<T>(url, data, config)
    return response.data
  }

  protected static async delete<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await Base.httpClient.delete<T>(url, config)
    return response.data
  }
}

Base.setupInterceptors()
export default Base
