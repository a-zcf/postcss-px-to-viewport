<template>
  <div class="transition">
    
  </div>
</template>

<script>
import {userInfo} from '../../api/api'
export default {
  name:'transition',
  data(){
      return{
        
      }
  },
  mounted(){
    let that = this
    let token = localStorage.getItem('token')
    that.$getRequest(userInfo,{token:token}).then(res => {
        if(res.data.code === 0){
          this.$router.replace({path:'/index',query:{id:res.data.user.id,headimgurl:res.data.user.headimgurl}})
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