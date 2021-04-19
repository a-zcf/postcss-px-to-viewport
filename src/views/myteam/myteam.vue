<template>
  <div class="my-team">
    <header-back></header-back>
    <div class="team-top">
      <img
        :src="headimgurl == '' || headimgurl == null ? headless : headimgurl"
      />
      <div class="text" v-if="user != '' || user != null">
        <p class="name">{{ nickname }}</p>
        <p>ID：{{ paramCode }}</p>
      </div>
      <p v-else style="color: #fff">尚未获取资格</p>
    </div>
    <van-tabs v-model="active" @click="onClick" class="tab">
      <van-tab title="全部客户">
        <ul>
          <li @click="gradeCustomers(0)">
            <span class="left">全部客户</span>
            <span class="middle">{{ allTotal }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(1)">
            <span class="left">一级客户</span>
            <span class="middle">{{ grade1Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(2)">
            <span class="left">二级客户</span>
            <span class="middle">{{ grade2Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(3)">
            <span class="left">三级客户</span>
            <span class="middle">{{ grade3Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
        </ul>
      </van-tab>
      <van-tab title="发展客户"
        ><ul>
          <li @click="gradeCustomers(0)">
            <span class="left">全部客户</span>
            <span class="middle">{{ allTotal }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(1)">
            <span class="left">一级客户</span>
            <span class="middle">{{ grade1Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(2)">
            <span class="left">二级客户</span>
            <span class="middle">{{ grade2Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(3)">
            <span class="left">三级客户</span>
            <span class="middle">{{ grade3Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li></ul
      ></van-tab>
      <van-tab title="正式客户"
        ><ul>
          <li @click="gradeCustomers(0)">
            <span class="left">全部客户</span>
            <span class="middle">{{ allTotal }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(1)">
            <span class="left">一级客户</span>
            <span class="middle">{{ grade1Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(2)">
            <span class="left">二级客户</span>
            <span class="middle">{{ grade2Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li>
          <li @click="gradeCustomers(3)">
            <span class="left">三级客户</span>
            <span class="middle">{{ grade3Total }}</span>
            <i class="iconfont icon-gengduo right"></i>
          </li></ul
      ></van-tab>
    </van-tabs>
    <!-- <div class="head-img">
      <img src="../../assets/img/headImg.jpg" />
    </div>
    <h3 class="title">~~ 目前团队人数{{ totalCount }}人 ~~</h3>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      id="mescroll"
    >
      <ul class="list">
        <li v-for="(item, index) in list" :key="index">
          <img :src="item.headimgurl" class="list-img" />
          <div class="name-time">
            <span class="name">{{ item.nickname }}</span>
            <span class="time">邀请时间：{{ item.createTime }}</span>
          </div>
        </li>
      </ul>
    </mescroll-vue> -->
  </div>
</template>

<script>
import { myTeamTotalList } from "../../api/api";
export default {
  name: "myteam",
  data() {
    return {
      headless: require("../../assets/img/Headless.png"),
      active: 0,
      allTotal: 0,
      grade1Total: 0,
      grade2Total: 0,
      grade3Total: 0,
      paramCode: "",
      nickname: "",
      headimgurl: "",
      user: "",
    };
  },
  mounted() {
    let that = this;
    that.getMyTeamTotalList();
  },
  methods: {
    onClick(name) {
      this.active = name;
      this.getMyTeamTotalList();
    },
    getMyTeamTotalList() {
      let that = this;
      let activityNo = localStorage.getItem("activityNo");
      that
        .$getRequest(myTeamTotalList, {
          activityNo: activityNo,
          hasscan: that.active,
        })
        .then((res) => {
          if (res.data.code === 0) {
            let { allTotal, grade1Total, grade2Total, grade3Total } = res.data;
            that.allTotal = allTotal;
            that.grade1Total = grade1Total;
            that.grade2Total = grade2Total;
            that.grade3Total = grade3Total;
            that.user = res.data.user;
            let { paramCode, nickname, headimgurl } = res.data.user;
            that.paramCode = paramCode;
            that.nickname = nickname;
            that.headimgurl = headimgurl;
          }
        });
    },
    gradeCustomers(stat) {
      this.$router.push({
        path: "/gradecustomers",
        query: { hasscan: this.active, grade: stat },
      });
    },
  },
};
</script>

<style>
</style>