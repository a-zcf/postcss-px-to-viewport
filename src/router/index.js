import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import ('@/views/login/login')

const Consumer = () => import ('@/views/consumer/consumer')
const Success = () => import ('@/views/consumer/success')
const Personalcenter = () => import ('@/views/consumer/personalcenter')
const Myorder = () => import ('@/views/consumer/myorder')

const Business = () => import ('@/views/business/business')
const Commodityadmin = () => import ('@/views/business/commodityadmin')
const Orderadmin = () => import ('@/views/business/orderadmin')
const Detailedstatistics = () => import ('@/views/business/detailedstatistics')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login', component: Login, meta: {title: '登陆'}},
    
    {path: '/consumer', name: 'consumer', component: Consumer, meta: {title: '商品兑换'}},
    {path: '/success', name: 'success', component: Success, meta: {title: '兑换成功'}},
    {path: '/personalcenter', name: 'personalcenter', component: Personalcenter, meta: {title: '我的'}},
    {path: '/myorder', name: 'myorder', component: Myorder, meta: {title: '我的订单'}},

    {path: '/business', name: 'business', component: Business, meta: {title: '商家'}},
    {path: '/commodityadmin', name: 'commodityadmin', component: Commodityadmin, meta: {title: '商品管理'}},
    {path: '/orderadmin', name: 'orderadmin', component: Orderadmin, meta: {title: '订单管理'}},
    {path: '/detailedstatistics', name: 'detailedstatistics', component: Detailedstatistics, meta: {title: '明细统计'}},

  ]
})
