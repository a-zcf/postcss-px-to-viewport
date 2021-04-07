<template>
  <div class="detailed">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <div class="title">
        <span>商品名称</span>
        <span>兑换数量</span>
      </div>
      <p class="hengxian"></p>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <span class="name">{{item.title}}</span>
          <span class="number">{{item.sumTotal}}</span>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import { orderGoodsList } from "../../api/api";
export default {
  name: "detailedstatistics",
  data() {
    return {
      active: "",
      startTime: "",
      endTime: "",
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
  mounted() {
    let that = this;
    that.active = that.$route.query.active;
    that.startTime = that.$route.query.startTime;
    that.endTime = that.$route.query.endTime;
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let params = {
        pageNo: page.num,
        pageSize: page.size,
        beforeDay: this.active,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      this.$getRequest(orderGoodsList, params).then((res) => {
        if (res.data.code === 0) {
          let arr = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
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
  },
};
</script>

<style>
</style>