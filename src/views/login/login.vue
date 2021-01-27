<template>
  <div class="login">
    <van-overlay :show="show" @click="show = true">
      <div class="binding">
          <h3>零售户绑定</h3>
          <div class="field">
            <van-field v-model="user" label="零售户账号" placeholder="请输入用户名" clearable/>
            <van-field v-model="password" type="password" label="零售户密码" placeholder="请输入用密码" clearable/>
          </div>
          <div class="but">
             <button @click="clickReset">重置</button>
             <button @click="clickSubmit">确定</button>
          </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {authentication,staffAuthentication} from "../../api/api"
export default {
  name:'login',
  data(){
    return{
     show:false,
     user:'',
     password:'',
     type:''
    }
  },
  mounted(){
    let that = this
    let shopCode = localStorage.getItem("shopCode");
    that.type = localStorage.getItem("type");
    if(that.type === '0'){
      if(shopCode != "null" && shopCode != "" && shopCode != "undefined"){
        that.$router.push({path:"/consumer"})
      }else{
        that.$toast.fail('扫码失败，请重新扫店铺码进入！');
      }
    }else if(that.type === '1'){
      if(shopCode != "null" && shopCode != "" && shopCode != "undefined"){
        that.$router.push({path:"/business"})
      }else{
        that.show = true
      }
    }else if(that.type === '2'){
      if(shopCode != "null" && shopCode != "" && shopCode != "undefined"){
        that.$router.push({path:"/deliveryman"})
      }else{
        that.show = true
      }
    }else{

    }
  },
  methods:{
    clickSubmit(){
      let that = this
      if(that.user === '' || that.user === null || typeof(that.user) === undefined){
         that.$toast('请输入正确的零售户账号！');
         return
      }
      if(that.password === '' || that.password === null || typeof(that.password) === undefined){
         that.$toast('请输入正确的密码！');
         return
      }
      var repPass = new RegExp(/[\W]/g,''); // 字母
      if(!repPass.test(that.password)){
        
      }else{
        that.$toast('密码必须为字母或数字，不能包含特殊符号');
          return
      }
      if(that.type === '1'){
        that.getAuthentication()
      }else if(that.type === '2'){
        that.getStaffAuthentication()
      }
    },
    getAuthentication(){
      let that = this
      that.$postRequest(authentication,{account:that.user,password:that.password}).then( res => {
         if(res.data.code === 0){
            that.$toast.success('绑定成功！');
            that.$router.push({path:"/business"})
            that.user = ''
            that.password = ''
            that.show = false
         }else{
            that.$toast.fail(res.data.msg);
         }
      })
    },
    getStaffAuthentication(){
      let that = this
      that.$postRequest(staffAuthentication,{account:that.user,password:that.password}).then( res => {
         if(res.data.code === 0){
            that.$toast.success('绑定成功！');
            that.$router.push({path:"/addinventory"})
            that.user = ''
            that.password = ''
            that.show = false
         }else{
            that.$toast.fail(res.data.msg);
         }
      })
    },
    clickReset(){
      this.user = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>