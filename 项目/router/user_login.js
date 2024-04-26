const express = require('express')
const router = express.Router()
const db = require('../database.js')
const jwt = require('jsonwebtoken')
const mytoken = require('./mytoken.js')

function insert_sqlstr(key, value) {
    const str =
        `
    select * from users_1 where ${key}='${value}'
    union
    select * from users_2 where ${key}='${value}'
    union
    select * from users_3 where ${key}='${value}'
    union
    select * from users_4 where ${key}='${value}'
    union
    select * from users_5 where ${key}='${value}'
    union
    select * from users_6 where ${key}='${value}'
    union
    select * from users_7 where ${key}='${value}'
    `
    return str
}

router.post('/register', (req, res) => {
    const userinfo = req.body
    db.query(insert_sqlstr('username', userinfo.username), (err, result) => {
        if (err) res.send({ status: 1, msg: '发生未知错误,请稍后再试' })
        else if (result.length > 0) res.send({ status: 2, msg: '用户名已被占用' })
        else {
            const addstr = `insert into users_${userinfo.group} values(null,'${userinfo.username}','${userinfo.password}','${userinfo.name}',${userinfo.group},${userinfo.gender},${userinfo.age},1)`
            db.query(addstr, (err1, result1) => {
                if (err1) res.send({ status: 3, msg: '注册发生错误,请稍后再试' })
                else if (result1.affectedRows !== 1) res.send({ status: 4, msg: '注册失败,请稍后再试' })
                else res.send({ status: 5, msg: '注册成功!' })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const userinfo = req.body
    db.query(insert_sqlstr('username', userinfo.username), (err, result) => {
        if (err) res.send({ status: 1, msg: '发生未知错误,请稍后再试' })
        else if (result.length === 0) res.send({ status: 2, msg: '用户不存在' })
        else {
            if (result[0].password !== userinfo.password) res.send({ status: 3, msg: '用户名或密码错误' })
            else {
                const tokenstr = jwt.sign({ username: userinfo.username }, mytoken.secretkey, { expiresIn: mytoken.time })
                res.send({ status: 4, msg: '登陆成功!', token: 'Bearer ' + tokenstr })
            }
        }
    })
})

module.exports = router
module.exports.insert_sqlstr = insert_sqlstr