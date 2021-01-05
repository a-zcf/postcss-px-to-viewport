<template>
   <!-- 本月售卖 -->
  <div class="salestoday">
   <div class="list_title">
      <select class="tixian_select" v-model="month" >
         <option >2021-01</option>
         <option >2021-02</option>
         <option >2021-03</option>
      </select>
      <span>总额：9333</span>
   </div>
   <ul class="sell_list">
      <li>
         <span class="date">2021-01-01</span>
         <span class="amount">0</span>
         <router-link :to="{path: '/detailed'}"><span class="detailed">明细</span></router-link>
      </li>
      <li>
         <span class="date">2021-01-01</span>
         <span class="amount">0</span>
         <router-link :to="{path: '/detailed'}"><span class="detailed">明细</span></router-link>
      </li>
   </ul>
  </div>
</template>

<script>
export default {
   name:'salestoday',
   data(){
      return{
        month:''
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