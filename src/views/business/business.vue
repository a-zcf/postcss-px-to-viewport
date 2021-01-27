<template>
  <div class="business">
    <div class="head">
      <img :src="headImg" />
      <div class="head-text">
        <p class="nickname">
          <label>微信昵称：</label>
          <span>哈哈哈哈</span>
        </p>
        <p>
          <label>许可证号：</label>
          <span>{{licenese}}</span>
        </p>
        <p>
          <label>商家：</label>
          <span class="renzheng">已认证</span>
        </p>
      </div>
    </div>
    <div class="commodity-order">
      <router-link to="/commodityadmin" class="router-link">
        <div class="left-right">
          <p class="commodity"><i class="iconfont icon-wodedingdan1"></i></p>
          <span>商品管理</span>
        </div>
      </router-link>
      <router-link to="/orderadmin" class="router-link">
        <div class="left-right">
          <p class="order"><i class="iconfont icon-wodedingdan2"></i></p>
          <span>订单管理</span>
        </div>
      </router-link>
    </div>
    <div class="withdrawal-title">
      <div class="title">
       <span class="shu"></span>
       <span class="tixian">提现记录</span>
       <button class="tixian-but"><router-link to="/withdrawal" class="router">提现</router-link></button>
      </div>
      <ul>
        <li>
          <span>2021-01-19 12:00:00</span>
          <span><router-link to="/detailed" class="detailed">明细</router-link></span>
          <span style="color:red;">未到账</span>
        </li>
        <li>
          <span>2021-01-19 12:00:00</span>
          <span><router-link to="/detailed" class="detailed">明细</router-link></span>
          <span style="color:#1bc322;">已到账</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {info} from '../../api/api'
export default {
   name:'business',
   data(){
       return{
         headImg:require('../../assets/img/Headless.png'),
         licenese:'',
         nickname:'',
         avatarUrl:''
       }
   },
   mounted(){
     let that = this
     that.$getRequest(info).then(res => {
       if(res.data.code === 0){
         let {licenese,nickname,avatarUrl} = res.data.data
         that.licenese = licenese
         that.nickname = nickname
         that.avatarUrl = avatarUrl
       }
     })
   },
   methods:{

   }
}
</script>

<style>

</style>