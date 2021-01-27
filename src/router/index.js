import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import ('@/views/login/login')

const Consumer = () => import ('@/views/consumer/consumer')
const Success = () => import ('@/views/consumer/success')
const Personalcenter = () => import ('@/views/consumer/personalcenter')
const Myorder = () => import ('@/views/consumer/myorder')

const Business = () => import ('@/views/business/business')
const Detailed = () => import ('@/views/business/detailed')
const Commodityadmin = () => import ('@/views/business/commodityadmin')
const Orderadmin = () => import ('@/views/business/orderadmin')
const Withdrawal = () => import ('@/views/business/withdrawal')
const Detailedstatistics = () => import ('@/views/business/detailedstatistics')

const Deliveryman = () => import ('@/views/deliveryman/wechatportal/deliveryman')
const Viewshop = () => import ('@/views/deliveryman/wechatportal/viewshop')
const Addinventory = () => import ('@/views/deliveryman/wechatportal/addinventory')
const Deliveryrecord = () => import ('@/views/deliveryman/wechatportal/deliveryrecord')
const Wechcommodityadmin = () => import ('@/views/deliveryman/wechatportal/wechcommodityadmin')
const Listingdetails = () => import ('@/views/deliveryman/wechatportal/listingdetails')

const Codedeliveryman = () => import ('@/views/deliveryman/codeportal/codedeliveryman')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login', component: Login, meta: {title: '登陆'}},
    
    {path: '/consumer', name: 'consumer', component: Consumer, meta: {title: '商品兑换'}},
    {path: '/success', name: 'success', component: Success, meta: {title: '兑换成功'}},
    {path: '/personalcenter', name: 'personalcenter', component: Personalcenter, meta: {title: '我的'}},
    {path: '/myorder', name: 'myorder', component: Myorder, meta: {title: '我的订单'}},

    {path: '/business', name: 'business', component: Business, meta: {title: '商家'}},
    {path: '/detailed', name: 'detailed', component: Detailed, meta: {title: '提现明细'}},
    {path: '/commodityadmin', name: 'commodityadmin', component: Commodityadmin, meta: {title: '商品管理'}},
    {path: '/orderadmin', name: 'orderadmin', component: Orderadmin, meta: {title: '订单管理'}},
    {path: '/withdrawal', name: 'withdrawal', component: Withdrawal, meta: {title: '提现'}},
    {path: '/detailedstatistics', name: 'detailedstatistics', component: Detailedstatistics, meta: {title: '明细统计'}},

    {path: '/deliveryman', name: 'deliveryman', component: Deliveryman, meta: {title: '配送员'}},
    {path: '/viewshop', name: 'viewshop', component: Viewshop, meta: {title: '查看店铺'}},
    {path: '/addinventory', name: 'addinventory', component: Addinventory, meta: {title: '添加库存'}},
    {path: '/deliveryrecord', name: 'deliveryrecord', component: Deliveryrecord, meta: {title: '配送记录'}},
    {path: '/wechcommodityadmin', name: 'wechcommodityadmin', component: Wechcommodityadmin, meta: {title: '配送记录'}},
    {path: '/listingdetails', name: 'listingdetails', component: Listingdetails, meta: {title: '上架明细'}},

    {path: '/codedeliveryman', name: 'codedeliveryman', component: Codedeliveryman, meta: {title: '扫码配送员'}},
  ]
})
