<template>
  <div class="businessadmin">
    <div class="busadmin-icon">
          <ul>
              <router-link to="/sellingtoday" class="router">
                <li>
                    <div class="icon icon-blue"><i class="iconfont icon-wodeshoumai icon-color"></i></div>
                    <span class="icon-text">本日售卖</span>
                </li>
              </router-link>
              <router-link to="/profitstoday" class="router">
                <li>
                    <div class="icon icon-pink"><i class="iconfont icon-meirilirun icon-color"></i></div>
                    <span class="icon-text">本日利润</span>
                </li>
              </router-link>
              <router-link to="/salestoday" class="router">
                <li>
                    <div class="icon sea-blue"><i class="iconfont icon-dangyueshoumaijixiaoliang icon-color"></i></div>
                    <span class="icon-text">本月售卖</span>
                </li>
              </router-link>
              <router-link to="/profitmonth" class="router">
                <li>
                    <div class="icon icon-pink"><i class="iconfont icon-lirunbiao icon-color icon-size"></i></div>
                    <span class="icon-text">本月利润</span>
                </li>
              </router-link>
              <router-link to="/stock" class="router">
              <li>
                  <div class="icon sea-blue"><i class="iconfont icon-kucunguanli icon-color icon-size"></i></div>
                  <span class="icon-text">库存管理</span>
              </li>
              </router-link>
                <li class="router" @click="jumpToMicroStore">
                    <div class="icon icon-blue"><i class="iconfont icon-weidian-xuanzhong icon-color"></i></div>
                    <span class="icon-text">店铺微店</span>
                </li>
          </ul>
      </div>
  </div>
</template>

<script>
import {getSupplierId} from '../../api/api'
export default {
  name:'businessadmin',
  data () {
      return{
        suplierId:0,
        keeperOpenid:''
      }
  },
  mounted(){
    let that = this;
    that.$postRequest(getSupplierId).then(res => {
      if(res.data.code =="0000"){
        that.suplierId = res.data.data.suplierId
        that.keeperOpenid = res.data.data.keeperOpenid
      }
    })
  },
  methods:{
    jumpToMicroStore(){
      let that= this;
      let url = 'http://zl.haiyunzy.com/small/frontpage/h5login/loginYaobao?tempUrl=commodityadmin&redirect_url=http://zl.haiyunzy.com/smalui/weidian/index.html&suplierId='+that.suplierId+'&keeperOpenid='+that.keeperOpenid
      window.location = url
    }
  }
}
</script>

<style>

</style>