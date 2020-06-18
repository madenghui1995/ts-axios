import axios, { AxiosTransform } from '../../src/index'
import qs from 'qs'

axios.defaultsConfig.headers.common['test2'] = 123

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [(function(data) {
//     // return data
//     const a = qs.stringify(data)
//     return a
//   }), ...(axios.defaultsConfig.transformRequest as AxiosTransform[])],
//   transformResponse: [...(axios.defaultsConfig.transformResponse as AxiosTransform[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaultsConfig.transformRequest as AxiosTransform[])],
  transformResponse: [...(axios.defaultsConfig.transformResponse as AxiosTransform[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
