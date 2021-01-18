<template>
   <div class="shopCar">
      <!-- 标题 -->
      <Nav :navTitleData = "navTitle" ></Nav>
      <!-- 商品列表 -->
      <div class="goodsList">
          <!-- 遍历 -->
          <div v-for="(items,index) in showGoodsList" :key="index">
                <!-- 店铺 -->
                <van-row class="title">
                    <van-col span="12"><img src="../static/imgs/shopCar/icon_business.png"> {{index}}</van-col>
                    <van-col span="12">共有<span> {{ items.length }} </span>个商品</van-col>
                </van-row>
                <!-- 列表 -->
                <van-row v-for="(item,i) in items" class="list" :key="i">
                    <van-col span="3" class="checkbox">
                        <van-checkbox v-model="item.checked"></van-checkbox>
                    </van-col>
                    <van-col span="7" class="goodsImg">
                        <img :src="item.imgurl[0]" >
                    </van-col>
                    <van-col span="12">
                        <h4>{{item.title}}</h4>
                        <p class="cont">{{item.sku}}</p>
                        <p class="price">¥{{item.price}} </p>
                        <p class="vipPrice"><img src="../static/imgs/shopCar/icon_vip.png" class="iconVip"> ¥{{item.vipprice}} 
                        </p>
                        <van-stepper v-model="item.number" step="1" class="stepper" />
                        <img src="../static/imgs/shopCar/icon_delete.jpg" class="del" @click="delCartFun(item._id)">
                    </van-col>

                </van-row>
          </div>
      </div>

      <!-- 购买 -->
      <van-submit-bar
        :price="totalPrice"
        button-text="结算"
        @submit="onSubmit"
        >
        <!-- 全选 -->
        <van-checkbox @click="isCheckAllFun" v-model="isCheckAll">全选</van-checkbox>
      </van-submit-bar>

      <!-- 底部tabbar -->
      <Tabbar></Tabbar>
   </div>
</template>

<script>
import Api from '~/apis/carts/index'
import Nav  from '~/components/nav'
import Tabbar  from '~/components/tabbar'
import {Toast} from 'vant'

export default {
   name: '',
   data() {
       return { 
        navTitle: "购物车",
        goodsList:[],
        showGoodsList:{},
        isCheckAll:false, // 是否全选
       }
   },
  components: {
      Nav,
      Tabbar
  },
  methods:{
      //结算
      onSubmit(){
          console.log("11")
          //过滤
          let newGoodsList = {}
          for(const index in this.showGoodsList){
              for(const item of this.showGoodsList[index]){
                  //是否选中
                  if(item.checked){
                      //店铺是否存在
                      if(!newGoodsList[item.shop]){
                          newGoodsList[item.shop] = []
                      }
                      //添加数据
                      newGoodsList[item.shop].push(item)
                  }
              }
          }
          console.log(newGoodsList,"newGoodsList")
          //跳转
          this.$router.push({
              path:'/confirmOrder',
              query: newGoodsList
          })
      },
      //点击全选、反选
      isCheckAllFun(){
          this.isCheckAll ? this.isCheckAll = false : this.isCheckAll = true;
          //设置全选
          let checkObject  = Object.keys(this.showGoodsList)
          if(checkObject.length != 0){
              for(const index in this.showGoodsList){
                  for(const item of this.showGoodsList[index]){
                      item.checked = this.isCheckAll
                  }
              }
          }
      },
      //删除
      delCartFun(id){
          console.log(id)
          console.log(1)
          Api.delCartFun({id:id}).then((data)=>{
              if(data.status == 'ok'){
                  Toast(data.msg)
                  const _this = this;
                  setTimeout(function(){
                    //删除Data
                    _this.delGoodsList(id)
                  },3000)
              }
              console.log(data)
          }).catch((err)=>{
              console.log(err)
          })
      },
      //删除当前数据
      delGoodsList(id){
          for(const index in this.showGoodsList){
              for(const i in this.showGoodsList[index]){
                  //是否相等
                  const items = this.showGoodsList[index]
                  if(items[i]._id == id){
                      if(items.length == 1){
                          delete this.showGoodsList[index]
                      }
                      items.splice(i,1)
                  }
              }
          }
      }
  },
  computed:{
      //计算总价
      totalPrice: function(){
          let totalPrice = 0;
          let checkAll = true;
          for(const index in this.showGoodsList){
              for(const item of this.showGoodsList[index]){
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
        return (totalPrice + 10) * 100 
      }
  },
  //调用购物车列表接口
  async asyncData(ctx){
      return Api.cartListFun({pageNo:1, pageSize:3}).then((data) =>{
          console.log(data)
          //过滤
          let newGoodsList = {}
          const goodsData = data.resultData
          for (var i =0; i<goodsData.length; i++){
              if(!newGoodsList[goodsData[i].shop]){
                  newGoodsList[goodsData[i].shop] = []
              }
              //处理图片数据
              goodsData[i].imgurl = goodsData[i].imgurl.split(",")
              //添加选择状态(默认)
              goodsData[i].checked = false;
              //添加数据
              newGoodsList[goodsData[i].shop].push(goodsData[i]);
          }
          console.log(newGoodsList,"newGoodsListnewGoodsListnewGoodsList")
          // 返回数据
          return {
              showGoodsList:newGoodsList
          }

      }).catch((err)=>{
          console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/shopCart/index.scss';
</style>
