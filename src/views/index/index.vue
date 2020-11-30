<template>
  <div class="index">
    <div class="slide">
     <div class="head">
       填写答卷，答对成功后领取礼品！
     </div>
     <ul class="answersheet-list">
       <li>
         <p>1、你对真龙品牌香烟了解如何？你对真龙品牌香烟了解如何？</p>
         <van-radio-group v-model="radio" direction="horizontal" class="radio">
          <van-radio name="1" checked-color="#699">非常了解</van-radio>
          <van-radio name="2" checked-color="#699">基本了解</van-radio>
          <van-radio name="3" checked-color="#699">不是很了解</van-radio>
          <van-radio name="4" checked-color="#699">不了解</van-radio>
         </van-radio-group>
       </li>
       <li>
         <p>2、你对真龙品牌香烟了解如何？</p>
         <van-radio-group v-model="radio" direction="horizontal" class="radio">
          <van-radio name="5" checked-color="#699">非常了解</van-radio>
          <van-radio name="6" checked-color="#699">基本了解</van-radio>
          <van-radio name="7" checked-color="#699">不是很了解</van-radio>
          <van-radio name="8" checked-color="#699">不了解</van-radio>
         </van-radio-group>
       </li>
       <li>
         <p>3、你对真龙品牌香烟了解如何？</p>
         <van-radio-group v-model="radio" direction="horizontal" class="radio">
          <van-radio name="5" checked-color="#699">非常了解</van-radio>
          <van-radio name="6" checked-color="#699">基本了解</van-radio>
          <van-radio name="7" checked-color="#699">不是很了解</van-radio>
          <van-radio name="8" checked-color="#699">不了解</van-radio>
         </van-radio-group>
       </li>
       <li>
         <p>4、你对真龙品牌香烟了解如何？</p>
         <van-radio-group v-model="radio" direction="horizontal" class="radio">
          <van-radio name="5" checked-color="#699">非常了解</van-radio>
          <van-radio name="6" checked-color="#699">基本了解</van-radio>
          <van-radio name="7" checked-color="#699">不是很了解</van-radio>
          <van-radio name="8" checked-color="#699">不了解</van-radio>
         </van-radio-group>
       </li>
       <li>
         <p>5、你对真龙品牌香烟了解如何？</p>
         <van-radio-group v-model="radio" direction="horizontal" class="radio">
          <van-radio name="5" checked-color="#699">非常了解</van-radio>
          <van-radio name="6" checked-color="#699">基本了解</van-radio>
          <van-radio name="7" checked-color="#699">不是很了解</van-radio>
          <van-radio name="8" checked-color="#699">不了解</van-radio>
         </van-radio-group>
       </li>
     </ul>
     </div>
     <button class="submit">提交</button>
  </div>
</template>

<script>
export default {
  name:'index',
  data(){
      return{
        radio:''
      }
  },

}
</script>

<style>

</style>