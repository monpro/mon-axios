import {axios} from '../../src/index'
import {AxiosError} from '../../src/types/index';


axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e:AxiosError) => {
    console.log(e.message)
    console.log(e.request)
    console.log(e.code)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})