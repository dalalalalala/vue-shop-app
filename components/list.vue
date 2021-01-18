<template>
   <div class="list">
        <!-- 下拉加载功能 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <ul class="imgList">
          <li v-for="(item,index) in list" :key="index" @click="detailFun(item._id)">
            <img :src="item.imgurl.split(',')[0]"/>
            <div class="content">
              <p class="title">{{ item.title }}</p>
              <p class="vipPrice">¥{{ item.vipprice }}</p>
              <p class="price">¥{{ item.price }}</p>
            </div>
          </li>
        </ul>
        </van-list>
   </div>
</template>

<script>
import Api from '@/apis/goods/index'
export default {
  data() {
    return {
      list: [],
      listData : [
          {
            id:'5d786f7f03cb0f486ed37bbf',
            imgUrl:'imgs/home/img_1.gif',
            title:"良品风格时钟，北欧简约风格、最后30个手满无 限时购",
            vipPrice: '26.94',
            price: '30.22'
          },
          {
            id:'5d786f7f03cb0f486ed37bbf',
            imgUrl:'imgs/home/img_2.gif',
            title:"良品风格时钟，北欧简约风格、最后30个手满无 限时购",
            vipPrice: '26.94',
            price: '30.22'
          },
          {
            id:'5d786f7f03cb0f486ed37bbf',
            imgUrl:'imgs/home/img_3.gif',
            title:"良品风格时钟，北欧简约风格、最后30个手满无 限时购",
            vipPrice: '26.94',
            price: '30.22'
          },
          {
            id:'5d786f7f03cb0f486ed37bbf',
            imgUrl:'imgs/home/img_4.gif',
            title:"良品风格时钟，北欧简约风格、最后30个手满无 限时购",
            vipPrice: '26.94',
            price: '30.22'
          },
          {
            id:'5d786f7f03cb0f486ed37bbf',
            imgUrl:'imgs/home/img_5.jpg',
            title:"华为畅享 9e 千元珍珠屏 3GB+32GB 全网通标配版麒麟980 AI芯片",
            vipPrice: '1999.00',
            price: '2099.00'
          },
          {
            id:'5d786f7f03cb0f486ed37bbf',
            imgUrl:'imgs/home/img_1.gif',
            title:"良品风格时钟，北欧简约风格、最后30个手满无 限时购",
            vipPrice: '26.94',
            price: '30.22'
          }
      ],
      loading: false,
      finished: false,
      pageNum: -1,
      pageSize:4,
      pageNo:1
    };
  },
  methods: {
    onLoad() {
      //列表接口
      Api.listFun({pageNo: this.pageNo,pageSize: this.pageSize}).then((data) =>{
        console.log(data,"data")
        if(data.resultData.length == 0){
            this.finished = true
            this.loading = false;
            return false
        }else{
            this.list = this.list.concat(data.resultData)
            this.pageNo = this.pageNo + 1
            this.loading = false;
        }
      }).catch((err)=>{
        console.log(err)
        this.loading = false;
      })

    },
        detailFun(id) {
      this.$router.push({
          path:"/detail",
          query:{id:id}
      })  
    }

  },

}
</script>

<style scoped>
.list{
  padding-bottom:1rem;
}
.imgList{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 3% 3% 3%;
  font-family: 'STHeitiSC-Light','Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}
.imgList .content{
    padding:5px;
}
.imgList li {
  width:48.5%;
  margin-top:4%;
  border-radius: 5px;
  background: #ffffff;
  overflow: hidden;
}
.imgList li:nth-child(2n){
  margin-left:3%;
}
.imgList li img {
  width:100%
}
.imgList li .content .title{
    color:#494949;
    font-size:14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.imgList li .content .vipPrice{
    color:#FE3144;
    font-size:18px;
    margin:15px 0;
    line-height: 14px;

}
.imgList li .content .vipPrice span{
    color:#FE3144;
    font-size:11px;
    background: #FFECED;
    border: #FE3144 1px solid;
    vertical-align:middle;
    padding:2px;
    border-radius: 4px;
    margin-right: 10px;

}
.imgList li .content .price{
    color:#7A7A7A;
    font-size:10px;
    padding-bottom: 5px;
}
.van-list__finished-text{
  margin-bottom:.5rem;
}
</style>
