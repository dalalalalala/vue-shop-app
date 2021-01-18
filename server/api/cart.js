import Router from 'koa-router'
import Cart from '../dbs/models/cart'

let router = new Router({prefix:'/cart'})
 
/**
 * 添加购物车接口
 * 
 * @param {userId}}         用户ID
 * @param {imgurl}}         商品图片
 * @param {title}}          商品标题
 * @param {vipprice}}       会员价
 * @param {price}}          原价
 * @param {number}}         数量
 * @param {sku}}            规格
 * @param {shop}}           店铺
 * @param {saleNum}}        销量
 * @param {expressAmount}}  运费
 * @param {goodsAddress}}   地址
 * @param {createTime}}     创建时间
 * 
*/

router.post('/add', async (ctx, next) =>{
    const body = ctx.request.body
    console.log(body,"body")
    console.log(body.userId,"body userId")
    // Cart模型
    let carts = new Cart({
        userId: body.userId,
        imgurl: body.imgurl,
        title: body.title,
        vipprice: body.vipprice,
        price: body.price,
        number: 1,
        sku: body.sku,
        shop: body.shop,
        saleNum: body.saleNum,
        expressAmount: body.expressAmount,
        goodsAddress: body.goodsAddress,
    })
    console.log(carts,"cartscarts")

    let status, msg, cartData
    try{
        //保存数据
        cartData = await carts.save();
        console.log(cartData,"cartData")
        if(!!cartData){
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
    ctx.body = { status,msg, resultData: cartData }
})



/**
 * 获取购物车列表接口
 * 
 * @param {pageNo}     页数
 * @param {pageSize}   多少条
 * 
*/
router.post('/list', async (ctx,next) => {
    const { pageNo,pageSize } = ctx.request.body
    let status, msg, results
    try{
        // 获取数据
        results = await Cart.find({}).skip((parseInt(pageNo)-1) * parseInt(pageSize)).limit(parseInt(pageSize))
        status = 'ok'
        msg = '查询成功！'
    }catch(e){
        status = 'no'
        msg = '查询失败！'
    }

    //body 返回数据
    ctx.body = { status, msg, resultData:results }
})

/**
 * 删除购物车列表接口
 * 
 * @param {id}     购物车数据ID
 * 
*/
router.post('/del' , async (ctx,next) =>{
    const { id } = ctx.request.body
    let status, msg, cartData
    try{
        //保存数据
        cartData = await Cart.remove({_id:id});
        if(!!cartData){
            status='ok'
            msg='删除成功！'
        }else{
            status='no'
            msg='删除失败！'
        }
        
    }catch(e){
        status='no'
        msg='删除失败！'
    }

    //body 返回数据
    ctx.body = { status,msg, resultData: cartData }
})

export default router