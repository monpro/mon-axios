import axios from '../src/index'
import { AxiosRequestConfig, AxiosResponse } from '../src/types/index'
import { getAjaxRequest } from './helper'

describe('interceptors', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a request interceptor', () => {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers.addVal = 'added by interceptor'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.addVal).toBe('added by interceptor')
    })
  })
  test('should add a request interceptor that returns a new config object', () => {
    const instance = axios.create()

    instance.interceptors.request.use(() => {
      return {
        url: '/test',
        method: 'put'
      }
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
      expect(request.url).toBe('/test')
    })
  })

  test('should add a request interceptor that returns a promise', done => {
    const instance = axios.create()

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return new Promise(resolve => {
        setTimeout(() => {
          config.headers.async = 'promise'
          resolve(config)
        }, 10)
      })
    })

    instance('/foo')

    setTimeout(() => {
      getAjaxRequest().then(request => {
        expect(request.requestHeaders.async).toBe('promise')
        done()
      })
    }, 100)
  })
})
