<template>
  <div class="success">
    <i class="iconfont icon-chenggong icon-style"></i>
    <p class="success-text">恭喜您，领取成功</p>
    <button @click="clickWindo">进入积分商城兑换商品</button>
  </div>
</template>

<script>
export default {
  name:'success',
  data(){
      return{
         url:""
      }
  },
  mounted(){
     this.url = this.$route.query.url
  },
  methods:{
     clickWindo(){
       window.location = this.url
     }
  }
}
</script>

<style>

</style>