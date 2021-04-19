import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/store'
import router from './router/index'
import './utils/rem'
import './assets/icon/iconfont.css'
import MescrollVue from 'mescroll.js/mescroll'
import plugins from '@/utils/components'
import { getRequest, postRequest } from './utils/request'
import { wxWholeShare} from './utils/weixinApi'
Vue.use(Vuex)
Vue.component('mescroll-vue', MescrollVue)

import { 
  Tab,
  Tabs,
  Overlay,
  Dialog
 } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Overlay );
Vue.use(Dialog );
Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest // get请求
Vue.prototype.$postRequest = postRequest // post请求

let url = window.location.href.split("?")[0];
wxWholeShare({
  shareTitle: '佛山推多多',
  shareDesc: '佛山推多多，快点进来看看吧！',
  shareLink: url,
  shareImg: './assets/img/Headless.png'
});
router.beforeEach((to, from, next) => {
  // 路由发生改变修改页面的title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
