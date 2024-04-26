const express = require('express')
const { expressjwt: expressjwt } = require('express-jwt')
const mytoken = require('./router/mytoken.js')
const app = express()
//解析表单数据
app.use(express.urlencoded({ extended: false }))
//静态页面资源
app.use(express.static('./res'))
//解析token
app.use(expressjwt({ secret: mytoken.secretkey, algorithms: ['HS256'] }).unless({ path: [/^\/open/] }))

//用户登录注册路由
const userloginRouter = require('./router/user_login.js')
app.use('/open', userloginRouter)
//用户信息查看与修改路由
const userinfoRouter = require('./router/user_info.js')
app.use('/pri', userinfoRouter)
//会议信息路由
const mtRouter = require('./router/meeting.js')
app.use('/pri', mtRouter)

//处理错误
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') res.send({ status: 100, msg: '身份认证失败' })
    else res.send({ status: 114514, msg: '发生未知错误' })
})

//服务器,启动!
app.listen(80, () => {
    console.log('server is running at http://127.0.0.1/page/index.html')
})