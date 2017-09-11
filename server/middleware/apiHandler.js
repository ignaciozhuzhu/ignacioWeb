/**
 * 统一处理response格式
 * 路由发送数据 统一用 res.data = xxx
 */
const {origin} = require('../../config')

module.exports = function(req,res,next){
    const resData = {
        api:req.originalUrl,       //请求接口
        method:req.method,          //请求方式
        origin,                     //来源
        result:{
            code:"SUCCESS",
            message:""
        },
        data:res.data
    }

    res.status(200).send(resData)

}