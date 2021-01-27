<template>
  <div class="addinventory">
    <div class="head">
      <img :src="avatarUrl" />
      <div class="head-text">
        <p class="nickname">
          <label>当前商家：</label>
          <span>{{shopName}}</span>
        </p>
        <p class="nickname">
          <label>店铺地址：</label>
          <span>{{address}}</span>
        </p>
      </div>
    </div>
    <button class="saoma-add" v-show="show1" @click="saoYiSao" >扫商品码添加商品库存</button>
    <div class="add" v-show="show2">
      <div class="slide">
        <ul class="ul-list">
          <li v-for="(item,index) in list" :key="index">
            <p class="left-right">
              <span class="name-l name-lenght">{{item.title}}</span>
              <span class="iconfont icon-guanbi " @click="clickGuanbi(item.barcode)"></span>
            </p>
            <p>
              <span class="total-stock">总库存：{{item.stock}}</span>
              <span class="sold">已售：{{item.sales}}</span>
              <span class="surplus">剩余：{{item.nowStock}}</span>
            </p>
            <p class="left-right">
              <span class="name-l color">龙币{{item.score}}</span>
              <span class="stepper-r"><van-stepper :value="item.num" theme="round" button-size="22" disable-input @plus="clickAdd(item.barcode)" @minus="clickMinus(item.barcode)"/></span>
            </p>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="but">
          <button class="bg-orange" @click="saoYiSao">扫商品码添加库存</button>
          <button class="bg-blue" @click="addStock">确认添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {shopInfo,getJsSdkConfig,saoMaGoods,goodsStock} from "../../../api/api"
import wx from 'weixin-js-sdk';
var map = new Map()
export default {
  name:'addinventory',
  data(){
      return{
       headImg:require('../../../assets/img/Headless.png'),
       show1:true,
       show2:false,
       value:'',
       avatarUrl:'',
       shopName:"",
       address: "",
       result:'',
       shopCode:'',
       list:[],
      }
  },
  mounted(){
    let that = this
    that.shopCode = localStorage.getItem("shopCode");
     that.$getRequest(shopInfo,{shopCode:that.shopCode}).then(res => {
       if(res.data.code === 0){
         let {address,shopName,avatarUrl} = res.data.data
         that.address = address
         that.shopName = shopName
         that.avatarUrl = avatarUrl
       }
     })
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
  },
  methods:{
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
      that.$getRequest(saoMaGoods,{shopCode:that.shopCode,barcode:that.result}).then( res => {
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
              barcode:that.result,
              sales:list.sales,
              stock:list.stock,
              nowStock:list.nowStock
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
    addStock(){
      let that = this
      if(that.list.length == 0){
          that.$toast('请扫码添加商品！');
          return
      }
      that.list = that.list.map(({goodsId,num}) => ({goodsId,num}))
      let goodsList = {goodsList:that.list,shopCode:that.shopCode}
      that.$postRequest(goodsStock,goodsList).then( res => {
         if(res.data.code === 0){
           that.$toast.success('添加成功！')
           that.list = []
         }else{
           that.list = []
           that.$toast.fail(res.data.msg)
         }
      })
    }
  }
}
</script>

<style>

</style>