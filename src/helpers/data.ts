import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string' && data) {
    try {
      console.log(data)
      data = JSON.parse(data)
    } catch (e) {
      throw Error(e)
    }
  }
  return data
}
