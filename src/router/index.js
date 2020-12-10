import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import ('@/views/login/login')
const Index = () => import ('@/views/index/index')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login', component: Login, meta: {title: '首页'}},
    {path: '/index', name: 'index', component: Index, meta: {title: '首页'}},
  ]
})
