import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import './assets/icon/iconfont.css'
import MescrollVue from 'mescroll.js/mescroll'
Vue.component('mescroll-vue', MescrollVue)
import { getRequest, postRequest } from './utils/request'
import { 
  Stepper,
  Tag,
  Tab, 
  Tabs,
  Calendar,
  Field,
  Overlay,
  Toast,
  SwipeCell,
  Button
} from 'vant';
Vue.use(Stepper);
Vue.use(Tag);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Calendar);
Vue.use(Field);
Vue.use(Overlay);
Vue.use(Toast);
Vue.use(SwipeCell);
Vue.use(Button);
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
