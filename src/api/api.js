const urls = {
  authentication: '/api/flinemall/shop/authentication', // 店铺认证接口
  // info: '/api/flinemall/shop/info/oneself', // 获取店铺接口
  verify:'/api/flinemall/shop/admin/verify', // 店铺认证接口
  goodsList: '/api/flinemall/shop/goodsList', // 商品管理页面 商品列表接口
  orderList: '/api/flinemall/shop/orderList', // 店铺的订单列表接口
  orderGoodsList: '/api/flinemall/shop/orderGoodsList', // 店铺的订单商品合计数量接口

  staffAuthentication: '/api/flinemall/staff/authentication', // 配送员认证接口
  oneself: '/api/flinemall/staff/info/oneself', // 配送员信息接口
  shopInfo: '/api/flinemall/staff/info/shop', // 添加库存信息接口
  saoMaGoods: '/api/flinemall/staff/goods', // 扫【商品条码】获取商品信息接口
  shopList: '/api/flinemall/staff/shopList', // 店铺查看信息列表接口
  deliveryRecord: '/api/flinemall/staff/goodsList', // 配送记录接口
  goodsStock: '/api/flinemall/staff/goodsStock', // 添加库存接口
  flow: '/api/flinemall/staff/shopGoods/flow', // 配送员记录接口
  flowDetail: '/api/flinemall/staff/shopGoods/flow/detail', // 配送明细接口

  checkShop: '/api/flinemall/consumer/checkShop', // 检查店铺是否处于正常状态接口
  goods: '/api/flinemall/consumer/goods', // 消费者用户使用【店铺码 + 商品条码】查询商品(扫码)接口
  longCoin: '/api/flinemall/consumer/longCoin/num', // 龙币总数接口
  order: '/api/flinemall/consumer/order', // 提交订单并直接支付龙币（兑换）接口
  consumerInfo: '/api/flinemall/consumer/info', // 消费者信息接口
  myOrderList: '/api/flinemall/consumer/orderList', // 我的订单列表信息接口
  
  // userType: '/api/flinemall/userType', // 调用微信配置Config参数接口
  getJsSdkConfig: '/api/jsSdkConfig/getJsSdkConfig', // 调用微信配置Config参数接口
}
module.exports = urls
