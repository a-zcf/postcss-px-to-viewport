<template>
  <div class="accountadmin">
    <div class="edit-preservation" @click="preservationInfo">
        <span>保存</span>
    </div>
    <div class="edit-content">
      <van-field type="text" class="vav-edit" :border="true" clearable v-model="supplierName" label="店铺名称" placeholder="请输入店铺名称" />
      <van-field type="text" class="vav-edit" :border="true" clearable v-model="contact" label="联系人" placeholder="请输入联系人" />
      <van-field type="tel" class="vav-edit" :border="true" clearable v-model="phone" label="电话" placeholder="请输入电话" />
      <van-field type="text" class="vav-edit" :border="true" clearable v-model="address" label="店铺位置" placeholder="请输入店铺位置" />
      <van-field
        v-model="announcement"
        label="店铺公告"
        type="textarea"
        placeholder="请输入店铺公告"
        class="textarea"
      />
      <p class="hdgg-text">活动公告：</p>
      <van-field type="text" :border="true" clearable v-model="name" label="输入名称" placeholder="请输活动入名称" />
      <van-field type="text" :border="true" clearable v-model="url" label="跳转链接" placeholder="请输入跳转链接" />
      <div class="add-img">
          <span>添加图片：</span>
          <img :src="imgURL" class="img" v-if="imgURL!=''" @click="addImage"/>
          <div class="iconfont icon-shiliangzhinengduixiang58 shangchuan-but" v-if="imgURL ==''" @click="addImage"></div>
      </div>
      <div class="add-img">
          <span>添加二维码：</span>
          <img :src="shopCode_img" class="img" v-if="shopCode_img!=''" @click="addCodeImage"/>
          <div class="iconfont icon-shiliangzhinengduixiang58 shangchuan-but" v-if="shopCode_img ==''" @click="addCodeImage"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { supplierInfo, supplierUpdate,fileUpload, getJssdkConfig } from '../../api/api'
import wx from 'weixin-js-sdk' // 微信jssdk
export default {
   name:'accountadmin',
   data(){
       return{
        border:false,
        supplierName:"", // ----店铺名称
        address:"",
        phone:"",
        contact:"",
        announcement:'',
        url:'',
        name:'',
        imgURL:'',
        shopCode_img:''
       }
   },
   mounted(){
    let that = this;
    that.$postRequest(supplierInfo).then( res => {
      if(res.data.code === '0000'){
        let supplierInfo = res.data.data.supplierInfo
        that.supplierName = supplierInfo.supplierName
        that.address = supplierInfo.address
        that.phone = supplierInfo.phone
        that.contact = supplierInfo.contact
        that.announcement = supplierInfo.announcement
        that.url = supplierInfo.activity.url
        that.name = supplierInfo.activity.name
        that.imgURL = supplierInfo.activity.headImg
        that.shopCode_img = supplierInfo.shopCodeImg
      }
    });
    let url = location.href.split('#')[0]
    that.$postRequest(getJssdkConfig,{url: url}).then( res => {
      if(res.data.code === "0000"){
        let getJsdk = res.data.data.config
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: getJsdk.appid, // 必填，公众号的唯一标识
          timestamp: getJsdk.timestamp, // 必填，生成签名的时间戳
          nonceStr: getJsdk.nonceStr, // 必填，生成签名的随机串
          signature: getJsdk.signature,// 必填，签名
          jsApiList: ['getLocalImgData','chooseImage','uploadImage'] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          })
          wx.error(function (res) {
          })
      }
    });
   },
   methods:{
       preservationInfo(){
     let that = this;
     let panms = {
        supplierName: that.supplierName, // ----店铺名称
        address:that.address,
        phone:that.phone,
        contact:that.contact,
        announcement:that.announcement,
        activity:{
          url:that.url,
          name:that.name,
          headImg:that.imgURL,
        },
        shopCodeImg:that.shopCode_img
     }
     this.$postRequest(supplierUpdate,panms).then( res => {
       if(res.data.code === "0000"){
         that.$toast("保存成功！");
         this.$router.push({path: "/" });
       }else{
         console.log(res.data.message)
       }
     })
   },
   addImage(){
     let that = this
     wx.chooseImage({
          // 调用wx选择图片
          count: 1, // 默认9，也可通过变量设置
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            let localIds = res.localIds.toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.getLocalImgData({
            localId: localIds, // 图片的localID
            success: function (res) {
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              const u = navigator.userAgent;
              const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              if (isiOS) {
                 that.$postRequest(fileUpload,{localData:localData}).then( res => {
                    if(res.data.code === "0000"){
                      that.imgURL = res.data.data.url
                      that.$toast("上传成功！");
                    }else{
                      that.$toast("上传失败！");
                    }
                  })
                return "ios";
              } else {
                if (localData.indexOf('data:image') != 0) {
                  localData = 'data:image/jpeg;base64,' + localData;
                  }
                  localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg'); // 此处的localData 就是你所需要的base64位
                  that.$postRequest(fileUpload,{localData:localData}).then( res => {
                    if(res.data.code === "0000"){
                      that.imgURL = res.data.data.url
                      that.$toast("上传成功！");
                    }else{
                      that.$toast("上传失败！");
                    }
                  })
                  return "andriod";
              }
            }
          });
          },
          fail: err => {
            alert("上传失败...");
          }
        });
   },
   addCodeImage(){
      let that = this
     wx.chooseImage({
          // 调用wx选择图片
          count: 1, // 默认9,也可通过变量设置
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            let localIds = res.localIds.toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.getLocalImgData({
            localId: localIds, // 图片的localID
            success: function (res) {
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              const u = navigator.userAgent;
              const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              if (isiOS) {
                 that.$postRequest(fileUpload,{localData:localData}).then( res => {
                    if(res.data.code === "0000"){
                      that.shopCode_img = res.data.data.url
                      that.$toast("上传成功！");
                    }else{
                      that.$toast("上传失败！");
                    }
                  })
                return "ios";
              } else {
                if (localData.indexOf('data:image') != 0) {
                  localData = 'data:image/jpeg;base64,' + localData;
                  }
                  localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg'); // 此处的localData 就是你所需要的base64位
                  that.$postRequest(fileUpload,{localData:localData}).then( res => {
                    if(res.data.code === "0000"){
                      that.shopCode_img = res.data.data.url
                      that.$toast("上传成功！");
                    }else{
                      that.$toast("上传失败！");
                    }
                  })
                  return "andriod";
              }
            }
          });
          },
          fail: err => {
            alert("上传失败...");
          }
        });
   }
   }
}
</script>

<style>

</style>