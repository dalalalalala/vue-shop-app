import Router from 'koa-router'
import Orders from '../dbs/models/orders'

let router = new Router({ prefix:'/orders' })

/**
 * 提交订单接口
 * 
 * @param {goodId}}         商品ID
 * @param {reciever}}       收货人
 * @param {recieverPhone}}  收货人电话
 * @param {recieverAdress}} 收货人地址
 * @param {totalPrice}}     总价
 * @param {payType}}        支付方式
 * @param {userId}}         用户ID
 * 
*/

router.post('/add', async (ctx,next) =>{
    const body = ctx.request.body
    //Orders模型
    const orders = new Orders({
        goodId: body.goodId,
        reciever: body.reciever,
        recieverPhone: body.recieverPhone,
        recieverAdress: body.recieverAdress,
        totalPrice: body.totalPrice,
        payType: body.payType,
        userId: body.userId,
    })

    let status, msg, ordersData
    try{
        // 保存数据
        ordersData = await orders.save();
        if(!!ordersData){
            status='ok'
            msg='添加成功！'
        }else{
            status='no'
            msg='添加失败！'
        }
    }catch(e){
        status='no'
        msg='添加失败！'
    }

    //body 返回数据
    ctx.body = { status, msg, resultData:ordersData  }
})

export default router
