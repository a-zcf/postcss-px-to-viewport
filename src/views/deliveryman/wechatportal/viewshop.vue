<template>
  <div class="viewshop">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="shop-info">
            <i class="iconfont icon-chakandianpu chakandianpu"></i>
            <div class="cont-text">
              <span class="name-title">{{ item.shopName }}</span>
              <span class="phone"
                >电话：{{ item.contactPhone
                }}<a :href="'tel:' + item.contactPhone"
                  ><i class="iconfont icon-bodadianhua"></i></a
              ></span>
            </div>
            <span class="query-commodity" @click="clickQuery(item.id)"
              >查看商品</span
            >
          </div>
          <p class="address">
            <span>地址：{{ item.address }}</span>
            <i
              class="iconfont icon-icon-system-fi-navigation"
              @click="
                clickNavigation(item.lnt, item.lat, item.shopName, item.address)
              "
            ></i>
          </p>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import { shopList } from "../../../api/api";
export default {
  name: "viewshop",
  data() {
    return {
      list: [],
      mescroll: null,
      mescrollDown: {
        use: false,
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1,
        page: {
          num: 0,
          size: 10,
          time: null,
        },
        empty: {
          warpId: "mescroll",
          tip: "暂无相关数据",
        },
        htmlNodata: '<p class="upwarp-nodata">-- 已加载完 --</p>',
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
      },
    };
  },
  mounted() {},
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let params = {
        pageNo: page.num,
        pageSize: page.size,
      };
      this.$getRequest(shopList, params).then((res) => {
        if (res.data.code === 0) {
          let arr = res.data.data;
          if (page.num === 1) this.list = [];
          this.list = this.list.concat(arr);
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        } else {
          this.mescroll.endErr()
        }
      });
    },
    clickQuery(shopId) {
      this.$router.push({
        path: "/wechcommodityadmin",
        query: { shopId: shopId },
      });
    },
    clickNavigation(lat, lnt, shopName, address) {
      window.location.href =
        "http://api.map.baidu.com/marker?location=" +
        lnt +
        "," +
        lat +
        "&title=" +
        shopName +
        "&content=" +
        address +
        "&output=html";
    },
  },
};
</script>

<style>
</style>