<template>
  <div class="personalcenter">
    <div class="per-head">
        <img :src="avatarUrl != '' ?avatarUrl : headImg" />
        <p>{{nickname == ''?'未获取信息':nickname}}</p>
    </div>
    <ul>
        <router-link to="/myorder">
            <li>
                <i class="iconfont icon-dingdan icon1"></i>
                <span>我的订单</span>
                <i class="iconfont icon-gengduo icon2"></i>
            </li>
        </router-link>
    </ul>
  </div>
</template>

<script>
import {consumerInfo} from '../../api/api'
export default {
  name:"personalcenter",
  data(){
      return{
        headImg:require('../../assets/img/Headless.png'),
        avatarUrl:'',
        nickname:''
      }
  },
  mounted(){
     let that = this
     that.$getRequest(consumerInfo).then( res => {
       if(res.data.code === 0){
          let {avatarUrl,nickname} = res.data.data
          that.avatarUrl = avatarUrl
          that.nickname = nickname
       }else{
          
       }
     })
  },
  methods:{

  }
}
</script>

<style>

</style>