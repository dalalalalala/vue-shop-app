import Router from 'koa-router'
import Jwt from 'jsonwebtoken'
import Redis from 'koa-redis'

//获取redis客户端
const Store = new Redis().client

import Users from '../dbs/models/users'

const secret = 'boxuegu.com'
let router = new Router({prefix:'/users'})
/**
 * 登录接口
 * 
 * @param {username} 用户名、手机号
 * @param {password} 密码
 * 
*/

router.post('/login', async(ctx,next) =>{
    const { username,password } = ctx.request.body
    let status, msg, code, token, loginData

    /**
     * code
     * 001 登录成功
     * 002 登录失败
     * 003 用户不存在
     * 004 密码不正确
    */

    try{
        //查询用户名
        loginData = await Users.find({username: username})
        if(!!loginData && loginData.length != 0){
            if(loginData[0].password === password){
                let userToken = {
                    name: username
                }
                const redisStore = await Store.get(username);
                if(redisStore){
                    //验证
                    Jwt.verify(redisStore,secret, (err) =>{
                        if(err){
                            if(err.name == 'TokenExpiredError'){
                                //生成token
                                token = Jwt.sign(userToken, secret, {expiresIn: '2h'})
                                // 存储token
                                Store.set(username, token)
                            }
                        }else{
                            token = redisStore
                        }
                    })
                }else{
                    //生成token
                    token = Jwt.sign(userToken, secret, {expiresIn: '2h'})
                    // 存储token
                    Store.set(username, token)
                }

                status = 'ok',
                code = '001'
                msg = '登录成功！'
            }else{
                status = 'no',
                code = '004'
                msg = '密码不正确'
            }
        }else{
            status = 'no',
            code = '003'
            msg = '用户不存在'
        }
    }catch(e){
        status = 'no',
        code = '002'
        msg = '登录失败'
    }

    //body 返回数据
    ctx.body = { status, msg, token, resultData:loginData }
})


/**
 * 注册接口
 * 
 * @param {username} 用户名
 * @param {password} 密码
 * 
*/

router.post('/reg',async (ctx, next) =>{
    const body = ctx.request.body
    // Users模型
    const users = new Users({
        username: body.username,
        password: body.password,
    })

    let status, msg
    try{
        //保存数据
        await users.save()
        status = 'ok'
        msg = '注册成功！'
    }catch(e){
        status = 'no'
        msg = '注册失败！'
    }

    //body 返回数据
    ctx.body = { status, msg, resultData:{} }
})

export default router