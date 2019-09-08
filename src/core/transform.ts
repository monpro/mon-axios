import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  toBeTransformed?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!toBeTransformed) {
    return data
  }
  if (!Array.isArray(toBeTransformed)) {
    toBeTransformed = [toBeTransformed]
  }

  toBeTransformed.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
