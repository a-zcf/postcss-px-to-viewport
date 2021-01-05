
<template>
  <div class="stock">
    <div class="head-title">
      <span>烟品规格</span>
      <span>激活数量</span>
      <span>已支付</span>
    </div>
    <ul class="ul-list">
      <li>
        <span class="span brandName">烟品规格烟品规格烟品规格</span>
        <div class="span color">
          <span class="number">50</span>
          <router-link :to="{path: '/stockdetailed'}" class="mingxi"><span class="detailed">明细</span></router-link>
        </div>
        <span class="span">已支付</span>
      </li>
      <li>
        <span class="span brandName">真龙海韵</span>
        <div class="span color">
          <span class="number">50</span>
          <router-link :to="{path: '/stockdetailed'}" class="mingxi"><span class="detailed">明细</span></router-link>
        </div>
        <span class="span">已支付</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
   name:'stock',
   data(){
       return{

       }
   },
   mounted(){

   },
   methods:{

   }
}
</script>

<style>

</style>