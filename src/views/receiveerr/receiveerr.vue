<template>
  <div class="receiveerr">
    <div class="err" v-show="show">
      <i class="iconfont icon-guanbi guanbi" @click="clickGuanbi"></i>
      <img src="../../assets/img/collectionfailed.png" />
      <div class="bott" @click="clickWindo">
        <button>注册成真龙会员</button>
      </div>
      <p>注册成为真龙会员后</p>
      <p>重新进入猜谜页面，即可领取奖品哦</p>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  name: "receiveerr",
  data() {
    return {
      url: "",
      show: true,
    };
  },
  mounted() {
    this.url = this.$route.query.url;
  },
  methods: {
    clickWindo() {
      if (this.url == undefined || this.url == "" || this.url == null) {
      } else {
        window.location = this.url;
      }
    },
    clickGuanbi() {
      wx.closeWindow();
    },
  },
};
</script>

<style>
</style>