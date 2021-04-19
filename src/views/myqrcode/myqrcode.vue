<template>
  <div class="code-qr">
    <div ref="imageWrapper" v-show="show" class="my-qr-code">
      <img class="codeImg" :src="url" />
      <img :src="headimgurl" class="headimgurl" />
      <p class="name">{{ nickname }}</p>
      <p class="name font">欢迎加入我的团队</p>
      <div class="qrcode">
        <div id="qrcode" ref="qrcode" style="display: none"></div>
        <div id="myQRCode"></div>
      </div>
    </div>
    <img :src="imgUrl" v-show="!show" alt="" class="codeqr" />
  </div>
</template>

<script>
import { myCard } from "../../api/api";
import QRCode from "qrcodejs2"; // 引入qrcode
import html2canvas from "html2canvas";
export default {
  name: "myqrcode",
  data() {
    return {
      url: require("../../assets/img/codeBack.png"),
      nickname: "",
      headimgurl: "",
      image: "",
      imgUrl: "",
      show: true,
    };
  },
  mounted() {
    // this.url = this.$route.query.url;
    let that = this;
    let activityNo = localStorage.getItem("activityNo");
    that.nickname = that.$route.query.nickname;
    that.headimgurl = that.$route.query.headimgurl;
    let hideQRCode = document.getElementById("qrcode"),
      myQRCode = document.getElementById("myQRCode");
    that.image = new Image();
    that.$getRequest(myCard, { activityNo: activityNo }).then((res) => {
      if (res.data.code === 0) {
        let code = res.data.url;
        let qrcode = new QRCode("qrcode", {
          width: 200,
          height: 200,
          text: code,
        });
        qrcode.makeCode(code);
        that.image.src = hideQRCode.firstChild.toDataURL("image/png");
        myQRCode.appendChild(that.image);
        setTimeout(function () {
          that.toImage();
        }, 1000);
      }
    });
  },
  methods: {
    toImage() {
      let that = this;
      html2canvas(that.$refs.imageWrapper, {
        // width: 750,
        // height: 1334,
        backgroundColor: null,
        useCORS: true, // 允许图片跨域
        taintTest: true, // 在渲染前测试图片
      }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        that.imgUrl = dataURL;
        that.show = false;
      });
    },
  },
};
</script>

<style>
.codeqr {
  display: block;
  width: 100%;
  height: 100%;
}
</style>