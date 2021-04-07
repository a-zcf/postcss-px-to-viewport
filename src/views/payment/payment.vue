<template>
  <div class="packagepayment" :style="backgroundDiv">
    <div class="slide">
      <!-- 包 -->
      <div v-if="strip == 1" class="vif-package">
        <div class="package">
          <div
            class="yinZhang"
            :style="smokeImgUrl == '' ? 'display: none;' : 'display: block;'"
          >
            正品
          </div>
          <img class="package-img" :src="smokeImgUrl" />
          <ul>
            <li>
              <span class="iconfont icon-tag icon-style"></span>
              <div class="package-con">
                <span class="weight">品名</span>
                <span class="font-size">{{ smokeName }}</span>
              </div>
            </li>
            <li>
              <span class="iconfont icon-news icon-style"></span>
              <div class="package-con">
                <span class="weight">卷烟身份证号</span>
                <span class="font-size02">{{ smokeBrandCode }}</span>
              </div>
            </li>
            <li>
              <span class="iconfont icon-shop icon-style"></span>
              <div class="package-con">
                <span class="weight">出售店铺</span>
                <span class="font-size">{{ supplierName }}</span>
              </div>
            </li>
            <li>
              <span class="iconfont icon-safe icon-style"></span>
              <div class="package-con">
                <span class="weight">专卖许可证号</span>
                <span class="font-size">{{ supplierlicence }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="boss-info">
          <div class="boss-infocon">
            <img class="boss-code" :src="codeImg" />
            <ul>
              <li class="botton">
                <span class="iconfont icon-addressbook icon-size"></span>
                <div class="boss-text">
                  <span class="weight">联系人</span>
                  <span class="size">{{ boss }}</span>
                </div>
              </li>
              <li>
                <span class="iconfont icon-phone icon-size"></span>
                <div class="boss-text">
                  <span class="weight">电话</span>
                  <span class="size">{{ phone }}</span>
                </div>
              </li>
            </ul>
          </div>
          <van-notice-bar
            color="#ea4f4f"
            background="#ead5c1"
            left-icon="volume-o"
            :scrollable="true"
          >
            <span v-for="(item, index) in announcementList" :key="index">{{
              item
            }}</span>
          </van-notice-bar>
        </div>
        <img class="img-advert" :src="img" @click="clickDjtz" />
      </div>
      <!-- 条 -->
      <div v-else class="velse-stripbox">
        <div class="strip-box">
          <div class="tiao-img">
            <div
              class="yinZhang"
              :style="smokeImgUrl == '' ? 'display: none;' : 'display: block;'"
            >
              正品
            </div>
            <img :src="smokeImgUrl" />
          </div>
          <div class="cigarettebag-info">
            <div class="info-left">
              <div class="left">
                <i class="iconfont icon-tag font-iconsize"></i>
                <div class="left-text">
                  <span class="weight">品名</span>
                  <span class="white-space">{{ smokeName }}</span>
                </div>
              </div>
              <div class="left">
                <i class="iconfont icon-news font-iconsize"></i>
                <div class="left-text">
                  <span class="weight">卷烟身份证号</span>
                  <span class="id">{{ smokeBrandCode }}</span>
                </div>
              </div>
            </div>
            <div class="info-right">
              <div class="right">
                <i class="iconfont icon-shop font-iconsize"></i>
                <div class="right-text">
                  <span class="weight">出售店铺</span>
                  <span class="white-space">{{ supplierName }}</span>
                </div>
              </div>
              <div class="right">
                <i class="iconfont icon-safe font-iconsize"></i>
                <div class="right-text">
                  <span class="weight">专卖许可证号</span>
                  <span>{{ supplierlicence }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="boss-info">
          <div class="boss-infocon">
            <img class="boss-code" :src="codeImg" />
            <ul>
              <li class="botton">
                <span class="iconfont icon-addressbook icon-size"></span>
                <div class="boss-text">
                  <span class="weight">联系人</span>
                  <span class="size">{{ boss }}</span>
                </div>
              </li>
              <li>
                <span class="iconfont icon-phone icon-size"></span>
                <div class="boss-text">
                  <span class="weight">电话</span>
                  <span class="size">{{ phone }}</span>
                </div>
              </li>
            </ul>
          </div>
          <van-notice-bar
            color="#ea4f4f"
            background="#ead5c1"
            left-icon="volume-o"
            :scrollable="true"
          >
            <span v-for="(item, index) in announcementList" :key="index">{{
              item
            }}</span>
          </van-notice-bar>
        </div>

        <img class="img-advert" :src="img" @click="clickDjtz" />
      </div>
    </div>

    <div class="footer">
      <div class="left">
        <span class="left-text">支付<b>￥</b></span>
        <span class="right-text">{{ amount }}</span>
      </div>
      <div class="right" @click="onBridgeReady">立即支付</div>
    </div>
  </div>
</template>

<script>
import { WxPay } from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "payment",
  data() {
    return {
      show: false,
      supplierName: "", // 烟酒店
      supplierlicence: "", // 许可证号
      smokeName: "", // 烟品名称
      smokeImgUrl: "", // 烟包图片
      smokeBrandCode: "", // 卷烟身份证
      phone: "", // 店铺手机
      codeImg: "", // 二维码图片地址
      codeStr: "",
      strip: "",
      announcementList: [], // 广告文字

      appId: "",
      timeStamp: "",
      nonceStr: "",
      package: "",
      signType: "",
      paySign: "",
      orderId: "",
      amount: 0,
      url: "", // 点击跳转的链接
      title: "", // 活动名称
      img: "", // 活动配图
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/img/paymentBgk.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      boss: "",
    };
  },
  mounted() {
    this.codeStr = this.getQueryVariable("c");
    this.strip = this.getQueryVariable("t");
    this.getWxPay();
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return "";
    },
    getWxPay() {
      if (this.codeStr == "") {
        this.$toast.fail("无效的二维码，请重新扫码！");
        return;
      }

      this.$postRequest(WxPay, { codeStr: this.codeStr }).then((res) => {
        if (res.data.code === 0) {
          let {
            name,
            boss,
            licence,
            phone,
            codeImg,
          } = res.data.data.supplierData;
          this.supplierName = name;
          this.boss = boss;
          this.supplierlicence = licence;
          this.phone = phone;
          this.codeImg = codeImg;

          let smokeData = res.data.data.smokeData;
          this.smokeName = smokeData.name;
          this.smokeImgUrl = smokeData.imgUrl;
          this.smokeBrandCode = smokeData.smokeBrandCode;

          let { url, title, img } = res.data.data.activity;
          this.url = url;
          this.title = title;
          this.img = img;

          let {
            appId,
            timeStamp,
            nonceStr,
            signType,
            paySign,
            packageValue,
            orderId,
            amount,
          } = res.data.data.payConfig;
          this.appId = appId;
          this.timeStamp = timeStamp;
          this.nonceStr = nonceStr;
          this.package = packageValue;
          this.signType = signType;
          this.paySign = paySign;
          this.orderId = orderId;
          this.amount = amount;
          this.announcementList = res.data.data.announcementList;
        } else if (res.data.code === 1005 || res.data.code === 1006) {
          this.$router.push({
            path: "/paid",
            query: { codeStr: this.codeStr, strip: this.strip },
          });
        } else if (res.data.code === 1002) {
          this.$router.push({
            path: "/detailimg",
            query: { detailImg: res.data.data.smokeData.detailImg },
          });
        } else {
          this.$toast.fail(res.data.message);
          //    this.$vux.alert.show({
          //     title: '错误提示',
          //     content: res.data.message,
          //     onHide () {
          //       wx.closeWindow()
          //     }
          //   })
        }
      });
    },
    onBridgeReady() {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: that.appId, // 公众号名称，由商户传入
          timeStamp: that.timeStamp, // 时间戳，
          nonceStr: that.nonceStr, // 随机串
          package: that.package,
          signType: that.signType, // 微信签名方式：
          paySign: that.paySign, // 微信签名
        },
        function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            let orderId = that.orderId;
            that.$router.push({
              path: "/paymentsuccess",
              query: { orderId: orderId },
            });
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            //   that.$vux.toast.show({text: '支付失败！', type: 'cancel'})
            that.$toast.fail("支付失败！");
          }
        }
      );
    },
    clickDjtz() {
      let that = this;
      window.location = that.url;
    },
    payDetails() {
      this.show = false;
    },
  },
};
</script>

<style>
</style>