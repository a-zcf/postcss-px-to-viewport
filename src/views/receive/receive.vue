<template>
  <div class="receive">
    <img
      src="http://res.thewm.cn/zlbean//uploadpath/goodimage/c3f17bc508914682b721715a7433eea1_20210234_100.jpg"
      class="longbi"
      v-show="show"
    />
    <img src="../../assets/img/receice6000.jpg" class="longbi" v-show="show1" />
    <div class="height"></div>
    <img
      src="../../assets/img/lingqu_03.png"
      class="lingqu-but"
      @click="clickReceive"
      v-if="totalScore > 0"
    />
    <img
      src="../../assets/img/yilingqu_03.png"
      class="lingqu-but"
      @click="clickReceive"
      v-else
    />
    <p class="p" v-if="totalScore <= 0">
      登陆龙币商城进入【我的】【龙币管理】界面，可以查看龙币获取情况
    </p>
    <i
      class="iconfont icon-guanbi guanbi"
      @click="clickGuanbi"
      :style="totalScore > 0 ? 'margin-top: 30px;' : ''"
    ></i>
  </div>
</template>

<script>
import { checkMember, getAwardsAll, myUnreceiveAaward } from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "receive",
  data() {
    return {
      totalScore: "0",
      show: false,
      show1: false,
      receivedScore: "",
    };
  },
  mounted() {
    let that = this;
    that.$getRequest(myUnreceiveAaward).then((res) => {
      if (res.data.code === 0) {
        let { totalScore, receivedScore } = res.data;
        that.totalScore = totalScore;
        that.receivedScore = receivedScore;
        if (that.receivedScore < 6000) {
          that.show = true;
        } else if (that.receivedScore >= 6000) {
          that.show1 = true;
        }
      }
    });
  },
  methods: {
    clickReceive() {
      let that = this;
      that.$getRequest(checkMember).then((res) => {
        if (res.data.code === 0) {
          if (that.totalScore > 0) {
            that.$getRequest(getAwardsAll).then((res) => {
              if (res.data.code === 0) {
                that.$router.push({
                  path: "/success",
                  query: { url: res.data.url },
                });
              } else {
              }
            });
          } else {
          }
        } else if (res.data.code === 105) {
          that.$router.push({
            path: "/receiveerr",
            query: { url: res.data.url },
          });
        } else {
        }
      });
    },
    clickGuanbi() {
      wx.closeWindow();
    },
  },
};
</script>

<style>
</style>