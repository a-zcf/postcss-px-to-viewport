<template>
  <div class="qrcode">
      <h3>恭喜您，答题成功！</h3>
      <p>下一步</p>
      <p>出示该码给核销人员核销</p>
      <div class="code">
       <div id="qrcode" ref="qrcode"></div>
      </div>
      <div class="tankuang" v-show="show">
         <div class="giftbag-box">
          <p>恭喜您！答题成功</p>
          <p>获得礼品一份！</p>
          <img :src="giftBagImg" class="giftBagImg" />
          <button class="giftbag-box-but" @click="clickReceive">立即领取</button>
          <van-icon name="close"  class="close" @click="clickClose"/>
         </div>
     </div>
  </div>
</template>

<script>
import {status,getGift} from "../../api/api"
import QRCode from 'qrcodejs2'
export default {
  name:'qrcode',
  data(){
      return{
       show:false,
       giftBagImg:require("../../assets/img/giftBag.png"),
       timer:''
      }
  },
  mounted(){
      let that = this
      that.$getRequest(status).then( res => {
        if(res.data.code === 0){
          let qcode = res.data.data.qcode
          let qrcode = new QRCode('qrcode',{
            width: 200,
            height: 200,
            text: qcode,
          })
        }
      })
      that.timer = window.setInterval(() => {
        setTimeout(function()  {
          that.getStatus()
        }, 0)
      }, 3000)
  },
  methods:{
    clickClose(){
      this.show = false
    },
    getStatus(){
      let that = this
      that.$getRequest(status).then( res => {
        if(res.data.code === 0){
          let examineStatus = res.data.data.examineStatus
          if(examineStatus===5){
            this.show = true
          }
        }
      })
    },
    clickReceive(){
       this.$getRequest(getGift).then( res => {
         if(res.data.code === 0){
           this.show = false
           window.location = res.data.url
         }else{
           this.$toast.fail(res.data.msg);
         }
       })
    }
  },
  destroyed() {
    window.clearInterval(this.timer)
  }

}
</script>

<style>

</style>