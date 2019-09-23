import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'

import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url = '', params } = config
  return buildUrl(url, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
