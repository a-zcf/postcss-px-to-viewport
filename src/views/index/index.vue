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
            <span class="account_balance">营业管理</span>
            <span class="balance"></span>
            <span class="iconfont icon-gengduo more"></span>
          </li>
        </router-link>
        <router-link to="/consumeradmin">
          <li>
            <span class="account_balance">消费者管理</span>
            <span class="balance"></span>
            <span class="iconfont icon-gengduo more"></span>
          </li>
        </router-link>
        <router-link to="/accountadmin">
          <li>
            <span class="account_balance">账户管理</span>
            <span class="balance"></span>
            <span class="iconfont icon-gengduo more"></span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="binding-but">
      <button class="left-jiao" @click="clickSingleBinding">单个绑定</button>
      <span></span>
      <button class="right-jiao" @click="clickBatchBinding">批量绑定</button>
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
    <!-- 绑定弹框 -->
    <van-overlay :show="show1" class="notice-overlay">
      <div class="wrapper">
        <h3>绑定</h3>
        <van-field
          v-model="licence"
          label="许可证号："
          placeholder="请输入您的有效许可证号"
          clearable
        />
        <van-field
          v-model="phone"
          label="电话号码："
          placeholder="请输入您的有效号码"
          clearable
        />
        <button @click="clickBinding">确定</button>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  notice,
  slider,
  isBind,
  supplierBind,
  getJssdkConfig,
} from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "index",
  data() {
    return {
      noticeList: [],
      show: false,
      show1: false,
      showsHowMarquee: false,
      img: require("../../assets/img/head-1.png"),
      imgList: [],
      licence: "",
      phone: "",
    };
  },
  mounted() {
    let that = this;
    that.$postRequest(isBind).then((res) => {
      if (res.data.code === 0) {
        let getIsBind = res.data.data.isBind;
        if (getIsBind === true) {
          that.show1 = false;
        } else {
          that.show1 = true;
        }
      }
    });
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
  },
  methods: {
    clickBinding() {
      // this.show1 = false;
      let that = this;
      if (
        that.licence === "" ||
        that.licence === null ||
        typeof that.licence === undefined
      ) {
        that.$toast("请输入您的有效许可证号");
        return false;
      }
      if (
        that.phone === "" ||
        that.phone === null ||
        typeof that.phone === undefined
      ) {
        that.$toast("请输入您的有效号码");
        return false;
      }
      that
        .$postRequest(supplierBind, {
          licence: that.licence,
          phone: that.phone,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            that.$toast.success("绑定成功");
            that.licence = "";
            that.phone = "";
            that.show1 = false;
            window.location = res.data.data.authUrl;
          } else {
            that.licence = "";
            that.phone = "";
            that.$toast.fail(res.data.msg);
          }
        });
    },
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
  },
};
</script>

<style>
</style>