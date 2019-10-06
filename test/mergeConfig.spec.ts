import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'

describe('test for mergeConfig', () => {
  const defaults = axios.defaults

  test('should accept undefined as second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })
})
