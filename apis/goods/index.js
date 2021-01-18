import * as Api from '@/utils/request'


export default {
    /**
     * 商品相关接口 goods
    */

    //列表
    async listFun(params){
        return await Api.post({
            url:"goods/list",
            params:params
        })
    },
    //详情
    async detailFun(params){
        return await Api.post({
            url: "goods/detail",
            params: params
        })
    },
}