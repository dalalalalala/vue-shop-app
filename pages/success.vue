<template>
   <div class="orderSuccess">
      <!-- 标题 -->
      <Nav :navTitleData = "navTitle" ></Nav>
      <!-- 成功 -->
      <div class="status">
            <p v-if="resultData.status == 'ok'">
                <van-icon name="passed" /> 交易成功
            </p>
            <p v-else>
                <van-icon name="close" />  交易失败
            </p>
      </div>
      <!-- 地址 -->
      <div class="address">
          <p>博学谷 18888888888</p>
          <p><img src="../static/imgs/orderDetail/icon_location.jpg"> 北京市朝阳区高大上大厦8栋88层888室</p>
      </div>
      <!-- 商品 -->
      <div class="goodsList" v-for="(items,index) in resultData.queryData" :key="index">
          <!-- 列表 -->
                <!-- 店铺 -->
                <van-row class="title">
                    <van-col span="12"><img src="../static/imgs/shopCar/icon_business.png"> {{index}}</van-col>
                    <van-col span="12">共有<span> {{ items.length }} </span>个商品</van-col>
                </van-row>
                <!-- 列表 -->
                <van-row v-for="(item,i) in items" class="list" :key="i">
                    <van-col span="5" class="goodsImg"><img :src="item.imgurl[0]"></van-col>
                    <van-col span="13">
                        <h4>{{ item.title }}</h4>
                        <p>{{ item.sku }}</p>
                    </van-col>
                    <van-col span="6">
                        <p>¥{{ item.vipprice }}</p>
                        <p class="num">x{{ item.number }}</p>
                    </van-col>
                </van-row>
      </div>

        <!-- 购买 -->
        <div class="fixBottom">
            <label @click="goHome">返回首页</label>&nbsp;&nbsp;
            <label @click="goShopCart">再次购买</label>
        </div>
   </div>
</template>

<script>
import Nav from '~/components/nav.vue'
import { Toast } from 'vant'

export default {
   name: '',
   data() {
       return { 
           navTitle:"订单详情",
           msg : 0,
           radio: '1',
           status: '',
           resultData:{},
       }
   },
    async asyncData(ctx){
     //获取参数
     let getResult = ctx.query

     return {
         resultData: getResult
     }
    },
  components: {
      Nav
  },
  methods:{
      goHome(){
          this.$router.push({
            path:"/",
            query:{a:1}
          })  
      },
      goShopCart(){
          this.$router.push({
            path:"/shopCart",
            query:{a:1}
          })  
      }
  }
}
</script>
<style>
body{
  background: #F1F1F1;
}
</style>


<style lang="scss" scoped>
@import '@/assets/css/orderDetail/index.scss';
</style>
