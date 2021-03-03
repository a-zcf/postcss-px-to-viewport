<template>
  <div class="login">
    
  </div>
</template>

<script>
import Qs from 'qs'
const query = Qs.parse(location.search.substring(1)) // 获取url链接参数
export default {
  name:'login',
  data(){
    return{
    }
  },
  mounted(){
    let that = this
    localStorage.setItem('shopCode',query.shopCode)
    let shopCode = localStorage.getItem("shopCode");
    if(shopCode != 'null' && shopCode != "" && shopCode != "undefined"){
      that.$router.push({path:"/consumer"}) // 兑换
      }else{
      that.$router.push({path:"/business"}) // 商家
    }
  },
  created(){

  },
  methods:{
    
  }
}
</script>

<style>

</style>