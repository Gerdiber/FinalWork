const express = require('express')
const router = express.Router()
const db = require('../database.js')
const func = require('./user_login.js')
//获取所有会议数据
router.get('/getallmt', (req, res) => {
    db.query('select * from meetings where status=1', (err, result) => {
        res.send(result)
    })
})
//新建会议用函数
function initgrouptime(group, obj) {
    db.query(`select * from users_${group}`, (err, result) => {
        const init = []
        result.forEach(() => { init.push(0) })
        obj['group' + group] = JSON.stringify(init)
    })
}
function getgendernum(gender, obj) {
    db.query(func.insert_sqlstr('gender', gender), (err, result) => {
        obj['gender' + gender] = result.length
    })
}
//新建一个会议
router.post('/addmt', (req, res) => {
    const date = new Date()
    const newmt = {}
    getgendernum(1, newmt)
    getgendernum(0, newmt)
    initgrouptime(1, newmt)
    initgrouptime(2, newmt)
    initgrouptime(3, newmt)
    initgrouptime(4, newmt)
    initgrouptime(5, newmt)
    initgrouptime(6, newmt)
    initgrouptime(7, newmt)
    db.query(func.insert_sqlstr('username', req.auth.username), (err, result1) => {
        db.query(`insert into meetings values(null,1,'新增会议','${newmt.group1}','${newmt.group2}','${newmt.group3}','${newmt.group4}','${newmt.group5}','${newmt.group6}','${newmt.group7}',0,${newmt.gender0 + newmt.gender1},${newmt.gender0 + newmt.gender1},0,${newmt.gender1},${newmt.gender0},' 于 ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()} 更新',${result1[0].group},${result1[0].id})`, (err, result) => {
            if (err) res.send({ ststus: 201, msg: '新增会议数据发生错误' })
            else {
                if (result.affectedRows !== 1) res.send({ ststus: 202, msg: '新增会议数据失败' })
                else res.send({ status: 203, msg: '新增会议数据成功' })
            }
        })
    })
})
//获取一个会议的数据
router.post('/getamt', (req, res) => {
    db.query(`select * from meetings where id=${req.body.id}`, (err, result) => {
        if (err) res.send({ status: 207, msg: '获取该会议数据时发生错误' })
        else {
            if (result.length !== 1) res.send({ status: 208, msg: '未获取到该会议信息' })
            else res.send(result[0])
        }
    })
})
//更新一个会议的数据
router.post('/updatemt', (req, res) => {
    const a = req.body
    db.query(func.insert_sqlstr('username', req.auth.username), (err1, result1) => {
        if (err1) res.send({ status: 212, msg: '获取更新者信息发生错误' })
        else {
            const dbstr = `update meetings set meeting_name='${a.meeting_name}',g1_time='${a.g1_time}',g2_time='${a.g2_time}',g3_time='${a.g3_time}',g4_time='${a.g4_time}',g5_time='${a.g5_time}',g6_time='${a.g6_time}',g7_time='${a.g7_time}',total_time='${a.total_time}',expect_in='${a.expect_in}',total_in='${a.total_in}',total_out='${a.total_out}',male='${a.male}',female='${a.female}',update_info='${a.update}',updater_group='${result1[0].group}',updater_id='${result1[0].id}' where id='${a.id}'`
            db.query(dbstr, (err, result) => {
                if (err) res.send({ status: 209, msg: '更新会议数据发生错误' })
                else {
                    if (result.affectedRows !== 1) res.send({ status: 210, msg: '更新失败' })
                    else res.send({ status: 211, msg: '更新会议数据成功' })
                }
            })
        }
    })
})
//删除一个会议
router.post('/delmt', (req, res) => {
    db.query(`update meetings set status=0 where id=${req.body.id}`, (err, result) => {
        if (err) res.send({ ststus: 204, msg: '删除会议数据发生错误' })
        else {
            if (result.affectedRows !== 1) res.send({ ststus: 205, msg: '删除会议数据失败' })
            else res.send({ status: 206, msg: '删除会议数据成功' })
        }
    })
})

module.exports = router