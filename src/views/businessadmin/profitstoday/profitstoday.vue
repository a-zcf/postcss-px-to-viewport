<template>
  <div class="sellingtoday">
    <router-link to="/businessadmin" class="link">
      <i class="iconfont icon-fanhui fanhui"></i>
      <span>返回</span>
    </router-link>
    <div class="list_title">
      <span class="time">当前时间：{{ currentTime }}</span>
      <span class="total">总额：{{ totalAmount }}</span>
    </div>
    <div class="sell_list" v-if="list.length != 0">
      <ul class="sell">
        <li v-for="(item, index) in list" :key="index">
          <span class="brandName">{{ item.brandName }}</span>
          <span class="list_width">{{ item.time }}</span>
          <span class="total_color">{{ item.amount }}</span>
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
import { profitsRecordDay } from "../../../api/api";
import getDate from "../../../utils/getDate";
export default {
  name: "profitstoday",
  data() {
    return {
      currentTime: "",
      totalAmount: 0,
      list: [],
    };
  },
  mounted() {
    let that = this;
    that.currentTime = getDate.getDaySartEnd().currentTime;
    that
      .$postRequest(profitsRecordDay, {
        startDate: getDate.getDaySartEnd().sart,
        endDate: getDate.getDaySartEnd().end,
      })
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