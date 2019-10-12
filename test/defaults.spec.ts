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
})
