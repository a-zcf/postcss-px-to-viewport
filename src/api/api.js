const urls = {
  login : '/user/login', 
  notice: '/api/announcement_list', // 首页公告列表接口
  slider: '/api/getHomeSlider', // 首页图片循环切换接口
  suppLier: '/api/supplier_index', // 零售户首页相关数据接口
  isBind: '/api/is_bind', // 检查是否绑定接口
  supplierBind: '/api/supplier_bind', // 绑定接口
  saleRecord: '/api/sale_record_day', // 今日售卖接口
  profitsRecordDay: '/api/profits_record_day', // 今日利润接口
  saleRecordMonth: '/api/sale_record_month', // 本月售卖接口
  profitsRecordMonth: '/api/profits_record_month', // 本月利润 接口
  activateRecord: '/api/activate_record', // 库存管理激活记录接口
  brandActivateRecord: '/api/brand_activate_record', // 库存管理规格激活明细接口
  getJssdkConfig: '/api/getJssdkConfig', // 获取jssdk接口
  smokeInfo: '/api/smoke_info', // 获取烟品信息接口
  smokeBind: '/api/smoke_bind', // 提交绑定(可支付绑定)接口
  smokeBindNoneedpay: '/api/smoke_bind_noneedpay', // 提交绑定(不可支付绑定)接口
  supplierInfo: '/api/supplier_info', // 获取零售户基本信息接口 /api/supplier_info
  supplierUpdate: '/api/supplier_update', // 零售户基本信息修改接口
  fileUpload: '/api/fileUpload', // 上传图片接口
  userOrderList: '/api/userOrderList', // 上传图片接口
  getSupplierId: '/api/getSupplierId', // 获取店铺id,openid接口
  getThirdIndexUrl: '/api/getThirdIndexUrl', // 获取取个性化地址接口
}
module.exports = urls
