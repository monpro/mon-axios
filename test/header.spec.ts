import axios from '../src/index'
import { getAjaxRequest } from './helper'

function testHeaderValue(headers: object, key: string, val?: string): void {
  let found = false
  Object.keys(headers).forEach(k => {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      return
    }
  })
  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}
