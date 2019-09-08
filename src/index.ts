import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
  const axiosImpl = new Axios(config)
  const instance = Axios.prototype.request.bind(axiosImpl)

  extend(instance, axiosImpl)

  return instance as AxiosStatic
}

const axios = createAxiosInstance(defaults)

axios.create = function create(config) {
  return createAxiosInstance(mergeConfig(defaults, config))
}
export default axios
