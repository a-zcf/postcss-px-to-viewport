<template>
  <div class="packagepayment" :style="backgroundDiv">
    <div class="slide">
      <!-- 包 -->
      <div v-if="strip == 1" class="vif-package">
        <div class="package">
          <!-- <div class="yinZhang" :style="smokeImgUrl==''?'display: none;':'display: block;'">正品</div> -->
          <div
            class="iconfont icon-yizhifu icon-color"
            :style="smokeImgUrl == '' ? 'display: none;' : 'display: block;'"
          ></div>
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

        <div class="weidian">
          <div class="weidian-title">
            <i class="iconfont icon-weidian-xuanzhong weidian-icon"></i>
            <span class="weidian-text">店铺微店</span>
            <p>
              <span @click="clickMore">点击更多</span>
              <i class="iconfont icon-gengduo"></i>
            </p>
          </div>
          <div class="commodity-list">
            <ul>
              <li v-for="(item, index) in goods" :key="index">
                <img :src="item.img" />
                <p class="title">
                  {{ item.name }}
                </p>
                <p class="price">￥{{ item.price }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 条 -->
      <div v-else class="velse-stripbox">
        <div class="strip-box">
          <div class="tiao-img">
            <div
              class="iconfont icon-yizhifu icon-color"
              :style="smokeImgUrl == '' ? 'display: none;' : 'display: block;'"
            ></div>
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

        <div class="weidian">
          <div class="weidian-title">
            <i class="iconfont icon-shop weidian-icon"></i>
            <span class="weidian-text">店铺微店</span>
            <p>
              <span @click="clickMore">点击更多</span>
              <i class="iconfont icon-gengduo"></i>
            </p>
          </div>
          <div class="commodity-list">
            <ul>
              <li v-for="(item, index) in goods" :key="index">
                <img :src="item.img" />
                <p class="title">{{ item.name }}</p>
                <p class="price">￥{{ item.price }}</p>
              </li>
              <!-- <li v-for="(item, index) in goods" :key="index">
                <img class="comm-img" :src="item.img" />
                <div class="comm-con">
                  <span class="title">{{ item.name }}</span>
                  <span class="price">￥{{ item.price }}</span>
                </div>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="left">
        <span class="left-text">支付<b>￥</b></span>
        <span class="right-text">{{ amount }}</span>
      </div>
      <div class="right payButtombgk">{{ payButtombgk }}</div>
    </div>
  </div>
</template>

<script>
import { WxPay } from "../../api/api";
export default {
  name: "paid",
  data() {
    return {
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
      amount: "0", // 金额
      goods: [], // 商品列表
      microShopUrl: "", // 微店链接
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/img/paymentBgk.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      boss: "",
      payButtombgk: "",
    };
  },
  mounted() {
    this.codeStr = this.$route.query.codeStr;
    this.strip = this.$route.query.strip;
    this.getWxPay();
  },
  methods: {
    getWxPay() {
      if (this.codeStr == "") {
        // this.$vux.toast.show({
        //   text: "无效的二维码，请重新扫码！",
        //   type: "cancel"
        // });
        this.$toast.fail("无效的二维码，请重新扫码！");
        return;
      }

      this.$postRequest(WxPay, { codeStr: this.codeStr }).then((res) => {
        if (res.data.code === 1005) {
          this.payButtombgk = "已支付";
        } else if (res.data.code === 1006) {
          this.payButtombgk = "免支付";
        }
        if (res.data.code === 1005 || res.data.code === 1006) {
          let {
            name,
            licence,
            phone,
            codeImg,
            boss,
          } = res.data.data.supplierData;
          this.supplierName = name;
          this.supplierlicence = licence;
          this.phone = phone;
          this.codeImg = codeImg;
          this.boss = boss;

          let smokeData = res.data.data.smokeData;
          this.smokeName = smokeData.name;
          this.smokeImgUrl = smokeData.imgUrl;
          this.smokeBrandCode = smokeData.smokeBrandCode;

          let { goods, microShopUrl } = res.data.data.microShop;
          this.goods = goods;
          this.microShopUrl = microShopUrl;
          this.amount = res.data.data.payConfig.amount;
          this.announcementList = res.data.data.announcementList;
        } else {
          //  this.$vux.alert.show({
          //     title: '错误提示',
          //     content: res.data.message,
          //     onHide () {
          //       wx.closeWindow()
          //     }
          //   })
          this.$toast.fail(res.data.message);
        }
      });
    },
    clickMore() {
      let that = this;
      window.location = that.microShopUrl;
    },
  },
};
</script>

<style>
</style>