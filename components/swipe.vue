<template>
   <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in bannerData" :key="index">
                <img :src="image" :v-lazy="image" class="swipeImg"/>
            </van-swipe-item>
        </van-swipe>
   </div>
</template>

<script>
export default {
   name: '',
   props:['bannerData'],
   data() {
       return { 
            swipeImg: { swipeImg:true } 
        }
   },
  components: {}
}
</script>

<style scoped>
.swipeImg{
    width: 100%;
    height: 100%;
}
.van-swipe__indicator{
  bottom: 25px;
}
</style>
