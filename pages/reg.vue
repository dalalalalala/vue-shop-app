<template>
   <div class="reg">
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
           <li>
               <van-field
                    :error-message="loginValidate.repPwd"
                    placeholder="确认密码"
                    type="password"
                    v-model="loginParams.repPwd"
                />
           </li>           
       </ul>
       <!-- button -->
       <div class="regBtn">
            <van-button round type="danger" @click="loginFun">注册</van-button>
       </div>

   </div>
</template>

<script>
import userHeader from '@/components/userHeader.vue';
import Api from '@/apis/users/index'
import { MD5 } from 'crypto-js';
import { mobileReg, pwdReg  } from '@/utils/utils';
import { Toast } from 'vant'

export default {
   name: '',
   data() {
       return { 
           title:"注册",
           subTitle:"为保证您的账户安全,请绑定手机号",
           loginParams:{
               phone:'',
               pwd:'',
               repPwd:'',
           },
           loginValidate:{
               phone:'',
               pwd:'',
               repPwd:'',
           }
       }
   },
   methods:{
       loginFun(){
           //初始化数据
           this.loginValidate={
               phone:'',
               pwd:'',
               repPwd:'',
           }
           //校验
           if(!mobileReg.test(this.loginParams.phone)){
               this.loginValidate.phone = "请输入正确的手机号"
               return false;
           }
           if(!pwdReg.test(this.loginParams.pwd)){
               this.loginValidate.pwd = "请输入正确的密码"
               return false;
           }
           if(this.loginParams.pwd !== this.loginParams.repPwd){
               this.loginValidate.repPwd = "两次密码不一致"
               return false;
           }

           // 加密
           const md5PassWord = MD5(this.loginParams.pwd).toString();

           // axios 注册接口
           Api.regFun({username: this.loginParams.phone, password:md5PassWord}).then((data)=>{
               Toast(data.msg)
                //跳转登录页
                const _this = this;
                setTimeout(function(){
                    _this.$router.push({
                        path:'/login'
                    })
                },3000)
           }).catch((err) => {
               console.log(err)
           })
       }
   },
   components: {
        userHeader
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/reg/index.scss';
</style>
