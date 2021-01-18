import * as Api from '@/utils/request'


export default {
    /**
     * 购物车相关接口 carts
    */

    // 添加
    async addCartFun(params){
        return await Api.post({
            url: "cart/add",
            params: params
        })
    },

    //列表
    async cartListFun(params){
        return await Api.post({
            url: "cart/list",
            params: params
        })
    },

    //删除
    async delCartFun(params){
        return await Api.post({
            url: "cart/del",
            params: params
        })
    },
}
