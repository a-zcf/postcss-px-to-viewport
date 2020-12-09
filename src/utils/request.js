import axios from 'axios'
import Api from '../api/api'
import Vue from 'vue'
import store from '../store/store'
import * as types from '../store/types'
import Qs from 'qs'
import { Toast } from 'vant'
Vue.use(Toast);
const query = Qs.parse(location.search.substring(1))
axios.defaults.withCredentials = false
axios.interceptors.request.use(config => {
  store.commit(types.LOGIN, query.token);
  store.commit(types.EXAMINEID, query.examineId);
  localStorage.setItem("examineId",store.state.examineId);
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  if (store.state.token) {
    config.headers.accessToken = `${store.state.token}`;
  }
  return config
}, 
err => {
  return Promise.resolve(err)
})

axios.interceptors.response.use(response => {
  if (response.data.code === 0) {
    return response
  } else if (response.data.code === 1000) {
    let url = location.href
    store.commit(types.LOGOUT)
    Toast.fail(response.data.msg);
    window.location.href = Api.red_url + url
  } else {

  }
  return response
},
error => {
  if(error.response){
    switch (error.response.data.code) {
      case 101:
        Toast.fail('您还未参与活动!');
        break
      case 102:
        Toast.fail('账号不存在!');
        break
      case 103:
        Toast.fail('账号已被使用!');
    }
  }
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
    params:params,
    url: `${base}${url}${query.examineId}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
