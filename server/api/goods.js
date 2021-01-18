import Router from 'koa-router'

import Goods from '../dbs/models/goods'

let router = new Router({prefix:'/goods'})


/**
 * 商品详情接口
 * 
 * @param {id}   商品ID
 * 
*/
router.post('/detail',async (ctx,next) =>{
    const { id } = ctx.request.body
    let status, msg, code, results
    try{
        //查找find
        results = await Goods.find({_id:id})
        console.log(results,"resultsresults")
        if(!!results && results.length > 0){
            status = 'ok'
            msg = '查询成功！'
        }else{
            status = 'no'
            code = 404
            msg = '没有此条数据！'
        }

    }catch(e){
        status = 'no'
        msg = '查询失败！'
    }

    //body 返回数据
    ctx.body = { status, msg, code, resultData:results[0] }
})


/**
 * 获取商品列表接口
 * 
 * @param {pageNo}     页数
 * @param {pageSize}   多少条
 * 
*/
router.post('/list', async (ctx,next) => {
    const { pageNo,pageSize } = ctx.request.body
    let status, msg, results
    try{
        results = await Goods.find({}).skip((parseInt(pageNo)-1) * parseInt(pageSize)).limit(parseInt(pageSize))
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
 * 添加商品接口
 * 
 * @param {imgurl}     图片
 * @param {title}      标题
 * @param {vipprice}   会员价
 * @param {price}      原价
 * @param {content}    内容
 * 
*/

/**
 * 添加数据
 * imgurl:  https://img13.360buyimg.com/n1/jfs/t1/66688/38/8859/528134/5d6b2ef3E89ff93f5/9641270c82b29f00.png
 * title:  【新品上市】OPPO Reno 2 4800万变焦四摄视频防抖 6.5英寸阳光护眼全面屏 海洋之心（8GB+128GB）                
 * vipprice: 2999
 * price:  3200
 * content: <img src="https://img30.360buyimg.com/popWaterMark/jfs/t1/57087/19/9591/72246/5d6d3f80E18fda7a6/7e51ecbd2097e230.jpg">
*/

router.post('/add',async (ctx, next) =>{
    const body = ctx.request.body
    // Goods模型
    const goods = new Goods({
        imgurl: body.imgurl,
        title: body.title,
        vipprice: body.vipprice,
        price: body.price,
        content: body.content,
    })

    let status, msg
    try{
        //保存数据
        await goods.save()
        status = 'ok'
        msg = '添加成功！'
    }catch(e){
        status = 'no'
        msg = '添加失败！'
    }

    //body 返回数据
    ctx.body = { status, msg, resultData:{} }
})

export default router