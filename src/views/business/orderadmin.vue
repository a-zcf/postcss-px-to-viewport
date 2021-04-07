<template>
  <div class="orderadmin">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <van-tabs v-model="active" @change="onChange">
        <van-tab title="近七日" name="7" class="list">
          <p class="total">
            <span>订单数：{{ totalCount }}笔</span>
            <span class="mingxi"
              ><router-link
                :to="{ path: '/detailedstatistics', query: { active: active } }"
                class="router"
                >明细统计</router-link
              ></span
            >
          </p>
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
                  >{{ it.score }}龙币</span
                >
              </p>
              <p class="border">
                <span class="left">实扣龙币</span>
                <span class="right color2"
                  ><i class="iconfont icon-jinbi longbi-icon"></i
                  >{{ item.totalScore }}龙币</span
                >
              </p>
            </li>
          </ul>
        </van-tab>
        <van-tab title="近一个月" name="30" class="list">
          <p class="total">
            <span>订单数：{{ totalCount }}笔</span>
            <span class="mingxi"
              ><router-link
                :to="{ path: '/detailedstatistics', query: { active: active } }"
                class="router"
                >明细统计</router-link
              ></span
            >
          </p>
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
                  >{{ it.score }}龙币</span
                >
              </p>
              <p class="border">
                <span class="left">实扣龙币</span>
                <span class="right color2"
                  ><i class="iconfont icon-jinbi longbi-icon"></i
                  >{{ item.totalScore }}龙币</span
                >
              </p>
            </li>
          </ul>
        </van-tab>
        <van-tab title="自选时段" name="0" class="list">
          <div class="date-query">
            <div class="date">
              <span class="time" @click="show = true">{{ startTime }}</span>
              <span class="zhi">至</span>
              <span class="time" @click="show1 = true">{{ endTime }}</span>
            </div>
            <button class="query-but" @click="clickQuery">确认查询</button>
          </div>
          <van-calendar
            v-model="show"
            :min-date="minDate"
            :max-date="maxDate"
            color="#1989fa"
            @confirm="onConfirmStar"
          />
          <van-calendar
            v-model="show1"
            :min-date="minDate"
            :max-date="maxDate"
            color="#1989fa"
            @confirm="onConfirmEnd"
          />
          <p class="total">
            <span>订单数：{{list.length == 0 ? 0 : totalCount }}笔</span>
            <span class="mingxi"
              ><router-link
                :to="{ path: '/detailedstatistics', query: { active:active,startTime:startTime,endTime:endTime } }"
                class="router"
                >明细统计</router-link
              ></span
            >
          </p>
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
                  >{{ it.score }}龙币</span
                >
              </p>
              <p class="border">
                <span class="left">实扣龙币</span>
                <span class="right color2"
                  ><i class="iconfont icon-jinbi longbi-icon"></i
                  >{{ item.totalScore }}龙币</span
                >
              </p>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </mescroll-vue>
  </div>
</template>

<script>
import { orderList } from "../../api/api";
export default {
  name: "orderadmin",
  data() {
    return {
      active: 7,
      show: false,
      show1: false,
      startTime: "",
      endTime: "",
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 60, 31),
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
        htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
      },
      totalCount: 0,
    };
  },
  mounted() {
  },
  methods: {
    clickQuery() {
      if(this.startTime == ''){
        this.$toast('请选择需查询的时间范围！');
        return
      }
      if(this.endTime == ''){
        this.$toast('请选择需查询的时间范围！');
        return
      }
      this.mescroll.resetUpScroll();
    },
    onChange(name) {
      this.list = [];
      this.mescroll.resetUpScroll();
      if (name != 0) {
        (this.startTime = ""), (this.endTime = "");
      }
    },
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
      this.$getRequest(orderList, params).then((res) => {
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

    clickTime() {
      this.show = true;
    },
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 1 && day <= 9) {
        day = "0" + day;
      }
      return `${year}-${month}-${day}`;
    },
    onConfirmStar(date) {
      this.show = false;
      this.startTime = this.formatDate(date);
    },
    onConfirmEnd(date) {
      this.show1 = false;
      this.endTime = this.formatDate(date);
    },
  },
};
</script>

<style>
</style>