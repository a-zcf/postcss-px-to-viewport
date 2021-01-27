<template>
  <div class="deliveryman">
    <div class="head">
      <img :src="avatarUrl" />
      <div class="head-text">
        <p class="nickname">
          <label>微信昵称：</label>
          <span>{{nickname}}</span>
        </p>
        <p class="nickname">
          <label>配送员：</label>
          <span>{{staffName}}</span>
        </p>
      </div>
    </div>
    <ul>
      <router-link to="/viewshop" class="router-link">
      <li>
          <p class="view-shop"><i class="iconfont icon-chakandianpu1"></i></p>
          <p>查看店铺</p>
      </li>
      </router-link>
      <router-link to="/addinventory" class="router-link">
      <li>
          <p class="add-inventory"><i class="iconfont icon-tianjiakucun"></i></p>
          <p>添加库存</p>
      </li>
      </router-link>
      <router-link to="/deliveryrecord" class="router-link">
      <li>
          <p class="delivery-record"><i class="iconfont icon-peisongjilu"></i></p>
          <p>配送记录</p>
      </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {oneself} from '../../../api/api'
export default {
  name:'deliveryman',
  data(){
      return{
        headImg:require('../../../assets/img/Headless.png'),
        nickname:'',
        avatarUrl:'',
        staffName:''
      }
  },
  mounted(){
    let that = this
     that.$getRequest(oneself).then(res => {
       if(res.data.code === 0){
         let {staffName,nickname,avatarUrl} = res.data.data
         that.staffName = staffName
         that.nickname = nickname
         that.avatarUrl = avatarUrl
       }else{
         that.$toast.fail(res.data.msg);
       }
     })
  },
  methods:{
      
  }
}
</script>

<style>

</style>