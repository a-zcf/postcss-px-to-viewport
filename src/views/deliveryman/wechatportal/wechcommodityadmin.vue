<template>
  <div class="commodityadmin">
    <ul>
        <li v-for="(item,index) in list" :key="index">
            <p>商品名称：{{item.title}}</p>
            <p>需兑换积分：{{item.score}}龙币</p>
            <p class="flex">
              <span class="total">总库存：{{item.stock}}</span>
              <span class="sold">已售：{{item.sales}}</span>
              <span class="sold">剩余：{{item.nowStock}}</span>
            </p>
        </li>
    </ul>
  </div>
</template>

<script>
import {deliveryRecord} from '../../../api/api'
export default {
   name:'wechcommodityadmin',
   data(){
       return{
        list:[]
       }
   },
   mounted(){
      let shopId = this.$route.query.shopId
      this.$getRequest(deliveryRecord,{shopId:shopId}).then( res => {
        if(res.data.code === 0){
          this.list = res.data.data
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