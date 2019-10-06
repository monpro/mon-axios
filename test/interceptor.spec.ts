import axios from '../src/index'
import { AxiosRequestConfig, AxiosResponse } from '../src/types/index'

describe('interceptors', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
})
