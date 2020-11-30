import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import { getRequest, postRequest } from './utils/request'
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest // get请求
Vue.prototype.$postRequest = postRequest // post请求

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
