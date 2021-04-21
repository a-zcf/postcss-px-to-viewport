<template>
  <div class="index">
    <!-- 公告 -->
    <div class="haed-notice" v-show="showsHowMarquee">
      <van-notice-bar
        left-icon="volume-o"
        :scrollable="false"
        color="#1989fa"
        background="#ecf9ff"
      >
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item
            v-for="(item, index) in noticeList"
            :key="index"
            @click="clickNoticeList"
            >{{ index + 1 + "、" }}{{ item }}</van-swipe-item
          >
        </van-swipe>
      </van-notice-bar>
    </div>
    <!-- 广告图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1d62f0">
      <van-swipe-item v-for="(item, index) in imgList" :key="index">
        <img :src="item.imageUrl" @click="See(item.linkPage)" />
      </van-swipe-item>
    </van-swipe>
    <!-- 列表 -->
    <div class="list">
      <ul>
        <router-link to="/businessadmin">
          <li>
            <i class="iconfont icon-left-yingyeguanli font-i"></i>
            <span>营业管理</span>
            <i class="iconfont icon-gengduo1"></i>
          </li>
        </router-link>
        <router-link to="/consumeradmin">
          <li>
            <i class="iconfont icon-xiaofeizhedongcha font-i"></i>
            <span>消费者管理</span>
            <i class="iconfont icon-gengduo1"></i>
          </li>
        </router-link>
        <router-link to="/accountadmin">
          <li>
            <i class="iconfont icon-zhanghuguanli font-i"></i>
            <span>账户管理</span>
            <i class="iconfont icon-gengduo1"></i>
          </li>
        </router-link>
        <li @click="clickShopLoginUrl">
          <i class="iconfont icon-gexinghuashezhi"></i>
          <span>个性化设置</span>
          <i class="iconfont icon-gengduo1"></i>
        </li>
      </ul>
    </div>
    <div class="list">
      <div class="but">
        <div class="but-icon" @click="clickSingleBinding">
          <i class="iconfont icon-anniu icon-anniu01"></i>
          <p class="icon-anniu01">单个绑定</p>
        </div>
        <div class="but-icon" @click="clickBatchBinding">
          <i class="iconfont icon-piliangtianjia icon-piliangtianjia01"></i>
          <p class="icon-piliangtianjia01">批量绑定</p>
        </div>
      </div>
    </div>
    <!-- 公告弹框 -->
    <van-overlay :show="show" class="notice-overlay">
      <div class="wrapper">
        <h3>公告</h3>
        <p v-for="(item, index) in noticeList" :key="index">
          {{ index + 1 + "、" }}{{ item }}
        </p>
        <button @click="clickOk">好的</button>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  notice,
  slider,
  getJssdkConfig,
  getThirdIndexUrl,
} from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "index",
  data() {
    return {
      noticeList: [],
      show: false,
      // show1: false,
      showsHowMarquee: false,
      img: require("../../assets/img/head-1.png"),
      imgList: [],
      licence: "",
      phone: "",
      shopLoginUrl: "",
    };
  },
  mounted() {
    let that = this;
    that.$postRequest(notice).then((res) => {
      if (res.data.code === 0) {
        if (res.data.data.list.length <= 0) {
          that.showsHowMarquee = false;
        } else {
          that.showsHowMarquee = true;
          that.noticeList = res.data.data.list;
        }
      }
    });
    that.$postRequest(slider).then((res) => {
      if (res.data.code === 0) {
        if (res.data.data.list.length <= 0) {
          let list = { imageUrl: that.img };
          that.imgList.push(list);
        } else {
          that.imgList = res.data.data.list;
        }
      }
    });
    let url = location.href.split("#")[0];
    that.$postRequest(getJssdkConfig, { url: url }).then((res) => {
      if (res.data.code === 0) {
        let { appId, timestamp, nonceStr, signature } = res.data.data.config;
        wx.config({
          debug: false,
          appId: appId, // 必填，业微信的appID
          timestamp: timestamp, // ，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名
          jsApiList: ["scanQRCode"],
        });
        wx.ready(function () {});
        wx.error(function (res) {});
      }
    });
    that.$getRequest(getThirdIndexUrl).then((res) => {
      if (res.data.code == 0) {
        let { shopLoginUrl } = res.data.data;
        that.shopLoginUrl = shopLoginUrl;
      }
    });
  },
  methods: {
    See(e) {
      window.location.href = e;
    },
    clickNoticeList() {
      this.show = true;
    },
    clickOk() {
      this.show = false;
    },
    clickSingleBinding() {
      let that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          that.$router.push({
            path: "/singlebinding",
            query: { result: result },
          });
        },
      });
    },
    clickBatchBinding() {
      let that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          that.$router.push({
            path: "/batchbinding",
            query: { result: result },
          });
        },
      });
    },
    clickShopLoginUrl() {
      window.location = this.shopLoginUrl;
    },
  },
};
</script>

<style>
</style>