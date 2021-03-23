import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import './assets/icon/iconfont.css'
import MescrollVue from 'mescroll.js/mescroll'
import { getRequest, postRequest } from './utils/request'
import {
  NoticeBar,
  Swipe, 
  SwipeItem,
  Overlay,
  Field,
  Toast
} from 'vant';

Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Overlay);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Vuex)
Vue.component('mescroll-vue', MescrollVue)
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
