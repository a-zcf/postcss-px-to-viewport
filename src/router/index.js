import Vue from 'vue'
import Router from 'vue-router'
const Transition = () => import ('@/views/transition/transition')
const Index = () => import ('@/views/index/index')
const Receive = () => import ('@/views/receive/receive')
const Success = () => import ('@/views/success/success')
const Receiveerr = () => import ('@/views/receiveerr/receiveerr')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'transition', component: Transition, meta: {title: ''}},
    {path: '/index', name: 'index', component: Index, meta: {title: '猜灯谜'}},
    {path: '/receive', name: 'receive', component: Receive, meta: {title: '领取'}},
    {path: '/success', name: 'success', component: Success, meta: {title: '领取成功'}},
    {path: '/receiveerr', name: 'receiveerr', component: Receiveerr, meta: {title: '领取失败'}},
  ]
})
