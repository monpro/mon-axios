import axios, { AxiosTransformer } from '../src/app'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform request json', () => {
    expect(
      (axios.defaults.transformRequest as AxiosTransformer[])[0]({ test: 'a' })
    ).toBe('{"test":"a"}')
  })

  test('should not transform request json', () => {
    expect(
      (axios.defaults.transformRequest as AxiosTransformer[])[0]('a:b')
    ).toBe('a:b')
  })

  test('should transform response json', () => {
    const data = (axios.defaults.transformResponse as AxiosTransformer[])[0](
      '{"a":"b"}'
    )

    expect(typeof data).toBe('object')
    expect(data.a).toBe('b')
  })

  test('should do nothing to response string', () => {
    expect(
      (axios.defaults.transformResponse as AxiosTransformer[])[0]('a=b')
    ).toBe('a=b')
  })

  test('should use global defaults config', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should use modified defaults config', () => {
    axios.defaults.baseURL = 'http://example.com/'

    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://example.com/foo')
      delete axios.defaults.baseURL
    })
  })

  test('should use request config', () => {
    axios('/foo', {
      baseURL: 'http://www.example.com'
    })

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://www.example.com/foo')
    })
  })

  test('should use default config for custom instance', () => {
    const instance = axios.create({
      xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
      xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=foobarbaz'

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe(
        'foobarbaz'
      )
      document.cookie =
        instance.defaults.xsrfCookieName +
        '=;expires=' +
        new Date(Date.now() - 86400000).toUTCString()
    })

    test('should use GET headers', () => {
      axios.defaults.headers.get['X-CUSTOM-HEADER'] = 'foo'
      axios.get('/foo')

      return getAjaxRequest().then(request => {
        expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
        delete axios.defaults.headers.get['X-CUSTOM-HEADER']
      })
    })

    test('should use POST headers', () => {
      axios.defaults.headers.post['X-CUSTOM-HEADER'] = 'foo'
      axios.post('/foo', {})

      return getAjaxRequest().then(request => {
        expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')
        delete axios.defaults.headers.post['X-CUSTOM-HEADER']
      })
    })
  })
})
