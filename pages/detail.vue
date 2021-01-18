<template>
   <div class="detail">
        <!-- 标题 -->
        <Nav :navTitleData = "navTitle"></Nav>
        <!-- 轮播图 -->
        <Swipe :bannerData = "detailData.imgurl" ></Swipe>
        <!-- 活动 -->
        <div class="activity">
            <b>限时特卖</b> 01月10日 20:00:00 开始抢购
        </div>
        <!-- 商品信息 -->
        <section class="text">
            <div class="price">
                ¥<label>{{ detailData.vipprice }}</label>   <label>原价 ¥ {{ detailData.price }}</label>
            </div>
            <h4 class="title">{{ detailData.title }}</h4>
            <!-- 月销 -->
            <van-row class="express">
                <van-col span="8">快递: {{ detailData.expressAmount }}元</van-col>
                <van-col span="8">月销: {{ detailData.saleNum }}件</van-col>
                <van-col span="8">{{ detailData.goodsAddress }}</van-col>
            </van-row>
        </section>

        <!-- 商品详情 -->
        <div class="content" v-html="detailData.content">
        </div>

        <!-- 底部导航 -->
        <van-goods-action class="buyBox">
            <van-goods-action-icon
                icon="home-o"
                text="首页"
                class="home-o-col"
                @click="goHome"
            />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="addCart"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="buyGoods"
            />
        </van-goods-action>
   </div>
</template>

<script>
import Api from '~/apis/goods/index'
import CartApi from '~/apis/carts/index'
import Swipe from '~/components/swipe.vue'
import Nav from '~/components/nav.vue'
import { Toast } from 'vant'
export default {
   data() {
       return { 
           msg : 0 ,
           navTitle:"商品详情",
           detailData:{},
           originDetailData:{},
       }
   },

   async asyncData(ctx){
       
       // 获取参数
       let getId = ctx.query.id

       //调用详情接口
       return Api.detailFun({id: getId}).then((data)=>{
           console.log(data,"data")
           //原始数据
           let originDetailData = JSON.parse(JSON.stringify(data.resultData)) ; 
           // urlimg 转换字符串数组
           let imgUrl = data.resultData.imgurl.split(",");
           data.resultData.imgurl = imgUrl
           return {
               detailData : data.resultData,
               originDetailData: originDetailData,
           }
       }).catch((err)=>{
           console.log(err)
       })
   },

  components: {
      Swipe,
      Nav
  },
  methods:{
    goHome() {
      this.$router.push({
          path:"/",
          query:{a:1}
      })  
    },
    addCart(){
        //参数
        let params = {}
        let { userId } = this.$store.getters['users/get']
        params = this.originDetailData
        params.userId = userId

        console.log(params,"params")

        //接口
        CartApi.addCartFun(params).then((data) => {
            if(data.status == 'ok'){
                Toast(data.msg)
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    buyGoods(){
        //参数-过滤
        let newGoodsList ={}
        newGoodsList[this.detailData.shop] = []
        newGoodsList[this.detailData.shop].push(this.detailData)

        //跳转对应页面
        this.$router.push({
            path:'/confirmOrder',
            query: newGoodsList
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/detail/index.scss';
</style>
