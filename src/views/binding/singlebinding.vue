<template>
  <div class="singlebinding">
    <img :src="imgUrl" class="imgUrl" />
    <p class="barnName">{{ brandName }}</p>
    <div class="acigarette-price">
      <van-field
        v-model="price"
        type="number"
        label="整条烟价："
        placeholder="建议零售价"
      />
    </div>
    <!-- <button class="button" @click="clickSmokeBind">确认绑定</button> -->
    <div class="binding-but">
      <button class="left-jiao" @click="clickSmokeBind">可支付绑定</button>
      <span></span>
      <button class="right-jiao" @click="clickSmokeBindNoneedpay">
        不可支付绑定
      </button>
    </div>
  </div>
</template>

<script>
import { smokeInfo, smokeBind, smokeBindNoneedpay } from "../../api/api";
export default {
  name: "singlebinding",
  data() {
    return {
      imgUrl: "",
      batchCode: "",
      codeId: "",
      brandName: "",
      price: 0,
      brandCode: "",
    };
  },
  mounted() {
    let that = this;
    let result = that.$route.query.result;
    that.$postRequest(smokeInfo, { codeStr: result }).then((res) => {
      if (res.data.code === 0) {
        let {
          batchCode,
          codeId,
          brandName,
          price,
          brandCode,
          imgUrl,
        } = res.data.data.smokeInfo;
        that.batchCode = batchCode;
        that.codeId = codeId;
        that.brandName = brandName;
        that.price = price;
        that.brandCode = brandCode;
        that.imgUrl = imgUrl;
      } else {
        that.$toast.fail(res.data.msg);
      }
    });
  },
  methods: {
    clickSmokeBind() {
      let that = this;
      let params = {
        list: [
          { batchCode: that.batchCode, codeId: that.codeId, price: that.price },
        ],
      };
      that.$postRequest(smokeBind, params).then((res) => {
        if (res.data.code === 0) {
          that.$toast.success("绑定成功");
          that.$router.push({
            path: "/bindingsuccess",
          });
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
    clickSmokeBindNoneedpay() {
      let that = this;
      let params = {
        list: [
          { batchCode: that.batchCode, codeId: that.codeId, price: that.price },
        ],
      };
      that.$postRequest(smokeBindNoneedpay, params).then((res) => {
        if (res.data.code === 0) {
          that.$toast.success("绑定成功");
          that.$router.push({
            path: "/bindingsuccess",
          });
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>