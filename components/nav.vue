<template>
    <div class="nav">
        <van-nav-bar
        :title="navTitleData"
        left-text=""
        left-color="#ccc"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
</template>

<script>
export default {
    props:['navTitleData'],
    methods:{
    onClickLeft(){
    //   Toast('返回');
    this.$router.back();
    },
    onClickRight(){
      Toast("按钮")
    }
  }
}
</script>

<style scoped>
body{
    margin-bottom: 46px;
}
.nav{
    margin-top:46px;
}
.nav > div{
    position: fixed;
    top:0;
    left:0;
    width:100%
}
.van-icon-arrow-left:before{
    color:#333;
    font-size: .4rem;
}
.van-nav-bar__title{
    color:#252525;
    font-weight: normal;
}
</style>
