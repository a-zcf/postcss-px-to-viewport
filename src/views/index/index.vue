<template>
  <div class="index">
    <div class="slide">
     <div class="head">
       填写答卷，答对成功后领取礼品！
     </div>
     <ul class="answersheet-list">
       <li v-for="(item,index) in dataList" :key="index">
         <p>{{item.questionContent}}</p>
         <div class="radio">
          <van-radio-group v-model="item.questionId" direction="horizontal" class="radio-group" v-for="(list,index) in item.questionItemList" :key="index">
            <van-radio :name="list.itemId" @click="clickRadio(list.itemId,item)"  checked-color="#699" >{{list.itemContent}}</van-radio>
          </van-radio-group>
         </div>
       </li>
     </ul>
     </div>
     <button class="submit" v-if="activityStatus===1 && examineStatus===0" @click="clickSubmit">提交</button>
     <div class="tankuang" v-show="show">
         <div class="regret-box">
          <img :src="weepImg" class="weepImg" />
          <p>很遗憾！答题失败...</p>
          <button class="regret-box-but" @click="clickClose">重新答题</button>
          <van-icon name="close"  class="regret-close" @click="clickClose"/>
         </div>
     </div>
  </div>
</template>

<script>
import {question,subOrder,status} from "../../api/api"
var map = new Map();
export default {
  name:'index',
  data(){
      return{
        show:false,
        dataList:'',
        giftBagImg:require("../../assets/img/giftBag.png"),
        weepImg:require("../../assets/img/weepImg.png"),
        activityStatus:'',
        examineStatus:'',
      }
  },
mounted () {
  let that = this
  that.getStatus()
},
methods: {
  getQuestion(){
    let that = this
    that.$getRequest(question).then( res => {
     if(res.data.code === 0){
       let questionId = ''
       let list = res.data.data
       for(let i=0;i<list.length;i++){
          questionId = list[i].questionId+''
          list[i].questionId = questionId
       }
       that.dataList = list
     }
  })
  },
  getStatus(){
    let that = this
  that.$getRequest(status).then( res => {
    if(res.data.code === 0){
      that.activityStatus = res.data.data.activityStatus
      that.examineStatus = res.data.data.examineStatus
      switch(that.activityStatus){
        case 0:
          that.$toast('活动还暂未开始！');
          break
        case 1:
          switch(that.examineStatus){
            case 0:
              that.getQuestion()
              break
            case 2:
              this.$router.push({ path: "/qrcode"});
              break
            case 5:
              this.$router.push({ path: "/qrcode"});
              break
            case 7:
              // this.$router.push({ path: "/qrcode"});
          }
          break
        case 2:
          that.$toast('活动已结束！');
      }
    }
  })
  },
  clickClose(){
    this.getStatus()
    this.show = false
    // this.$router.go(0);
  },
  clickRadio(itemId,questionId){
    map.set(questionId.questionIdStr,itemId)
  },
  clickSubmit(){
    let that = this
    let arItemId = []
    map.forEach(function (item, key) {
     arItemId.push(item)
    });
    if(arItemId.length != that.dataList.length){
       that.$toast('您还有题目未答完！');
       return
    }
    that.$postRequest(subOrder,{itemId:arItemId,examineId:localStorage.getItem("examineId")}).then( res => {
      if(res.data.code === 0){
        that.$toast.success('恭喜您，答题成功！');
        this.$router.push({ path: "/qrcode"});
      }else{
        that.show = true
      }
    })
  }
}
}
</script>

<style>

</style>