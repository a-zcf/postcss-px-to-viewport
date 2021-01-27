<template>
  <div class="addinventory">
    <div class="head">
      <img :src="headImg" />
      <div class="head-text">
        <p class="nickname">
          <label>当前商家：</label>
          <span>哈哈哈哈</span>
        </p>
        <p class="nickname">
          <label>店铺地址：</label>
          <span>哈哈哈哈哈</span>
        </p>
      </div>
    </div>
    <button class="saoma-add" v-show="show">扫商品码添加商品库存</button>
    <div class="add">
      <div class="slide">
        <ul class="ul-list">
          <li>
            <p class="left-right">
              <span class="name-l name-lenght">商品名称1</span>
              <span class="iconfont icon-guanbi "></span>
            </p>
            <p>
              <span class="total-stock">总库存：1000</span>
              <span class="sold">已售：100</span>
              <span class="surplus">剩余：900</span>
            </p>
            <p class="left-right">
              <span class="name-l color">龙币5000</span>
              <span class="stepper-r"><van-stepper v-model="value" theme="round" button-size="22" disable-input /></span>
            </p>
          </li>
          <li>
            <p class="left-right">
              <span class="name-l name-lenght">商品名称1</span>
              <span class="iconfont icon-guanbi "></span>
            </p>
            <p>
              <span class="total-stock">总库存：1000</span>
              <span class="sold">已售：100</span>
              <span class="surplus">剩余：900</span>
            </p>
            <p class="left-right">
              <span class="name-l color">龙币5000</span>
              <span class="stepper-r"><van-stepper v-model="value" theme="round" button-size="22" disable-input /></span>
            </p>
          </li>
          <li>
            <p class="left-right">
              <span class="name-l name-lenght">商品名称1</span>
              <span class="iconfont icon-guanbi "></span>
            </p>
            <p>
              <span class="total-stock">总库存：1000</span>
              <span class="sold">已售：100</span>
              <span class="surplus">剩余：900</span>
            </p>
            <p class="left-right">
              <span class="name-l color">龙币5000</span>
              <span class="stepper-r"><van-stepper v-model="value" theme="round" button-size="22" disable-input /></span>
            </p>
          </li>
          <li>
            <p class="left-right">
              <span class="name-l name-lenght">商品名称1</span>
              <span class="iconfont icon-guanbi "></span>
            </p>
            <p>
              <span class="total-stock">总库存：1000</span>
              <span class="sold">已售：100</span>
              <span class="surplus">剩余：900</span>
            </p>
            <p class="left-right">
              <span class="name-l color">龙币5000</span>
              <span class="stepper-r"><van-stepper v-model="value" theme="round" button-size="22" disable-input /></span>
            </p>
          </li>
          <li>
            <p class="left-right">
              <span class="name-l name-lenght">商品名称1</span>
              <span class="iconfont icon-guanbi "></span>
            </p>
            <p>
              <span class="total-stock">总库存：1000</span>
              <span class="sold">已售：100</span>
              <span class="surplus">剩余：900</span>
            </p>
            <p class="left-right">
              <span class="name-l color">龙币5000</span>
              <span class="stepper-r"><van-stepper v-model="value" theme="round" button-size="22" disable-input /></span>
            </p>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="but">
          <button class="bg-orange">扫商品码添加库存</button>
          <button class="bg-blue">确认添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'codedeliveryman',
  data(){
      return{
        headImg:require('../../../assets/img/Headless.png'),
        show:false,
        value:''
      }
  },
  mounted(){
      
  },
  methods:{

  }
}
</script>

<style>

</style>