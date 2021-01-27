<template>
  <div class="withdrawal">
     <ul>
         <li>
             <van-field v-model="digit" type="digit" label="商品名称1" placeholder="当前还有100数量没提现" clearable/>
         </li>
         <li>
             <van-field v-model="digit" type="digit" label="商品名称1" placeholder="当前还有100数量没提现" clearable/>
         </li>
     </ul>
  </div>
</template>

<script>
export default {
  name:'withdrawal',
  data(){
      return{
       digit:'',
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