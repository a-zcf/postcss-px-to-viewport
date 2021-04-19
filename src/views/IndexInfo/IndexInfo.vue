<template>
  <div class="pushmore-index">
    <div class="head-top">
      <div class="head">
        <div class="flex-title">
          <img
            :src="headimgurl != '' ? headimgurl : headless"
            class="headless"
          />
          <div class="head-text" v-if="user != '' || user != null">
            <p class="p1">
              <label>昵称：</label>
              <span>{{ nickname }}</span>
            </p>
            <p>
              <label>ID：</label>
              <span>{{ paramCode }}</span>
            </p>
            <p>
              <label>推荐人：</label>
              <span>{{ parentNick }}</span>
            </p>
          </div>
          <p v-else class="wei">尚未获取资格</p>
        </div>
      </div>
      <div class="jian-bi-pai">
        <router-link to="/promotionaward" class="jian-pai">
          <!-- <div class="jian-pai"> -->
          <span class="font-style1 bi">{{ totalRecomendScore }}</span>
          <span class="font-style3">推广奖励</span>
          <!-- </div> -->
        </router-link>
        <div class="long-bi">
          <p class="bi">
            <span class="left font-style1">{{ totalMyScore }}</span>
            <span
              class="right"
              :style="
                totalMyScore <= 0
                  ? 'background:#646566;'
                  : 'background:#ff6600;'
              "
              @click="clickDuiHuan"
              >兑换</span
            >
          </p>
          <p>
            <span class="left font-style3">我的积分</span>
            <!-- <router-link to="/awarddetails" class="right"> -->
            <span
              class="right"
              :style="
                totalMyScore <= 0
                  ? 'background:#646566;'
                  : 'background:#ff6600;'
              "
              @click="clickMingXi"
              >明细</span
            >
            <!-- </router-link> -->
          </p>
        </div>
        <router-link to="/rankinglist" class="jian-pai">
          <!-- <div> -->
          <span class="bi font-style2">{{ myRank }}</span>
          <span class="font-style3">活动排名</span>
          <!-- </div> -->
        </router-link>
      </div>
    </div>

    <div class="menu-list">
      <router-link to="/rankinglist">
        <div class="list none-border">
          <i class="iconfont icon-paih icon icon-right"></i>
          <span class="middle-text">排行榜</span>
          <i class="iconfont icon-gengduo icon-more"></i>
        </div>
      </router-link>
      <router-link to="/myteam">
        <div class="list">
          <i class="iconfont icon-wodetuandui icon"></i>
          <span class="middle-text">我的团队</span>
          <i class="iconfont icon-gengduo icon-more"></i>
        </div>
      </router-link>
      <router-link
        :to="{
          path: '/myqrcode',
          query: { headimgurl: headimgurl, nickname: nickname },
        }"
      >
        <div class="list">
          <i class="iconfont icon-tuiguangmingpian icon icon-middle"></i>
          <i class="iconfont iconAppIcon-copy card-circle"></i>
          <i class="iconfont iconshouzhixuanzhong-copy card-finger"></i>
          <span class="middle-text">
            <span class="card">推广名片</span>
            <span v-show="false" class="remaining-time"
              >(名片即将到期，请更新...)<i
                class="iconfont icondian-red remaining-icon"
              ></i
            ></span>
          </span>
          <i class="iconfont icon-gengduo icon-more"></i>
        </div>
      </router-link>
      <!-- <div class="list none-border">
        <i
          class="iconfont iconjifenshangcheng- icon icon-right"
          :style="'color:#fc5566'"
        ></i>
        <span class="middle-text">龙币商城</span>
        <i class="iconfont icongengduo icon-more"></i>
      </div> -->
    </div>

    <div class="reminder">
      <i class="iconfont icon-weixian reminder-icon"></i>
      <span>温馨提示：本活动含有烟草内容，十八岁以下人士请勿扫码参与！</span>
    </div>

    <div class="activity-rules-desc">
      <h3><i class="iconfont icon-huodongguize"></i><span>活动规则</span></h3>
      <p>1、发展培训团队方法</p>
      <p>
        扫描好友分享的二维码名片>关注微信>点击微信中"龙粉之家”下的“推客活动“>生成"推广名片"分享给好友，即可建立您的培训团队。凡是您下属团队中的成员扫描"软海韵、海韵、起源、鸿韵"四款烟包_二维码，即可为您贡献培训积分。
      </p>
      <p>2、培训积分标准</p>
      <p>
        通过二维码参与活动的粉丝，扫描有效的软海韵、海韵、起源、鸿韵任款包装二维码，扫-次，除自身将获得与市场零售价格等额的龙币积分(例如起源零售价25元,则可获得龙币25枚,其他规格类推)，
        还可为以上三层的推荐人各累计10枚龙币。
      </p>
      <p>3、活动时间: 2021年4月01日-2021年12月31日。</p>
      <p>4、特别提示</p>
      <p>
        （1）每个推广名片的有效期是30天，转发的名片需定期更新;<br />
        （2）积分不能转让、兑换现金;<br />
        （3）微信号未绑定真龙会员平台的用户,需绑定后方可获得推广的龙币奖励。
      </p>
      <p></p>
      <p></p>
      <p>5、如有疑问,可在微信留言，或拨打4008792099客服热线垂询。</p>
    </div>
    <van-overlay :show="show" class="overlay">
      <div class="content">
        <h3>推广奖励明细</h3>
        <ul>
          <li v-for="(item, index) in list.slice(0, 3)" :key="index">
            <span>{{ item.date }}</span>
            <span class="tj-number">{{ item.proNum }}</span>
            <span class="jiangli">{{ item.score }}积分</span>
          </li>
        </ul>
        <router-link to="/awarddetails" class="lin"
          ><span>点击查看更多</span></router-link
        >
      </div>
      <p class="gb-icon">
        <i class="iconfont icon-guanbi" @click="clickGuanBi"></i>
      </p>
    </van-overlay>
  </div>
