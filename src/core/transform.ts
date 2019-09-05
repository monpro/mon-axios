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

  toBeTransformed.forEach(transform => {
    data = transform(data, headers)
  })

  return data
}
