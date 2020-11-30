import axios from 'axios'
import Api from '../api/api'
axios.defaults.withCredentials = false
axios.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  return config
},
err => {
  return Promise.resolve(err)
})

axios.interceptors.response.use(response => {
  // if (response.data.code === '0001') {
    
  // }
  return response
},
error => {
  // if (error.response && error.response.data.code === '0001') {

  // }
  return Promise.reject(error.response)
})
let base = Api.base
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    dataType: 'jsonp',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    params:params,
    url: `${base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
