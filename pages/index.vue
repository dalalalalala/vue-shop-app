<template>
  <section class="container">
      <!-- 标题 -->
      <Nav :navTitleData = "navTitle" ></Nav>

      <!-- 轮播 swipe -->
      <Swipe :bannerData = "bannerImg" />

      <!-- 二级分类 -->
      <ul class="productType">
        <li v-for="(item,index) in typeList" :key="index">
          <img :src="item.imgUrl" >
          <p>{{item.name}}</p>
        </li>    
      </ul>

      <!-- list -->
      <List />

      <!-- 底部TabBar -->
      <Tabbar></Tabbar>
  </section>
</template>

<script>
import Nav from '../components/nav.vue'
import Swipe from '../components/swipe.vue'
import List from '../components/list.vue'
import Tabbar from '../components/tabbar.vue'
import axios from 'axios'
import { Toast } from 'vant'

export default {
  name:"home",
  components: {
    Nav,
    Tabbar,
    Swipe,
    List
  },
  data() {
    return {
      navTitle:'高端电商平台',
      title:'',
      bannerImg: [
        '/imgs/home/banner_2.jpg',
        '/imgs/home/banner_1.jpg'
      ],
      //列表数据
      typeList:[
        {name:"彩妆",imgUrl:"imgs/home/icon_1.gif"},
        {name:"美容工具", imgUrl:"imgs/home/icon_2.gif"},
        {name:"生鲜零食", imgUrl:"imgs/home/icon_3.gif"},
        {name:"面部护理", imgUrl:"imgs/home/icon_4.gif"},
        {name:"男鞋", imgUrl:"imgs/home/icon_5.gif"},
        {name:"箱包文具", imgUrl:"imgs/home/icon_6.gif"},
        {name:"母婴用品", imgUrl:"imgs/home/icon_7.gif"},
        {name:"套装礼盒", imgUrl:"imgs/home/icon_8.gif"},
        {name:"香水", imgUrl:"imgs/home/icon_9.gif"},
        {name:"名茶冲饮", imgUrl:"imgs/home/icon_10.gif"},
      ]
    }
  },

  methods: {
  },
}
</script>


<style lang="scss">
@import '@/assets/css/home/index.scss';
</style>