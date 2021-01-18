<template>
   <div class="tabbar">
    <van-tabbar v-model="active"  active-color="#E34B3F">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/shopCart">购物车</van-tabbar-item>
    </van-tabbar>
   </div>
</template>





<script>
export default {
   data() {
       return { 
            active: 0,
        }
   },
   methods:{
     goHome(){
       this.$router.replace({
         path:'/home'
       })

     }
   }
}
</script>

<style lang="scss" scoped>
.van-tabbar{
    box-shadow: 5px 5px 0 0 #666;
}
.van-tabbar-item{
  border-top:#dededf 1px solid;
}
.van-tabbar-item--active{
  border-top:#dededf 1px solid;
  &:nth-child(1){
    border-right:#F2F2F2 1px solid;
    border-image: -webkit-linear-gradient(#F2F2F2,#FFFFFF) 1 1;
   	border-image: -moz-linear-gradient(#F2F2F2,#FFFFFF) 1 1;
    border-image: linear-gradient(#F2F2F2,#FFFFFF) 1 1; 
  }
    &:nth-child(2){
    border-left:#F2F2F2 1px solid;
    border-image: -webkit-linear-gradient(#F2F2F2,#FFFFFF) 1 1;
   	border-image: -moz-linear-gradient(#F2F2F2,#FFFFFF) 1 1;
    border-image: linear-gradient(#F2F2F2,#FFFFFF) 1 1; 
  }
  color:#E34B3F; 
  /* background: linear-gradient(to bottom, #F2F2F2, #FFFFFF, #FFFFFF);
  background: -moz-linear-gradient(to bottom, #F5F5F5, #FFFFFF);
  background: -webkit-linear-gradient(to bottom, #F5F5F5, #FFFFFF);
  background: -o-linear-gradient(to bottom,#F5F5F5, #FFFFFF); */
}
.van-list{
  padding-bottom:.5rem;
}
</style>
