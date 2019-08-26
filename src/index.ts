import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { transformRequest, transformResponse } from './helpers/data'

import { buildUrl } from './helpers/url'
import xhr from './xhr'
import { processHeaders } from './helpers/headers'

export function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => transformResponseDate(res))
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
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

function transformResponseDate(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
