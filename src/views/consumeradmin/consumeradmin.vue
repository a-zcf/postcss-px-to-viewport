<template>
  <div class="consumeradmin">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <ul class="list" v-if="list.length != 0">
        <li class="list-li" v-for="(item, index) in list" :key="index">
          <img :src="item.headImg" class="head-portrait" />
          <span class="name">{{ item.nick }}</span>
          <div class="right">
            <span class="goumai-color">{{ item.brandName }}</span>
            <span class="zhifu-time">支付时间：{{ item.time }}</span>
          </div>
        </li>
      </ul>
    </mescroll-vue>
    <div class="list-null" v-if="list.length == 0">
      <div class="conter">
        <i class="iconfont icon-zanwushuju"></i>
        <p>空空如也~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userOrderList } from "../../api/api";
export default {
  name: "consumeradmin",
  data() {
    return {
      list: [],
      topImgUrl: require("../../assets/img/head-1.png"),
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
  mounted() {
    this.mescroll.resetUpScroll();
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      this.$postRequest(userOrderList, {
        pageNo: page.num,
        pageSize: page.size,
      }).then((res) => {
        if (res.data.code === "0") {
          let arr = res.data.data.list;
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