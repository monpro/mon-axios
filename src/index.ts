import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { transformRequest } from './helpers/data'

import { buildUrl } from './helpers/url'
import xhr from './xhr'
import { processHeaders } from './helpers/headers'

export function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  console.log(transformUrl(config))
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
