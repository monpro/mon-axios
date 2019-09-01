import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'

function createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
  const axiosImpl = new Axios(config)
  const instance = Axios.prototype.request.bind(axiosImpl)

  extend(instance, axiosImpl)

  return instance as AxiosInstance
}

const axios = createAxiosInstance(defaults)

export default axios
