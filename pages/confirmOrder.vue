<template>
   <div class="confirmOrder">
      <!-- 标题 -->
      <Nav :navTitleData = "navTitle" ></Nav>
      <!-- 收货地址 -->
      <div class="address">
          <p>{{ person.reciever }} {{ person.recieverPhone }}</p>
          <p><img src="../static/imgs/orderDetail/icon_location.jpg"> {{ person.recieverAdress }}</p>
      </div>
      <!-- 支付金额 -->
      <div class="price">
        <p>应支付 ¥ {{ totalPrice.toFixed(2) }}</p>   
        <p>含运费 ¥ 10.00</p>
      </div>
      <!-- 商品 -->
      <div class="goodsList" v-for="(items,index) in resultData" :key="index">
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
      <!-- 支付方式 -->
      <div class="payBox">
      <div class="title">选择支付方式：</div>
      <van-radio-group v-model="radio">

        <van-cell-group>
            <img src='imgs/confirmOrder/icon_weixin.jpg' class="radio-class icon-weixin">
            <van-cell title="微信" clickable @click="radio = '1'">
            <van-radio slot="right-icon" name="1" />
            </van-cell>
            <img src='imgs/confirmOrder/icon_zhifubao.jpg' class="radio-class icon-zhifubao">
            <van-cell title="支付宝" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" />
            </van-cell>
        </van-cell-group>
        </van-radio-group>
      </div>
        <!-- 提交订单 -->
        <div>
        <van-row class="fixBottom">
            <van-col span="16">应该金额：<span>¥ {{ totalPrice.toFixed(2) }}</span></van-col>
            <van-col span="8" @click="goOrderDetail">提交订单</van-col>
        </van-row>
        </div>
   </div>
</template>

<script>
import Nav from '~/components/nav.vue'
import { mapState, mapMutations, mapGetters } from 'vuex';
import { Toast } from 'vant'
import Api from "~/apis/orders/index"

export default {
   name: '',
   data() {
       return { 
           navTitle:"确认订单",
           msg : 0,
           radio: '1', 
           person:{reciever:'博学谷',recieverPhone:18888888888,recieverAdress:'北京市朝阳区高大上大厦8栋88层888室'},
           resultData:{},
           userId:''
       }
   },
  components: {
      Nav
  },
  
  methods:{
      submitOrder(){
          console.log("1")
          Toast("111")
      },
      goOrderDetail(){
        //参数
        let params = {}
        const ids = []
        for(const index in this.resultData){
            for(const item of this.resultData[index]){
                ids.push(item._id)
            }
        }
        params.goodId = ids.join(",")
        params.reciever = this.person.reciever
        params.recieverPhone = this.person.recieverPhone
        params.recieverAdress = this.person.recieverAdress
        params.totalPrice = this.totalPrice
        params.payType = this.radio
        params.userId = this.userId

        console.log(params,"params")
        //提交订单接口 
        Api.listFun(params).then((data) => {
            if(data.status == 'ok'){
                Toast(data.msg)
            }
            console.log(data,"data")
        }).catch((err)=>{
            console.log(err)
        })



        //跳转
        // ok：交易完成，no:交易失败
        this.$router.push({
            path:"/success",
            query:{status:'ok',queryData:this.resultData}
        })  

      }
  },

  async asyncData(ctx){
      //获取参数
      let getResult = ctx.query
      //vuex存储数据
      console.log(getResult,"getResult")
      console.log(getResult.length,"getResult leng")
      ctx.store.commit('order/add', getResult)

      //return
      return {
          resultData: ctx.store.getters['order/get'],    //vuex获取orderData
          userId: ctx.store.getters['users/get'].userId   //vuex获取userId
      }
  },
  computed:{
      //计算总价
      totalPrice: function(){
          let totalPrice = 0;
          let checkAll = true;
          for(const index in this.resultData){
              for(const item of this.resultData[index]){
                  //选中
                  if(item.checked){
                      //计算总价
                      totalPrice += item.vipprice * item.number
                  }else{
                      checkAll = false
                  } 

              }
          }
          console.log("1")
        //是否选中全部
        this.isCheckAll = checkAll
        // return 
        return totalPrice + 10
      }
  },
}
</script>
<style>
body{
  background: #F1F1F1;
}
</style>


<style lang="scss" scoped>
@import '@/assets/css/order/index.scss';
</style>
