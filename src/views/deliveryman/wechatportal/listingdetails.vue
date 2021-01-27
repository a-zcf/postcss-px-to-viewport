<template>
  <div class="detailed">
     <div class="title">
         <span>商品名称</span>
         <span>上架数量</span>
     </div>
     <p class="hengxian"></p>
     <ul>
         <li v-for="(item,index) in detailsList" :key="index">
             <span class="name">{{item.title}}</span>
             <span class="number">{{item.num}}</span>
         </li>
     </ul>
  </div>
</template>

<script>
import {flowDetail} from '../../../api/api'
export default {
  name:'listingdetails',
  data(){
      return{
         detailsList:[]
      }
  },
  mounted(){
      let that = this
   let flowId = that.$route.query.flowId
   that.$getRequest(flowDetail,{flowId:flowId}).then( res => {
       if(res.data.code === 0){
           that.detailsList = res.data.data
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