<template>
  <div class="rankinglist">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <header-back></header-back>
      <img src="../../assets/img/rankinglist.jpg" class="rankinglist-topImg" />
      <div class="list" v-if="list.length != 0">
        <ul>
          <li v-for="(item, index) in list.slice(0, 100)" :key="index">
            <img
              :src="
                item.rankNum === 1
                  ? No1
                  : '' || item.rankNum === 2
                  ? No2
                  : '' || item.rankNum === 3
                  ? No3
                  : ''
              "
              class="No"
              v-if="item.rankNum <= 3"
            />
            <span v-if="item.rankNum > 3" class="text"
              >NO.{{ item.rankNum }}</span
            >
            <img :src="item.headimgurl" class="head-portrait" />
            <div class="name-con">
              <p class="name">{{ item.nickname }}</p>
              <p class="longbi">
                积分：<span>{{ item.score }}枚</span>
              </p>
              <p>邀请：{{ item.inviatNum }}人</p>
            </div>
          </li>
        </ul>
      </div>
      <i class="iconfont icon-zanwushuju" v-if="list.length == 0"></i>
    </mescroll-vue>
  </div>
</template>

<script>
import { rankList } from "../../api/api";
export default {
  name: "rankinglist",
  data() {
    return {
      No1: require("../../assets/img/no1.jpg"),
      No2: require("../../assets/img/no2.jpg"),
      No3: require("../../assets/img/no3.jpg"),
      activityNo: "",
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
    that.activityNo = localStorage.getItem("activityNo");
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.$getRequest(rankList, {
        activityNo: this.activityNo,
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