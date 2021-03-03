<template>
  <div class="myorder">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <p>
            <span class="left">{{ item.createTime }}</span>
            <span class="right color1">已兑换</span>
          </p>
          <p v-for="(it, index) in item.goodsList" :key="index">
            <span class="name">{{ it.title }}</span>
            <span class="number">×{{ it.num }}</span>
            <span class="longbi"
              ><i class="iconfont icon-jinbi longbi-icon"></i
              >{{ it.score * it.num }}龙币</span
            >
          </p>
          <p class="border">
            <span class="left">实扣龙币</span>
            <span class="right color2"
              ><i class="iconfont icon-jinbi longbi-icon"></i
              >{{ item.sum }}龙币</span
            >
          </p>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import { myOrderList } from "../../api/api";
export default {
  name: "myorder",
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
        lazyLoad: {
            use: true
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
      this.$getRequest(myOrderList, params).then((res) => {
        if (res.data.code === 0) {
          let arr = res.data.data.list;
          if (page.num === 1) this.list = [];
          this.list = this.list.concat(arr);
          this.list.forEach((item) => {
            let score = 0;
            for (let i = 0; i < item.goodsList.length; i++) {
              score = score + item.goodsList[i].score * item.goodsList[i].num;
            }
            item.sum = score;
          });
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        } else {
          this.mescroll.endErr()
        }
      });
    },
  },
  computed: {
    coinNum: function () {},
  },
};
</script>

<style>
</style>