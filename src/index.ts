import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createAxiosInstance(): AxiosInstance {
  const axiosImpl = new Axios()
  const instance = Axios.prototype.request.bind(axiosImpl)

  extend(instance, axiosImpl)

  return instance as AxiosInstance
}

const axios = createAxiosInstance()

export default axios
