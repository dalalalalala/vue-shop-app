import Jwt from 'jsonwebtoken'
const secret = 'boxuegu.com'

const checkToken = (ctx ,next ) =>{
    let token = ctx.headers['authorization']
    if(!token){
        ctx.body = {
            status : 'no',
            code : 401,
            msg : 'token不能为空'
        }
    }else{
        Jwt.verify(token, secret, async (err)=>{
            if(err){
                let msg
                if(err.name = 'TokenExpiredError'){
                    msg = 'token已过期';
                }else{
                    msg = 'token失效'
                }
                ctx.body = {
                    status : 'no',
                    code : 401,
                    msg
                }
            }
        })
    }
}

export default checkToken