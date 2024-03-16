import config from 'config'
import humps from 'humps'

import DeviceStorage from '~lib/utils/DeviceStorage'

const { HOST } = config

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
  protected static async request<T>(
    url: string,
    method: string,
    data: any,
    config = {},
  ) {
    const fullUrl = `${HOST}/api/v1${url}`
    const Authorization = await this.authHeader()
    const headers = {
      'User-Agent': 'skrt-mobile',
      'Content-Type': 'application/json',
      Authorization,
    }

    const transformedData = humps.decamelizeKeys(data)

    const fetchConfig = {
      method,
      headers,
      ...(data ? { body: JSON.stringify(transformedData) } : {}),
      ...(config ? config : {}),
    }

    const response = await fetch(fullUrl, fetchConfig)

    try {
      const json = await response.json()
      if (!response.ok) {
        return Promise.reject(json)
      }
      return humps.camelizeKeys(json) as T
    } catch {
      const text = await response.clone().text()
      return Promise.reject(text) // Reject with response text if JSON parsing fails
    }
  }

  protected static get<T>(url: string, config = {}) {
    return this.request<T>(url, 'GET', undefined, config)
  }

  protected static put<T>(url: string, data = {}, config = {}) {
    return this.request<T>(url, 'PUT', data, config)
  }

  protected static patch<T>(url: string, data = {}, config = {}) {
    return this.request<T>(url, 'PATCH', data, config)
  }

  protected static post<T>(url: string, data = {}, config = {}) {
    return this.request<T>(url, 'POST', data, config)
  }

  protected static delete<T>(url: string, data = {}, config = {}) {
    return this.request<T>(url, 'DELETE', data, config)
  }

  private static async authHeader() {
    const storedUser = await DeviceStorage.getSecureItem('user')
    if (!storedUser) return ''

    const { email, authToken } = storedUser
    return `Bearer ${authToken}`
  }
}

export default Base
