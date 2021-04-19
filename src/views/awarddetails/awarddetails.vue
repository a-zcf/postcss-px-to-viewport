<template>
  <div class="awarddetails">
    <header-back></header-back>
    <div>
      <p class="title">
        <span>时间</span>
        <span>被推荐人数</span>
        <span>推客奖励</span>
      </p>
      <p class="tishi">只显示近30天数据</p>
    </div>
    <div class="roll" v-if="list.length != 0">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <span>{{ item.date }}</span>
          <span class="number">{{ item.proNum }}</span>
          <span class="longbi">{{ item.score }}积分</span>
        </li>
      </ul>
    </div>
    <i class="iconfont icon-zanwushuju" v-if="list.length == 0"></i>
  </div>
</template>

<script>
import { promDayAwardRecordList } from "../../api/api";
export default {
  name: "awarddetails",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    let that = this;
    let activityNo = localStorage.getItem("activityNo");
    that
      .$getRequest(promDayAwardRecordList, { activityNo: activityNo })
      .then((res) => {
        if (res.data.code === 0) {
          that.list = res.data.list;
        }
      });
  },
  methods: {},
};
</script>

<style>
</style>