import Vue from 'vue'
import Router from 'vue-router'

const IndexInfo = () => import ('@/views/IndexInfo/IndexInfo')
const Rankinglist = () => import ('@/views/rankinglist/rankinglist')
const Awarddetails = () => import ('@/views/awarddetails/awarddetails')
const Promotionaward = () => import ('@/views/promotionaward/promotionaward')
const OrderAdmin = () => import ('@/views/OrderAdmin/OrderAdmin')
const MyReward = () => import ('@/views/MyReward/MyReward')
const MyTeam = () => import ('@/views/myteam/myteam')
const Gradecustomers = () => import ('@/views/myteam/gradecustomers')
const MyQrCode = () => import ('@/views/myqrcode/myqrcode')
const ExchangeSuccess = () => import ('@/views/ExchangeSuccess/ExchangeSuccess')

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', name: 'IndexInfo', component: IndexInfo, meta: {title: '推客活动'}},
    {path: '/rankinglist', name: 'rankinglist', component: Rankinglist, meta: {title: '排行榜'}},
    {path: '/awarddetails', name: 'awarddetails', component: Awarddetails, meta: {title: '推广奖励明细'}},
    {path: '/promotionaward', name: 'promotionaward', component: Promotionaward, meta: {title: '推广奖励'}},
    {path: '/OrderAdmin', name: 'OrderAdmin', component: OrderAdmin, meta: {title: '订单管理'}},
    {path: '/myteam', name: 'myteam', component: MyTeam, meta: {title: '我的团队'}},
    {path: '/gradecustomers', name: 'gradecustomers', component: Gradecustomers, meta: {title: ''}},
    {path: '/myqrcode', name: 'myqrcode', component: MyQrCode, meta: {title: '我的推广码'}},
    {path: '/MyReward', name: 'MyReward', component: MyReward, meta: {title: '我的奖励'}},
    {path: '/ExchangeSuccess', name: 'ExchangeSuccess', component: ExchangeSuccess, meta: {title: ''}},
  ]
})
