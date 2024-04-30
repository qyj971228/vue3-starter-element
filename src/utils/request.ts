import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { get, merge } from 'lodash'

const BaseUrl = '/api'

type Request<T> = {
  code: number
  msg: string
  data: T
}

function createService() {
  const service = axios.create()
  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => {
      const apiData = response.data
      const responseType = response.request?.responseType
      if (responseType === 'blob' || responseType === 'arraybuffer') {
        return apiData
      }
      const code = apiData.code
      switch (code) {
        case undefined:
          return Promise.reject(new Error('状态码丢失'))
        case 200:
          return apiData
        case 401:
          return
        case 500:
          return Promise.reject(apiData || '请求出错，请重试或者检查网络')
        default:
          return apiData
      }
    },
    (error) => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '登录过期'
          localStorage.removeItem('token')
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          break
      }
      return Promise.reject(error)
    }
  )
  return service
}

function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<Request<T>> {
    const token = localStorage.getItem('token')
    const defaultConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      baseURL: BaseUrl,
      data: {}
    }

    const mergeConfig = merge(defaultConfig, config)
    return service.request<any, Request<T>>(mergeConfig)
  }
}

function createRequestDownload(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('token')
    const defaultConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      baseURL: BaseUrl,
      responseType: 'arraybuffer',
      data: {}
    }

    const mergeConfig = merge(defaultConfig, config)
    return service.request<any, ArrayBuffer>(mergeConfig)
  }
}

function createRequestUpload(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<Request<T>> {
    const token = localStorage.getItem('token')
    const defaultConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'multipart/form-data'
      },
      timeout: 10000,
      baseURL: BaseUrl,
      data: {}
    }
    const mergeConfig = merge(defaultConfig, config)
    return service.request<any, Request<T>>(mergeConfig)
  }
}

const service = createService()

export const request = createRequest(service)
export const requestDownload = createRequestDownload(service)
export const requestUpload = createRequestUpload(service)
