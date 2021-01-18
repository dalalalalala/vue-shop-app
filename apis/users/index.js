import * as Api from '../../utils/request'


export default {
    /**
     * 用户中心 Users
    */

    // 注册
    async regFun(params){
        return await Api.post({
            url: "users/reg",
            params: params
        })
    },

    //登录
    async loginFun(params){
        return await Api.post({
            url: "users/login",
            params: params
        })
    },   
}