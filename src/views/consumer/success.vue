<template>
  <div class="success">
     <i class="iconfont icon-chenggong1 icon-success"></i>
     <p class="success-text">恭喜您，兑换成功！</p>
     <p class="details-time">
        <span class="span1">订单详情：</span>
        <span class="span2"></span>
     </p>
     <p class="details-time" v-for="(item,index) in lists.goodsList" :key="index">
        <span class="gift-bag">{{item.title}}</span>
        <span class="number">×{{item.num}}</span>
        <span class="long-bi">{{item.score * item.num}}龙币</span>
     </p>
     <p class="details-time">
        <span class="span1">兑换时间：</span>
        <span class="span2">{{lists.createTime}}</span>
     </p>
  </div>
</template>

<script>
export default {
  name:"success",
  data(){
      return{
       lists:{},
      }
  },
  mounted(){
   let that = this
   let list = decodeURIComponent(this.$route.query.obj);
   that.lists = JSON.parse(list)
  },
  methods:{
  }
}
</script>

<style>

</style>