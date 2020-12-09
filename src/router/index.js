import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import ('@/views/index/index')
const Qrcode = () => import ('@/views/qrcode/qrcode')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', component: Index, meta: {title: '答题问卷'}},
    {path: '/qrcode', name: 'qrcode', component: Qrcode, meta: {title: '核销码'}},
  ]
})
