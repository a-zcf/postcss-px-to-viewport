<template>
  <div class="deliveryrecord">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <div class="head-title">
        <span>店铺名称</span>
        <span>配送时间</span>
        <span>配送明细</span>
      </div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <span class="shop-name">{{item.shopName}}</span>
          <span class="time">{{item.createTime}}</span>
          <span class="listing-details" @click="queryDetails(item.id)">上架明细查看</span>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import { flow } from "../../../api/api";
export default {
  name: "deliveryrecord",
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
      this.$getRequest(flow, params).then((res) => {
        if (res.data.code === 0) {
          let arr = res.data.data.list;
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
    queryDetails(id){
      this.$router.push({
        path: "/listingdetails",
        query: { flowId: id },
      });
    }
  },
};
</script>

<style>
</style>