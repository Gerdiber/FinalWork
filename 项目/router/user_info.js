const express = require('express')
const router = express.Router()
const db = require('../database.js')
const func = require('./user_login.js')

router.get('/getinfo', (req, res) => {
    db.query(func.insert_sqlstr('username', req.auth.username), (err, result) => {
        res.send(result[0])
    })
})

router.post('/updateinfo', (req, res) => {
    const newdata = req.body
    db.query(`update users_${newdata.group} set password='${newdata.password}',name='${newdata.name}' where username='${newdata.username}'`, (err, result) => {
        if (err) res.send({ status: 101, msg: '更新发生错误,请稍后再试' })
        else if (result.affectedRows !== 1) res.send({ status: 102, msg: '用户数据更新失败' })
        else res.send({ status: 103, msg: '用户数据更新成功' })
    })
})

function getagruop(group, obj) {
    db.query(`select * from users_${group}`, (err, result) => {
        if (!err) {
            obj[group] = result
        }
    })
}
router.get('/getallinfo', (req, res) => {
    const alluser = {}
    getagruop(1, alluser)
    getagruop(2, alluser)
    getagruop(3, alluser)
    getagruop(4, alluser)
    getagruop(5, alluser)
    getagruop(6, alluser)
    getagruop(7, alluser)
    db.query('select * from users_1', () => {
        db.query('select * from users_1', () => {
            res.send(alluser)
        })
    })
})

module.exports = router