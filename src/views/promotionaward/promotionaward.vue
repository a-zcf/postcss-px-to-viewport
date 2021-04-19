<template>
  <div class="promotionaward">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <header-back></header-back>
      <ul v-if="list.length != 0">
        <li v-for="(item, index) in list" :key="index">
          <div class="top-title">
            <img :src="item.headimgurl" />
            <span>{{ item.nickname }}</span>
          </div>
          <div class="bottom-content">
            <p>
              <span>{{ item.brandName }}</span>
              <span class="time">{{ item.scanTime }}</span>
            </p>
            <span class="longbi">+{{ item.score }}</span>
          </div>
        </li>
      </ul>
      <i class="iconfont icon-zanwushuju" v-if="list.length == 0"></i>
    </mescroll-vue>
  </div>
</template>

<script>
import { promAwardRecord } from "../../api/api";
export default {
  name: "promotionaward",
  data() {
    return {
      headless: require("../../assets/img/topImg.png"),
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
      let activityNo = localStorage.getItem("activityNo");
      this.$getRequest(promAwardRecord, {
        activityNo: activityNo,
        currPage: page.num,
        pageSize: page.size,
      }).then((res) => {
        if (res.data.code === 0) {
          let arr = res.data.page.list;
          if (page.num === 1) this.list = [];
          this.list = this.list.concat(arr);
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        } else {
          this.mescroll.endErr();
        }
      });
    },
  },
};
</script>

<style>
</style>