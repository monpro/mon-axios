import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'

describe('test for mergeConfig', () => {
  const defaults = axios.defaults

  test('should accept undefined as second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })

  test('should accept an object as second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })

  test('should have deep copy', () => {
    const merged = mergeConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).not.toBe(defaults.headers)
  })

  test('should allow setting request config', () => {
    const config = {
      url: 'www',
      params: 'a = 1',
      data: { b: 2 }
    }
    const merged = mergeConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toEqual(config.data)
  })

  test('should not allow inherient  config', () => {
    const config = {
      url: 'www',
      params: 'a = 1',
      data: { b: 2 }
    }
    const merged = mergeConfig(defaults, {})
    expect(merged.url).toBeUndefined()
    expect(merged.params).toBeUndefined()
    expect(merged.data).toBeUndefined()
  })
  test('should return default headers if pass config2 with undefined', () => {
    expect(
      mergeConfig(
        {
          headers: 'x-mock-header'
        },
        undefined
      )
    ).toEqual({
      headers: 'x-mock-header'
    })
  })
})
