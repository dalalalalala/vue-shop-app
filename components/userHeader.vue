<template>
   <div class="userHeader">
       <h4>{{ title }}</h4>
       <p>{{ subTitle }}</p>
   </div>
</template>

<script>
export default {
   props:['title','subTitle'],
   name: '',
   data() {
       return { msg : 0 }
   },
  components: {}
}
</script>

<style lang='scss' scoped>
.userHeader{
    width:100%;
    color:#ffffff;
    padding:.66rem 0 .66rem .55rem;
    background: linear-gradient(to right , #FE3B2C, #FE4864);
    background: -webkit-linear-gradient(to right , #FE3B2C, #FE4864);

    :nth-child(1){
        font-size: .5rem;
        font-weight: normal;
    }
    :nth-child(2){
        margin-top: .17rem;
        color:#F1DADA;
        font-size: .28rem;
    }
}
</style>
