<template>
  <div class="header">
    <div class="back" @click="headerBack">
      <i class="iconfont icon-fanhui"></i>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-back",
  props: {
    back: {
      type: [String, Boolean],
      default: true,
    },
  },
  data() {
    return {
      title: "返回",
    };
  },
  methods: {
    headerBack() {
      if (!this.back) return;
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="less">
.header {
  width: 100%;
  overflow: hidden;
  // background-image: linear-gradient(to left, #19d5fd, #1d62f0);
  background-color: #eeeeee;
  .back {
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 8px;
    color: #0066cb;
    font-size: 16px;
    i {
      margin-right: 5px;
    }
  }
}
</style>