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
})
