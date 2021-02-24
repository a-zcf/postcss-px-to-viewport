import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/index'
import store from './store/store'
import './assets/icon/iconfont.css'
import { getRequest, postRequest } from './utils/request'
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest // get请求
Vue.prototype.$postRequest = postRequest // post请求

router.beforeEach((to, from, next) => {
  // 路由发生改变修改页面的title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
