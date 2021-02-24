<template>
  <div class="index">
    <img :src="bgk" class="bgk" />
    <div class="infor-box" ref="infor-box" id="infor-box">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="item.state == '1' ? 'my-info' : 'get-info'"
        >
          <img
            :src="item.state == '1' ? item.headImg : headImg02"
            :class="item.state == '1' ? 'me-headimg' : 'get-headimg'"
          />
          <div
            :class="item.state == '1' ? 'me-chatcontent' : 'get-chatcontent'"
          >
            <van-image-preview
              v-model="show"
              :images="img"
              :start-position="inx"
              :show-index="false"
            >
            </van-image-preview>
            <img
              :src="item.url"
              v-if="item.code === '00003'"
              class="urlImg"
              @click="clickImg(index)"
            />
            <p v-else>
              <span v-html="item.text">{{ item.text }}</span>
              <br />
              <span
                v-if="item.code === '00000'"
                @click="clickLingqu"
                class="click-lingqu"
                >点击领取</span
              >
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <input
        type="text"
        v-model="inforText"
        @keyup.enter="clickFasong"
        placeholder="请输入回复信息"
        @blur.prevent="blur"
        @focus="focus"
        id="input"
      />
      <button
        @click="clickFasong"
        :style="
          inforText == ''
            ? 'background-color:#aeaeae;'
            : 'background-color:#03c;'
        "
      >
        发送
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      headImg02: require("../../assets/img/headImg02.jpg"),
      bgk:
        "http://res.thewm.cn/zlbean//uploadpath/goodimage/86dcae6a985c48e4ab3e06eca103b4f7_bg0.png",
      inforText: "",
      list: [],
      hisMsgList: [],
      websock: null,
      id: "",
      headimgurl: "",
      type: 1,
      show: false,
      img: [],
      imgIdex: [],
      inx: "0",
    };
  },
  mounted() {
    let that = this;
    that.id = this.$route.query.id;
    that.headimgurl = this.$route.query.headimgurl;
  },
  created() {
    let that = this;
    this.initWebSocket();
    window.addEventListener("resize", function () {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  },
  methods: {
    clickImg(index) {
      this.show = true;
      for (let i = 0; i < this.imgIdex.length; i++) {
        if (this.imgIdex[i] === index) {
          this.inx = i;
        }
      }
    },
    blur(event) {
      let This = event.currentTarget;
      setTimeout(() => {
        This.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
      }, 100);
    },
    focus(event) {
      let el = this.$refs["infor-box"];
      el.scrollTop = el.scrollHeight;
      let This = event.currentTarget;
      setTimeout(() => {
        This.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
      }, 100);
    },
    clickFasong() {
      let that = this;
      that.type = 2;
      if (that.inforText == "") {
        return;
      }
      that.wsonopen();
      that.list.push({
        state: "1",
        headImg: that.headimgurl,
        text: that.inforText,
      });
      setTimeout(() => {
        that.scrollBottm();
      }, 100);
      that.inforText = "";
    },
    initWebSocket() {
      let that = this;
      if ("WebSocket" in window) {
        let ws = "ws://211.159.184.84:58080/webSocket";
        that.websock = new WebSocket(ws);
        that.websock.onopen = that.wsonopen;
        that.websock.onerror = that.wsonerror;
        that.websock.onmessage = that.wsonmessage;
        that.websock.onclose = that.wsclose;
      } else {
        alert("您的浏览器不支持 WebSocket!");
      }
    },
    wsonopen: function () {
      let that = this;
      if (that.type === 1) {
        let actions = {
          uid: that.id,
          msg: "comein",
        };
        if (this.websock.readyState === 1) {
          this.websock.send(JSON.stringify(actions)); //连接建立之后执行send方法发送数据
        } else {
        }
      } else {
        let actions = {
          uid: that.id,
          msg: that.inforText,
        };
        if (this.websock.readyState === 1) {
          this.websock.send(JSON.stringify(actions)); //连接建立之后执行send方法发送数据
        } else {
        }
      }
    },
    wsonerror: function () {
      console.log("连接错误");
    },
    wsonmessage: function (msg) {
      let that = this;
      let data = JSON.parse(msg.data);
      let hisMsgList = data.hisMsgList;
      if (
        typeof hisMsgList != "undefined" &&
        hisMsgList != null &&
        hisMsgList.length != 0
      ) {
        for (let i = 0; i < hisMsgList.length; i++) {
          if (hisMsgList[i].type === "0") {
            this.list.push({
              state: "2",
              text: hisMsgList[i].resMsg,
              code: hisMsgList[i].code,
              url: hisMsgList[i].url,
            });
          } else if (hisMsgList[i].type === "1") {
            this.list.push({
              state: "1",
              text: hisMsgList[i].userMsg,
              code: "00001",
              headImg: that.headimgurl,
            });
            this.list.push({
              state: "2",
              text: hisMsgList[i].resMsg,
              code: hisMsgList[i].code,
              url: hisMsgList[i].url,
            });
          }
        }
        setTimeout(() => {
          that.scrollBottm();
        }, 100);
      } else {
        this.list.push({
          state: "2",
          text: data.msg,
          code: data.code,
          url: data.url,
        });
        setTimeout(() => {
          that.scrollBottm();
        }, 100);
      }
      for (let i = 0; i < that.list.length; i++) {
        if (that.list[i].code === "00003") {
          that.img.push(that.list[i].url);
          that.imgIdex.push(i);
        }
      }
    },
    wsclose: function (e) {
      let that = this;
      if (e.code == 1006) {
        that.list = [];
        setTimeout(function () {
          that.initWebSocket();
        }, 1000);
      }
    },
    scrollBottm() {
      let el = this.$refs["infor-box"];
      el.scrollTop = el.scrollHeight;
    },
    clickLingqu() {
      this.$router.push({ path: "/receive" });
    },
  },

  destroyed() {
    this.websock.onclose = this.wsclose; //离开路由之后断开websocket连接
  },
};
</script>

<style>
.viewer-footer {
  display: none;
}
</style>