</template>

<script>
import {
  userinfo,
  getMyserveralTotal,
  promDayAwardRecordList,
} from "../../api/api";
import wx from "weixin-js-sdk";
export default {
  name: "IndexInfo",
  data() {
    return {
      headless: require("../../assets/img/Headless.png"),
      show: false,
      paramCode: "", //推广编号
      nickname: "", //昵称
      headimgurl: "", //头像
      parentNick: "", //推荐人昵称
      user: "",
      myRank: 0, //我的活动排行
      totalMyScore: 0, //我的总积分
      totalRecomendScore: 0, //推荐奖励获得的积分
      list: [],
    };
  },
  mounted() {
    let that = this;
    let activityNo = localStorage.getItem("activityNo");
    that.$getRequest(userinfo, { activityNo: activityNo }).then((res) => {
      if (res.data.code === 0) {
        that.user = res.data.user;
        let {
          paramCode,
          nickname,
          headimgurl,
          isbind,
          parentNick,
        } = res.data.user;
        if (isbind === "0") {
          that.$dialog.alert({
            title: "温馨提示",
            message: "不好意思！您还不是推客",
            confirmButtonText: "关闭",
            beforeClose() {
              wx.closeWindow();
            },
          });
        } else {
          that.paramCode = paramCode;
          that.nickname = nickname;
          that.headimgurl = headimgurl;
          that.parentNick = parentNick;
          that.getMyserveralTotals();
          that
            .$getRequest(promDayAwardRecordList, { activityNo: activityNo })
            .then((res) => {
              if (res.data.code === 0) {
                that.list = res.data.list;
                let gDate = that.getDate();
                let getDate = localStorage.getItem("setDate");
                if (
                  getDate != "" &&
                  getDate != null &&
                  typeof getDate != undefined
                ) {
                  if (getDate != gDate) {
                    that.show = true;
                    localStorage.setItem("setDate", gDate);
                  }
                } else {
                  that.show = true;
                  localStorage.setItem("setDate", gDate);
                }
              }
            });
        }
      }
    });
  },
  methods: {
    clickGuanBi() {
      this.show = false;
    },
    getMyserveralTotals() {
      let that = this;
      that
        .$getRequest(getMyserveralTotal, {
          activityNo: localStorage.getItem("activityNo"),
        })
        .then((res) => {
          if (res.data.code === 0) {
            let { myRank, totalMyScore, totalRecomendScore } = res.data;
            that.myRank = myRank;
            that.totalMyScore = totalMyScore;
            that.totalRecomendScore = totalRecomendScore;
          }
        });
    },
    getDate() {
      let timeDate = new Date();
      let year = timeDate.getFullYear();
      let month = timeDate.getMonth() + 1;
      let day = timeDate.getDate();
      let currentTime = year + "-" + month + "-" + day;
      return currentTime;
    },
    clickMingXi() {
      if (this.totalMyScore <= 0) {
        return false;
      } else {
        this.$router.push({
          path: "/awarddetails",
        });
      }
    },
    clickDuiHuan() {
      if (this.totalMyScore <= 0) {
        return false;
      } else {
      }
    },
  },
  beforeDestroy() {},
};
</script>

<style >
</style>