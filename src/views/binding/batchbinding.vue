<template>
  <div class="batchbinding">
    <div class="roll">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <span class="barnName">{{ item.brandName }}</span>
          <div id="brandCode" class="flex-demo" v-show="show">
            <div>
              <span id="menuItem">{{ item.brandCode }}</span>
            </div>
          </div>
          <span class="number">x{{ item.num }}</span>
          <van-field
            class="price"
            v-model="item.price"
            type="number"
            placeholder="0"
            @input="changePrice($event)"
          />
        </li>
      </ul>
    </div>
    <div class="footer-but">
      <div class="but">
        <button
          class="iconfont icon-jia3 add-icon"
          @click="clickContinueBinding"
        ></button>
        <button class="ding-but" @click="clickOkBinding">可支付绑定</button>
        <button class="ding-but" @click="clickSmokeBindNoneedpay">
          不可支付绑定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  smokeInfo,
  smokeBind,
  smokeBindNoneedpay,
  getJssdkConfig,
} from "../../api/api";
import wx from "weixin-js-sdk";
var map = new Map();
export default {
  name: "batchbinding",
  data() {
    return {
      show: false,
      num: 0,
      price: 0,
      list: [],
      slist: [],
    };
  },
  mounted() {
    let that = this;
    that.result = that.$route.query.result;
    that.getSmokeInfo();
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
    getSmokeInfo() {
      let that = this;
      that.$postRequest(smokeInfo, { codeStr: that.result }).then((res) => {
        if (res.data.code === 0) {
          if (this.list.length == 0) {
            const element = res.data.data.smokeInfo;
            element.num = 1;
            this.list.push(element);
            this.slist.push(res.data.data.smokeInfo);
          } else {
            const length = this.slist.length;
            let hasSmoke = false;
            for (let index = 0; index < length; index++) {
              const element = this.slist[index];
              if (element.codeId == res.data.data.smokeInfo.codeId) {
                hasSmoke = true;
                break;
              }
            }
            if (hasSmoke) {
              return;
            }
            this.slist.push(res.data.data.smokeInfo);
            for (let index = 0; index < length; index++) {
              const element = this.list[index];
              if (element.brandCode == res.data.data.smokeInfo.brandCode) {
                element.num = element.num + 1;
                this.list.splice(index, element);
                break;
              }
              if (index == length - 1) {
                const element1 = res.data.data.smokeInfo;
                element1.num = 1;
                this.list.push(element1);
              }
            }
          }
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
    changePrice(event) {
      let indexBrandCode = document.getElementById("menuItem").innerHTML;
      const length = this.slist.length;
      for (let index = 0; index < length; index++) {
        const element = this.slist[index];
        if (element.brandCode == indexBrandCode) {
          element.price = event;
          this.slist.splice(index, element);
        }
      }
    },
    clickContinueBinding() {
      let that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          that.result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          that.getSmokeInfo();
        },
      });
    },
    clickOkBinding() {
      let that = this;
      that.$postRequest(smokeBind, { list: that.list }).then((res) => {
        if (res.data.code === 0) {
          that.$toast.success("绑定成功");
          that.$router.push({ path: "/bindingsuccess" });
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
    clickSmokeBindNoneedpay() {
      let that = this;
      that.$postRequest(smokeBindNoneedpay, { list: that.list }).then((res) => {
        if (res.data.code === 0) {
          that.$toast.success("绑定成功");
          that.$router.push({ path: "/bindingsuccess" });
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>