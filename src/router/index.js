import Vue from 'vue'
import Router from 'vue-router'
const Transition = () => import ('@/views/transition/transition')
const Index = () => import ('@/views/index/index')
const Login = () => import ('@/views/login/login')
const   BusinessAdmin = () => import ('@/views/businessadmin/businessadmin')
const   ConsumerAdmin = () => import ('@/views/consumeradmin/consumeradmin')
const   AccountAdmin = () => import ('@/views/accountadmin/accountadmin')
const   SellingToday = () => import ('@/views/businessadmin/sellingtoday/sellingtoday')
const   ProfitsToday = () => import ('@/views/businessadmin/profitstoday/profitstoday')
const   SalesToday = () => import ('@/views/businessadmin/salestoday/salestoday')
const   Detailed = () => import ('@/views/businessadmin/salestoday/detailed')
const   ProfitMonth = () => import ('@/views/businessadmin/profitmonth/profitmonth')
const   Pdetailed = () => import ('@/views/businessadmin/profitmonth/pdetailed')
const   Stock = () => import ('@/views/businessadmin/stock/stock')
const   Stockdetailed = () => import ('@/views/businessadmin/stock/stockdetailed')
const   Singlebinding = () => import ('@/views/binding/singlebinding')
const   Batchbinding = () => import ('@/views/binding/batchbinding')
const   Bindingsuccess = () => import ('@/views/binding/bindingsuccess')
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'transition', component: Transition, meta: {title: '广西中烟终端管理平台'}},
    {path: '/index', name: 'index', component: Index, meta: {title: '首页'}},
    {path: '/login', name: 'login', component: Login, meta: {title: '广西中烟终端管理平台'}},
    {path: '/businessadmin', name: 'businessadmin', component: BusinessAdmin, meta: {title: '营业管理'}},
    {path: '/consumeradmin', name: 'consumeradmin', component: ConsumerAdmin, meta: {title: '消费者管理'}},
    {path: '/accountadmin', name: 'accountadmin', component: AccountAdmin, meta: {title: '账户管理'}},
    {path: '/sellingtoday', name: 'sellingtoday', component: SellingToday, meta: {title: '本日售卖'}},
    {path: '/profitstoday', name: 'profitstoday', component: ProfitsToday, meta: {title: '本日利润'}},
    {path: '/salestoday', name: 'salestoday', component: SalesToday, meta: {title: '本月售卖'}},
    {path: '/detailed', name: 'detailed', component: Detailed, meta: {title: '本月销售明细'}},
    {path: '/profitmonth', name: 'profitmonth', component: ProfitMonth, meta: {title: '本月利润'}},
    {path: '/pdetailed', name: 'pdetailed', component: Pdetailed, meta: {title: '本月利润明细'}},
    {path: '/stock', name: 'stock', component: Stock, meta: {title: '库存管理'}},
    {path: '/stockdetailed', name: 'stockdetailed', component: Stockdetailed, meta: {title: '库存管理明细'}},
    {path: '/singlebinding', name: 'singlebinding', component: Singlebinding, meta: {title: '单个绑定'}},
    {path: '/batchbinding', name: 'batchbinding', component: Batchbinding, meta: {title: '批量绑定'}},
    {path: '/bindingsuccess', name: 'bindingsuccess', component: Bindingsuccess, meta: {title: '绑定成功'}},
  ]
})
