import axios from '../../src/index'
import qs from 'qs'
import { AxiosTransformer } from '../../src/types';

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/base/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})

// tslint:disable-next-line: no-floating-promises
// axios({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/base/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   })
// }).then((res) => {
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return {"test":3}
  }]
})

instance({
  url: '/base/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  })
}).then((res) => {
  console.log(res.data)
})

axios({
  transformRequest: [(function(req) {
    return qs.stringify(req.data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 12
    }
    return data
  }],
  url: '/base/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})