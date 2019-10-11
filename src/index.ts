import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
  const axiosImpl = new Axios(config)
  const instance = Axios.prototype.request.bind(axiosImpl)

  extend(instance, axiosImpl)

  return instance as AxiosStatic
}

const axios = createAxiosInstance(defaults)

axios.create = function create(config: AxiosRequestConfig | undefined) {
  return createAxiosInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

export default axios
