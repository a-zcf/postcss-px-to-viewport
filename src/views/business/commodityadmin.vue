<template>
  <div class="commodityadmin">
    <ul>
        <li v-for="(item,index) in list" :key="index">
            <p>商品名称：{{item.title}}</p>
            <p>需兑换积分：<b class="score">{{item.score}}龙币</b></p>
            <p class="flex">
              <span class="sold">已售：{{item.sales}}</span>
              <span class="sold">剩余：{{item.currentStock}}</span>
            </p>
        </li>
    </ul>
  </div>
</template>

<script>
import {goodsList} from '../../api/api'
export default {
  name:'commodityadmin',
  data(){
      return{
        list:[]
      }
  },
  mounted(){
    let that = this
    that.$getRequest(goodsList).then(res => {
      if(res.data.code === 0){
        this.list = res.data.data
      }
    })
  },
  methods:{

  }
}
</script>

<style>

</style>