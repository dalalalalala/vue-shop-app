import * as Api from '@/utils/request'


export default {
    /**
     * 订单相关接口 goods
    */

    // 提交订单
    async listFun(params){
        return await Api.post({
            url: "orders/add",
            params: params
        })
    },

    
}