<template>
   <div class="login">
       <!-- header -->
       <userHeader :title="title" :subTitle="subTitle"/>
       <!-- input items -->
       <ul class="inputGroud">
           <li>
               <van-field
               clearable
                    :error-message="loginValidate.phone"
                    placeholder="用户名/手机号"
                    type="text"
                    v-model="loginParams.phone"
                />
           </li>
           <li>
               <van-field
               clearable
                    :error-message="loginValidate.pwd"
                    placeholder="密码"
                    type="password"
                    v-model="loginParams.pwd"
                />
           </li>         
       </ul>
       <!-- button -->
       <div class="loginBtn">
            <van-button round type="danger" @click="loginFun">登录</van-button>
       </div>
       <!-- 注册 -->
        <div class="reg" @click="goRegPage">
            没有账号？去注册
        </div>
   </div>
</template>

<script>
import userHeader from '../components/userHeader.vue';
import Api from '../apis/users/index'
import { MD5 } from 'crypto-js';
import { mobileReg, pwdReg  } from '../utils/utils';
import { Toast } from 'vant'

export default {
   name: '',
   data() {
       return { 
           title:"登录",
           subTitle:"登录注册表示同意《电商平台服务与条款》",
           loginParams:{
               phone:'',
               pwd:'',
           },
           loginValidate:{
               phone:'',
               pwd:'',
           }
       }
   },
   methods:{
       loginFun(){
           //初始化数据
           this.loginValidate={
               phone:'',
               pwd:'',
           }
           //校验
           if(!mobileReg.test(this.loginParams.phone)){
               this.loginValidate.phone = "请输入正确的手机号"
               return false;
           }
           if(!pwdReg.test(this.loginParams.pwd)){
               this.loginValidate.pwd = "请输入数字和字母组合6~18位的密码"
               return false;
           }

           // 加密
           const md5PassWord = MD5(this.loginParams.pwd).toString();

           console.log(this.loginParams.pwd,md5PassWord,"密码")

           //登录接口
           Api.loginFun({username: this.loginParams.phone, password: md5PassWord}).then((data)=>{
               if(data.status == 'ok'){
                    Toast(data.msg)
                    const userInfo = {"userId":data.resultData[0]._id,"token":data.token}
                    //localStorage 存储
                    localStorage.setItem('users',JSON.stringify(userInfo))
                    //vuex存储
                    this.$store.commit("users/add",userInfo)

                    //跳转首页
                    const _this = this;
                    setTimeout(function(){
                        _this.$router.push({
                            path:'/'
                        })
                    },3000)


               }
           }).catch((err)=>{
               console.log(err)
           })


       },
       goRegPage(){
            this.$router.push({
                path:"/reg",
            })  
       }
   },
   components: {
        userHeader
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/login/index.scss';
</style>
