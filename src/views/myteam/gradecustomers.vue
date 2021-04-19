<template>
  <div class="gradecustomers">
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
          <img :src="item.headimgurl" />
          <div class="right">
            <p class="title">
              <span class="name">{{ item.nickname }}</span
              ><span class="saoma">已扫码</span>
            </p>
            <p>积分：{{ item.score }}</p>
            <p>
              邀请：{{
                item.inviatNum == null || item.inviatNum == ""
                  ? 0
                  : item.inviatNum
              }}人
            </p>
          </div>
        </li>
      </ul>
      <i class="iconfont icon-zanwushuju" v-if="list.length == 0"></i>
    </mescroll-vue>
  </div>
</template>

<script>
import { myTeamList } from "../../api/api";
export default {
  name: "gradecustomers",
  data() {
    return {
      grade: 0,
      hasscan: 0,
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
    that.grade = this.$route.query.grade;
    that.hasscan = this.$route.query.hasscan;
    if (that.grade == 0) {
      document.title = "全部客户";
    } else if (that.grade == 1) {
      document.title = "一级客户";
    } else if (that.grade == 2) {
      document.title = "二级级客户";
    } else if (that.grade == 3) {
      document.title = "三级客户";
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let activityNo = localStorage.getItem("activityNo");
      this.$getRequest(myTeamList, {
        activityNo: activityNo,
        pageNum: page.num,
        pageSize: page.size,
        hasscan: this.hasscan,
        grade: this.grade,
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