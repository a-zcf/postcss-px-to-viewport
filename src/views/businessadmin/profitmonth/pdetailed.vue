<template>
  <div class="sellingtoday">
    <router-link to="/profitmonth" class="link">
      <i class="iconfont icon-fanhui fanhui"></i>
      <span>返回</span>
    </router-link>
    <div class="list_title">
      <span class="time">当前时间：{{ currentTime }}</span>
      <span class="total">总额：{{ totalAmount }}</span>
    </div>
    <div class="sell_list">
      <ul class="sell">
        <li v-for="(item, index) in list" :key="index">
          <span class="brandName">{{ item.brandName }}</span>
          <span class="list_width">{{ item.time }}</span>
          <span class="total_color">{{ item.amount }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { saleRecord } from "../../../api/api";
import getDate from "../../../utils/getDate";
export default {
  name: "pdetailed",
  data() {
    return {
      totalAmount: 0,
      list: [],
      currentTime: "",
    };
  },
  mounted() {
    let that = this;
    that.currentTime = getDate.getDaySartEnd().currentTime;
    function formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    }
    let getSart = new Date(
      new Date(new Date(that.$route.query.time).toLocaleDateString()).getTime()
    );
    let getEnd = new Date(
      new Date(
        new Date(that.$route.query.time).toLocaleDateString()
      ).getTime() +
        24 * 60 * 60 * 1000 -
        1
    );
    // 开始时间
    let sart =
      getSart.getFullYear() +
      "-" +
      formatTen(getSart.getMonth() + 1) +
      "-" +
      formatTen(getSart.getDate()) +
      " " +
      formatTen(getSart.getHours()) +
      ":" +
      formatTen(getSart.getMinutes()) +
      ":" +
      formatTen(getSart.getSeconds());
    //结束时间
    let end =
      getEnd.getFullYear() +
      "-" +
      formatTen(getEnd.getMonth() + 1) +
      "-" +
      formatTen(getEnd.getDate()) +
      " " +
      formatTen(getEnd.getHours()) +
      ":" +
      formatTen(getEnd.getMinutes()) +
      ":" +
      formatTen(getEnd.getSeconds());
    that
      .$postRequest(saleRecord, { startDate: sart, endDate: end })
      .then((res) => {
        if (res.data.code === 0) {
          that.totalAmount = res.data.data.saleRecord.totalAmount;
          that.list = res.data.data.saleRecord.list;
        }
      });
  },
  methods: {},
};
</script>

<style>
</style>