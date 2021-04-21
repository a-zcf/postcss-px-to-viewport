<template>
  <div class="businessadmin">
    <router-link to="/" class="link">
      <i class="iconfont icon-fanhui fanhui"></i>
      <span>返回</span>
    </router-link>
    <div class="busadmin-icon">
      <ul>
        <li>
          <router-link to="/sellingtoday" class="link-router link-router01">
            <i class="iconfont icon-wodeshoumai"></i>
            <span class="">本日售卖</span>
          </router-link>
        </li>

        <li>
          <router-link to="/profitstoday" class="link-router link-router02">
            <i class="iconfont icon-meirilirun"></i>
            <span class="">本日利润</span>
          </router-link>
        </li>

        <li>
          <router-link to="/salestoday" class="link-router link-router03">
            <i class="iconfont icon-dangyueshoumaijixiaoliang"></i>
            <span class="">本月售卖</span>
          </router-link>
        </li>

        <li>
          <router-link to="/profitmonth" class="link-router link-router04">
            <i class="iconfont icon-lirunbiao"></i>
            <span class="">本月利润</span>
          </router-link>
        </li>

        <li>
          <router-link to="/stock" class="link-router link-router05">
            <i class="iconfont icon-kucunguanli"></i>
            <span class="">库存管理</span>
          </router-link>
        </li>
        <li @click="jumpToMicroStore">
          <i class="iconfont icon-weidian-xuanzhong link-router06"></i>
          <span class="link-router06">店铺微店</span>
        </li>
        <!-- <li @click="clickAdminLoginUrl">
          <i class="iconfont icon-dengluguanli link-router07"></i>
          <span class="link-router07">登录管理</span>
        </li>
        <li @click="clickShopLoginUrl">
          <i class="iconfont icon-gexinghuashezhi link-router08"></i>
          <span class="link-router08">个性化设置</span>
        </li> -->
      </ul>
      <!-- <ul>
        <router-link to="/sellingtoday" class="router">
          <li>
            <div class="icon icon-blue">
              <i class="iconfont icon-wodeshoumai icon-color"></i>
            </div>
            <span class="icon-text">本日售卖</span>
          </li>
        </router-link>
        <router-link to="/profitstoday" class="router">
          <li>
            <div class="icon icon-pink">
              <i class="iconfont icon-meirilirun icon-color"></i>
            </div>
            <span class="icon-text">本日利润</span>
          </li>
        </router-link>
        <router-link to="/salestoday" class="router">
          <li>
            <div class="icon sea-blue">
              <i class="iconfont icon-dangyueshoumaijixiaoliang icon-color"></i>
            </div>
            <span class="icon-text">本月售卖</span>
          </li>
        </router-link>
        <router-link to="/profitmonth" class="router">
          <li>
            <div class="icon icon-pink">
              <i class="iconfont icon-lirunbiao icon-color icon-size"></i>
            </div>
            <span class="icon-text">本月利润</span>
          </li>
        </router-link>
        <router-link to="/stock" class="router">
          <li>
            <div class="icon sea-blue">
              <i class="iconfont icon-kucunguanli icon-color icon-size"></i>
            </div>
            <span class="icon-text">库存管理</span>
          </li>
        </router-link>
        <li class="router" @click="jumpToMicroStore">
          <div class="icon icon-blue">
            <i class="iconfont icon-weidian-xuanzhong icon-color"></i>
          </div>
          <span class="icon-text">店铺微店</span>
        </li>
        <li class="router" @click="clickAdminLoginUrl">
          <div class="icon icon-blue">
            <i class="iconfont icon-weidian-xuanzhong icon-color"></i>
          </div>
          <span class="icon-text">登录管理</span>
        </li>
        <li class="router" @click="clickShopLoginUrl">
          <div class="icon icon-blue">
            <i class="iconfont icon-weidian-xuanzhong icon-color"></i>
          </div>
          <span class="icon-text">个性化设置</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { getSupplierId, getThirdIndexUrl } from "../../api/api";
export default {
  name: "businessadmin",
  data() {
    return {
      suplierId: 0,
      keeperOpenid: "",
      // adminLoginUrl: "",
      // shopLoginUrl: "",
    };
  },
  mounted() {
    let that = this;
    that.$postRequest(getSupplierId).then((res) => {
      if (res.data.code == 0) {
        that.suplierId = res.data.data.suplierId;
        that.keeperOpenid = res.data.data.keeperOpenid;
      }
    });
    // that.$getRequest(getThirdIndexUrl).then((res) => {
    //   if (res.data.code == 0) {
    //     let { adminLoginUrl, shopLoginUrl } = res.data.data;
    //     that.adminLoginUrl = adminLoginUrl;
    //     that.shopLoginUrl = shopLoginUrl;
    //   }
    // });
  },
  methods: {
    jumpToMicroStore() {
      let that = this;
      let url =
        "http://zl.haiyunzy.com/small/frontpage/h5login/loginYaobao?tempUrl=commodityadmin&redirect_url=http://zl.haiyunzy.com/smalui/weidian/index.html&suplierId=" +
        that.suplierId +
        "&keeperOpenid=" +
        that.keeperOpenid;
      window.location = url;
    },
    // clickAdminLoginUrl() {
    //   window.location = this.adminLoginUrl;
    // },
    // clickShopLoginUrl() {
    //   window.location = this.shopLoginUrl;
    // },
  },
};
</script>

<style>
</style>