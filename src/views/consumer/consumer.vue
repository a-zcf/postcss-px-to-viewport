<template>
  <div class="consumer">
     <div class="scan-code" v-show="show1">
       <i class="iconfont icon-shangpin"></i>
       <p>目前没有商品，赶快点击下面按钮扫码商品条形码添加购买商品吧~~</p>
       <button @click="saoYiSao">扫商品码添加</button>
     </div>

     <div class="commodity-exchange" v-show="show2">
       <ul>
         <li v-for ="(item,index) in list" :key="index">
            <van-swipe-cell left-width ="200px">
              <div class="content">
                <p class="title">{{item.title}}</p>
                <p class="l-r">
                  <span class="l"><i class="iconfont icon-jinbi"></i><b>{{item.score}}龙币</b></span>
                  <van-stepper class="r" :value="item.num" theme="round" button-size="22" disable-input @plus="clickAdd(item.barcode)" @minus="clickMinus(item.barcode)"/>
                </p>
              </div>
              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="clickGuanbi(item.barcode)"/>
              </template>
            </van-swipe-cell>
         </li>
       </ul>
       <div class="footer">
         <button @click="saoYiSao">扫商品码添加</button>
         <div class="footer-text">
           <p class="left">
             <span class="total">共计：{{coinNum}}龙币</span>
             <span class="my-dragoncoin">我的龙币：{{coin}}</span>
           </p>
           <p class="settlement" @click="submitPlaceOrder" :style="coinNum > coin ? 'background-color:#999;':'background-color:#ff9900;'">结算</p>
           <router-link to="/personalcenter" class="router">
           <p class="right">
             <i class="iconfont icon-wode my-icon"></i>
             <span>我的</span>
           </p>
           </router-link>
         </div>
       </div>
     </div>

  </div>
</template>

<script>
import {checkShop,goods,getJsSdkConfig,longCoin,order} from '../../api/api'
import wx from 'weixin-js-sdk';
var map = new Map()
export default {
  name:'consumer',
  data(){
      return{
        show1:true,
        show2:false,
        value:'',
        result:'',
        shopCode:'',
        list:[],
        coin:0,
      }
  },
  mounted(){
    let that = this
    that.getLongCoin()
    that.shopCode = localStorage.getItem("shopCode");
    that.$getRequest(checkShop,{shopCode:that.shopCode}).then(res => {
       if(res.data.code === 0){
         let url = location.href.split('#')[0]
          that.$getRequest(getJsSdkConfig,{url:url}).then(res => {
             if(res.data.code === 0){
              let {appid,timeStamp,nonceStr,sign} = res.data.config
              wx.config({
                  debug: false,
                  appId: appid,
                  timestamp: timeStamp,
                  nonceStr: nonceStr,
                  signature: sign,
                  jsApiList: [
                      'scanQRCode'
                  ]
              });
              wx.ready(function(){
                  
              });
              wx.error(function(res){

              });
             }
          })
       }else{
         that.$toast.fail(res.data.msg);
       }
    })
  },
  methods:{
    clickAdd(barCode){
      this.result = barCode
      this.getGoods()
    },
    clickMinus(barCode){
      let that = this
      this.result = barCode
      let minus = map.get(barCode)
       let num = minus.num - 1
       if(num <= 0){
        map.delete(barCode)
       }else{
         that.value = num
         minus.num = num
         map.set(barCode,minus)
       }
       that.list = []
      map.forEach(function (item, key) {
        that.value = item.num
        that.list.push(item)
      });
    },
    clickGuanbi(barCode){
      let that = this
      this.result = barCode
       map.delete(barCode)
       that.list = []
       map.forEach(function (item, key) {
        that.value = item.num
        that.list.push(item)
      });
    },
    saoYiSao(){
       let that = this
       wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if(result.indexOf(",")== -1){
                that.result = result
            }else{
              that.result = result.split(',')[1]
            }
            that.getGoods()
        },
        error: function (res) {
        }
        });
    },
    getGoods(){
      let that = this
      that.$getRequest(goods,{shopCode:that.shopCode,barcode:that.result}).then( res => {
        if(res.data.code === 0){
          let list = res.data.data
          let barcode = that.result.toString()
          let oList = map.get(barcode)
          if(oList == 'undefined' || oList == null || oList == ''){
            let arr = {
              num:1,
              goodsId:list.goodsId,
              title:list.title,
              img:list.img,
              score:list.score,
              barcode:that.result
            }
            map.set(barcode,arr)
            that.value = arr.num
          }else{
            oList.num = oList.num + 1
            map.set(barcode,oList)
            that.value = oList.num
          }
          that.list = []
           map.forEach(function (item, key) {
             that.list.push(item)
            });
            if(that.list != null && that.list.length > 0){
               that.show1 = false
               that.show2 = true
            }else{
              that.show1 = true
               that.show2 = false
            }
        }else{
          that.$toast.fail(res.data.msg)
        }
      })
    },
    submitPlaceOrder(){
      let that = this
      if(that.list.length == 0){
          that.$toast('请扫码添加您的商品！');
          return
      }
      if(that.coinNum > that.coin){
        that.$toast('您的龙币不足！')
        return
      }
      that.list = that.list.map(({goodsId,num,score}) => ({goodsId,num,score}))
      let goodsList = {goodsList:that.list,shopCode:that.shopCode}
      that.$postRequest(order,goodsList).then( res => {
         if(res.data.code === 0){
           map.clear()
           that.list = []
           let params = JSON.stringify(res.data.data)
           that.$router.push({path:'/success?obj='+encodeURIComponent(params)})
         }else{
           that.list = []
           that.getLongCoin()
           map.forEach(function (item, key) {
            that.value = item.num
            that.list.push(item)
          });
           that.$toast.fail(res.data.msg)
         }
      })
    },
    getLongCoin(){
      let that = this
      that.$getRequest(longCoin).then( res => {
        if(res.data.code === 0){
          that.coin = res.data.data
        }
      })
    }
  },
  computed:{
      coinNum:function () {
          let result = 0
            for(let i=0;i < this.list.length;i++){
              result += (this.list[i].score * this.list[i].num)
            }
            return result
      }
  }
}
</script>

<style>

</style>