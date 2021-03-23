<template>
  <!-- 本月利润 -->
  <div class="salestoday">
    <div class="list_title">
      <select class="tixian_select" v-model="month" @change="changeMonth">
        <option v-for="(item, index) in monthlyArr" :key="index">
          {{ item }}
        </option>
      </select>
      <span>总额：{{ totalAmount }}</span>
    </div>
    <div class="sell">
      <ul class="sell_list" v-if="list.length != 0">
        <li v-for="(item, index) in list" :key="index">
          <span class="date">{{ item.time }}</span>
          <span class="amount">{{ item.amount }}</span>
          <router-link :to="{ path: '/pdetailed', query: { time: item.time } }"
            ><span class="detailed">明细</span></router-link
          >
        </li>
      </ul>
    </div>
    <div class="list-null" v-if="list.length == 0">
      <div class="conter">
        <i class="iconfont icon-zanwushuju"></i>
        <p>空空如也~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { profitsRecordMonth } from "../../../api/api";
import getDate from "../../../utils/getDate";
export default {
  name: "profitmonth",
  data() {
    return {
      month: "",
      monthlyArr: [],
      totalAmount: 0.0,
      list: [],
    };
  },
  mounted() {
    let that = this;
    that.monthlyArr = getDate.getMonthTime().monthly;
    that.month = getDate.getMonthTime().month;
    that.changeMonth();
  },
  methods: {
    changeMonth() {
      let that = this;
      that
        .$postRequest(profitsRecordMonth, { monthDate: that.month })
        .then((res) => {
          if (res.data.code === 0) {
            that.totalAmount = res.data.data.profitsRecord.totalAmount;
            that.list = res.data.data.profitsRecord.list;
          }
        });
    },
  },
};
</script>

<style>
</style>