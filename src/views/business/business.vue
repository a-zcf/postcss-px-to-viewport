<template>
  <div class="business">
    <div class="head">
      <img :src="shopIcon == ''?headImg:shopIcon" />
      <div class="head-text" v-if="status === '1'">
        <p class="nickname">
          <label>店铺名称：</label>
          <span>{{shopName}}</span>
        </p>
        <p>
          <label>许可证号：</label>
          <span>{{licenese}}</span>
        </p>
        <p>
          <label>商家：</label>
          <span class="renzheng">{{status ==='1'?'已认证':'' || status ==='0'?'管理员被禁用':''}}</span>
        </p>
      </div>
      <div class="head-text" v-if="status === '-1'">
        <p class="nickname">
          <label>商家：</label>
          <span class="renzheng" style="background-color:#999;">未认证</span>
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
    <!-- <div class="withdrawal-title">
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
    </div> -->
    <van-overlay :show="show" @click="show = true">
      <div class="binding">
          <h3>店铺管理员激活</h3>
          <div class="field">
            <van-field v-model="verificationCode" label="激活验证码" placeholder="请输入用户名" clearable/>
            <!-- <van-field v-model="password" type="password" label="零售户密码" placeholder="请输入用密码" clearable/> -->
          </div>
          <div class="but">
             <button @click="clickReset">重置</button>
             <button @click="clickSubmit">确定</button>
          </div>
      </div>
      <div class="guanbi-but">
        <i class="iconfont icon-guanbi1 " @click="clickClose"></i>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {verify,authentication} from '../../api/api'
import wx from 'weixin-js-sdk'
export default {
   name:'business',
   data(){
       return{
         headImg:require('../../assets/img/Headless.png'),
         status:'-1',
         licenese:'',
         shopName:'',
         shopIcon:'',
         show:false,
         verificationCode:'',
       }
   },
   mounted(){
     let that = this
     that.getVerify()
   },
   methods:{
      getVerify(){
        let that = this
        that.$getRequest(verify).then( res => {
        if(res.data.code === 0){
            that.status = res.data.data.status
            if(that.status === '-1'){
              that.show = true
            }else if(that.status === '1'){
              let {shopName,shopIcon,licenese} = res.data.data.shop
              that.shopName = shopName
              that.shopIcon = shopIcon
              that.licenese = licenese
            }else if(that.status === '0'){
              that.$toast.fail('管理员被禁用');
            }
        }else{

        }
      })
      },
      clickSubmit(){
      let that = this
      if(that.verificationCode === '' || that.verificationCode === null || typeof(that.verificationCode) === undefined){
         that.$toast('请输入正确的零售户账号！');
         return false
      }
      that.$postRequest(authentication,{verificationCode:that.verificationCode}).then( res => {
         if(res.data.code === 0){
            that.$toast.success('绑定成功！');
            that.verificationCode = ''
            that.getVerify()
            that.show = false
         }else{
            that.verificationCode = ''
            that.$toast.fail(res.data.msg);
         }
      })
    },
    clickReset(){
      this.verificationCode = ''
    },
    clickClose(){
      wx.closeWindow()
    }
   }
}
</script>

<style>

</style>