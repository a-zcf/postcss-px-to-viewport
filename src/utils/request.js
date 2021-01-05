import axios from 'axios'
import Api from '../api/api'
import { Toast } from 'vant'
const baseUrl = process.env.API_ROOT // 打包后的域名
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
//   if (response.data.code === '0001') {
//     Toast.fail(response.data.msg);
//     let url = location.href
//     window.location.href = baseUrl+Api.login+'?redirect_url='+url
//  }
  return response
},
error => {
  return Promise.reject(error.response)
})
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${baseUrl}${url}`,
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
    url: `${baseUrl}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
