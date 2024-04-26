const tokenstr = localStorage.getItem('MSToken')
const mtid = localStorage.getItem('mtid')
const backbtn = document.querySelector('.backbtn')
const updateinfo = document.querySelector('.updateinfo')
const mtname = document.querySelector('.mtname')
const mttime = document.querySelector('.mttime')
const mtepin = document.querySelector('.mtepin')
const selbtn = document.querySelector('.seled')
const mtinfoform = document.querySelector('.mtinfoform')
const userlist = document.querySelector('.userlist')
const updatebtn = document.querySelector('.updatebtn')
const savebtn = document.querySelector('.savebtn')
const cancelbtn = document.querySelector('.cancelbtn')
//返回按钮
backbtn.addEventListener('click', () => {
    location.href = 'http://127.0.0.1/page/index.html'
})
//存储所有组的用户的对象
let alluser = {}
//存储当前访问的会议数据的对象
let mtdata = {}
//获取用户信息=>获取所有用户信息=>获取访问的会议的数据
const a = new XMLHttpRequest()
a.open('GET', 'http://127.0.0.1/pri/getinfo')
a.setRequestHeader('Authorization', tokenstr)
a.send()
a.onreadystatechange = function () {
    if (a.readyState === 4 && a.status === 200) {
        const result1 = JSON.parse(a.responseText)
        if (result1.status === 0) updatebtn.classList.remove('hide')
        if (result1.status === 100) location.href = 'http://127.0.0.1/page/index.html'
        else {
            const c = new XMLHttpRequest()
            c.open('GET', 'http://127.0.0.1/pri/getallinfo')
            c.setRequestHeader('Authorization', tokenstr)
            c.send()
            c.onreadystatechange = function () {
                if (c.readyState === 4 && c.status === 200) {
                    alluser = JSON.parse(c.responseText)
                    const b = new XMLHttpRequest()
                    b.open('POST', 'http://127.0.0.1/pri/getamt')
                    b.setRequestHeader('Authorization', tokenstr)
                    b.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    b.send(`id=${mtid}`)
                    b.onreadystatechange = function () {
                        if (b.readyState === 4 && b.status === 200) {
                            const result = JSON.parse(b.responseText)
                            mtdata = result
                            const infoinput = document.querySelectorAll('.infoinput')
                            infoinput[0].setAttribute('value', result.meeting_name)
                            infoinput[1].setAttribute('value', result.total_time)
                            infoinput[2].setAttribute('value', result.expect_in)
                            infoinput[3].setAttribute('value', result.total_in)
                            infoinput[4].setAttribute('value', result.total_out)
                            updateinfo.innerHTML = `${alluser[result.updater_group][result.updater_id - 1].name}${result.update_info}`
                            const malebar = document.querySelector('.male'), femalebar = document.querySelector('.female')
                            let mnum = 0, fnum = 0
                            if (result.total_in !== 0) {
                                mnum = Math.round(result.male * 100 / result.total_in)
                                fnum = Math.round(result.female * 100 / result.total_in)
                            }
                            malebar.style.width = `${mnum}%`
                            femalebar.style.width = `${fnum}%`
                            const mtext = document.querySelector('.Mtext')
                            const ftext = document.querySelector('.Ftext')
                            mtext.innerHTML = `男 ${result.male}人 (${mnum}%)`
                            ftext.innerHTML = `女 ${result.female}人 (${fnum}%)`
                        }
                    }
                }
            }
        }
    }
}
//用户信息显示方式  0仅查看  1可编辑(管理员)
let listmethod = 0
//存储处理出来的userlist的innerHTML
let infohtml = ''
//匹配用函数
function a_match(age, time, mtarr, userarr, strarr, method) {
    const groupstr = [0, '前端', '后台', '嵌入式', '移动', '人工智能', '图形', '设计']
    const colorstr = ['c0', 'c1', 'c2', 'c3', 'c4']
    const userinout = {
        in: ['btn_no', 'btn_yes', ''],
        out: ['btn_yes', 'btn_no', 'hide']
    }
    if (age === 0 && time === -1) {//所有级+所有时长
        userarr.forEach((value) => {
            if (value.id <= mtarr.length) {
                let atime = mtarr[value.id - 1]
                if (atime < 0) atime = 0
                else if (atime < 10) atime = 1
                else if (atime < 30) atime = 2
                else if (atime < 50) atime = 3
                else atime = 4
                let edit
                if (atime === 0) edit = userinout.out
                else edit = userinout.in
                if (method === 0) {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}" readonly="readonly" value="${mtarr[value.id - 1]}">
                </div>
                    `)
                }
                else {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <button class="outbtn ${edit[0]}" id="outbtn">缺勤</button>
                    <button class="inbtn ${edit[1]}" id="inbtn">出勤</button>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}"
                    value="${mtarr[value.id - 1]}" oninput="if(this.value.length>5) this.value=this.value.slice(0,5)">
                </div>
                    `)
                }
            }
        });
    }
    else if (time === -1) {//所有级
        userarr.forEach((value) => {
            if (value.id <= mtarr.length && value.age === age) {
                let atime = mtarr[value.id - 1]
                if (atime < 0) atime = 0
                else if (atime < 10) atime = 1
                else if (atime < 30) atime = 2
                else if (atime < 50) atime = 3
                else atime = 4
                let edit
                if (atime === 0) edit = userinout.out
                else edit = userinout.in
                if (method === 0) {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}" readonly="readonly" value="${mtarr[value.id - 1]}">
                </div>
                    `)
                }
                else {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <button class="outbtn ${edit[0]}" id="outbtn">缺勤</button>
                    <button class="inbtn ${edit[1]}" id="inbtn">出勤</button>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}"
                    value="${mtarr[value.id - 1]}" oninput="if(this.value.length>5) this.value=this.value.slice(0,5)">
                </div>
                    `)
                }
            }
        });
    }
    else if (age === 0) {//所有组
        userarr.forEach((value) => {
            let atime = mtarr[value.id - 1]
            if (atime < 0) atime = 0
            else if (atime < 10) atime = 1
            else if (atime < 30) atime = 2
            else if (atime < 50) atime = 3
            else atime = 4
            if (value.id <= mtarr.length && atime === time) {
                let edit
                if (atime === 0) edit = userinout.out
                else edit = userinout.in
                if (method === 0) {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}" readonly="readonly" value="${mtarr[value.id - 1]}">
                </div>
                    `)
                }
                else {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <button class="outbtn ${edit[0]}" id="outbtn">缺勤</button>
                    <button class="inbtn ${edit[1]}" id="inbtn">出勤</button>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}"
                    value="${mtarr[value.id - 1]}" oninput="if(this.value.length>5) this.value=this.value.slice(0,5)">
                </div>
                    `)
                }
            }
        });
    }
    else {
        userarr.forEach((value) => {
            let atime = mtarr[value.id - 1]
            if (atime < 0) atime = 0
            else if (atime < 10) atime = 1
            else if (atime < 30) atime = 2
            else if (atime < 50) atime = 3
            else atime = 4
            if (value.id <= mtarr.length && atime === time && value.age === age) {
                let edit
                if (atime === 0) edit = userinout.out
                else edit = userinout.in
                if (method === 0) {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}" readonly="readonly" value="${mtarr[value.id - 1]}">
                </div>
                    `)
                }
                else {
                    strarr.push(`
                <div class="userbar ${colorstr[atime]}">
                    <div class="username" title="${value.name}">[${value.age}级][${groupstr[value.group]}组]${value.name}</div>
                    <button class="outbtn ${edit[0]}" id="outbtn">缺勤</button>
                    <button class="inbtn ${edit[1]}" id="inbtn">出勤</button>
                    <input type="number" class="usertime ${edit[2]}" name="${value.group}_${value.id}"
                    value="${mtarr[value.id - 1]}" oninput="if(this.value.length>5) this.value=this.value.slice(0,5)">
                </div>
                    `)
                }
            }
        });
    }
}
//匹配会议信息函数
function match(age, group, time, method) {
    const strarr = []
    if (group === 0) {
        const mtobj = {
            g1: JSON.parse(mtdata['g1_time']),
            g2: JSON.parse(mtdata['g2_time']),
            g3: JSON.parse(mtdata['g3_time']),
            g4: JSON.parse(mtdata['g4_time']),
            g5: JSON.parse(mtdata['g5_time']),
            g6: JSON.parse(mtdata['g6_time']),
            g7: JSON.parse(mtdata['g7_time'])
        }
        a_match(age, time, mtobj.g1, alluser['1'], strarr, method)
        a_match(age, time, mtobj.g2, alluser['2'], strarr, method)
        a_match(age, time, mtobj.g3, alluser['3'], strarr, method)
        a_match(age, time, mtobj.g4, alluser['4'], strarr, method)
        a_match(age, time, mtobj.g5, alluser['5'], strarr, method)
        a_match(age, time, mtobj.g6, alluser['6'], strarr, method)
        a_match(age, time, mtobj.g7, alluser['7'], strarr, method)
    }
    else {
        a_match(age, time, JSON.parse(mtdata[`g${group}_time`]), alluser[`${group}`], strarr, method)
    }
    infohtml = strarr.join('')
}
//信息模块选择按钮
selbtn.addEventListener('click', (e) => {
    e.preventDefault()
    const sel = new FormData(mtinfoform)
    match(+sel.get('sel_age'), +sel.get('sel_group'), +sel.get('sel_time'), listmethod)
    if (infohtml === '') userlist.innerHTML = '<div style="text-align: center;">无数据</div>'
    else userlist.innerHTML = infohtml
})
//信息列表按钮(管理员)
userlist.addEventListener('click', (e) => {
    e.preventDefault()
    const a = e.target
    const btntype = a.getAttribute('id')
    if (btntype === 'outbtn') {
        a.classList.toggle('btn_no')
        a.classList.toggle('btn_yes')
        a.nextElementSibling.classList.toggle('btn_yes')
        a.nextElementSibling.classList.toggle('btn_no')
        a.nextElementSibling.nextElementSibling.style.visibility = 'hidden'
        a.nextElementSibling.nextElementSibling.setAttribute('value', '-1')
    }
    else if (btntype === 'inbtn') {
        a.classList.toggle('btn_no')
        a.classList.toggle('btn_yes')
        a.previousElementSibling.classList.toggle('btn_yes')
        a.previousElementSibling.classList.toggle('btn_no')
        a.nextElementSibling.style.visibility = 'visible'
        const namestr = a.nextElementSibling.getAttribute('name')
        const utime = JSON.parse(mtdata[`g${namestr[0]}_time`])[namestr.slice(2) - 1]
        if (utime < 0) a.nextElementSibling.setAttribute('value', 0)
        else a.nextElementSibling.setAttribute('value', utime)
    }
})
//更改按钮
updatebtn.addEventListener('click', (e) => {
    updatebtn.classList.add('hide')
    savebtn.classList.remove('hide')
    cancelbtn.classList.remove('hide')
    mtname.classList.add('editable')
    mttime.classList.add('editable')
    mtepin.classList.add('editable')
    mtname.removeAttribute('readonly')
    mttime.removeAttribute('readonly')
    mtepin.removeAttribute('readonly')
    listmethod = 1
    selbtn.click()
})
//取消按钮
cancelbtn.addEventListener('click', () => {
    updatebtn.classList.remove('hide')
    savebtn.classList.add('hide')
    cancelbtn.classList.add('hide')
    mtname.value = mtdata.meeting_name
    mttime.value = mtdata.total_time
    mtepin.value = mtdata.expect_in
    mtname.classList.remove('editable')
    mttime.classList.remove('editable')
    mtepin.classList.remove('editable')
    mtname.setAttribute('readonly', 'readonly')
    mttime.setAttribute('readonly', 'readonly')
    mtepin.setAttribute('readonly', 'readonly')
    listmethod = 0
    selbtn.click()
})
//保存按钮
savebtn.addEventListener('click', () => {
    const date = new Date()
    let male = 0, female = 0, gnum = 0
    const dataobj = {
        g1_time: JSON.parse(mtdata.g1_time),
        g2_time: JSON.parse(mtdata.g2_time),
        g3_time: JSON.parse(mtdata.g3_time),
        g4_time: JSON.parse(mtdata.g4_time),
        g5_time: JSON.parse(mtdata.g5_time),
        g6_time: JSON.parse(mtdata.g6_time),
        g7_time: JSON.parse(mtdata.g7_time)
    }
    const allusernum = dataobj.g1_time.length + dataobj.g2_time.length + dataobj.g3_time.length + dataobj.g4_time.length + dataobj.g5_time.length + dataobj.g6_time.length + dataobj.g7_time.length

    const saveinfo = new FormData(mtinfoform)
    const infoobj = {}
    saveinfo.forEach((value, key) => infoobj[key] = value)
    delete infoobj.sel_age
    delete infoobj.sel_group
    delete infoobj.sel_time

    dataobj.meeting_name = infoobj.meeting_name
    if (infoobj.total_time < 0) dataobj.total_time = 0
    else dataobj.total_time = infoobj.total_time
    if (infoobj.expect_in < 0) dataobj.expect_in = 0
    else if (infoobj.expect_in > allusernum) dataobj.expect_in = allusernum
    else dataobj.expect_in = infoobj.expect_in
    delete infoobj.meeting_name
    delete infoobj.total_time
    delete infoobj.expect_in
    delete infoobj.total_in
    delete infoobj.total_out
    Object.keys(infoobj).forEach((key) => {
        if (infoobj[key] < 0) dataobj[`g${key[0]}_time`][key.slice(2) - 1] = -1
        else dataobj[`g${key[0]}_time`][key.slice(2) - 1] = infoobj[key]
    })

    const datastrarr = []
    Object.keys(dataobj).forEach((key) => {
        if (typeof dataobj[key] === 'string' || typeof dataobj[key] === 'number') datastrarr.push(`${key}=${dataobj[key]}`)
        else {
            datastrarr.push(`${key}=${JSON.stringify(dataobj[key])}`)
            gnum++
            dataobj[key].forEach((value, index) => {
                if (value >= 0) {
                    if (alluser[gnum][index].gender === 1) male++
                    else female++
                }
            })
        }
    })
    datastrarr.push(`male=${male}`)
    datastrarr.push(`female=${female}`)
    datastrarr.push(`total_in=${male + female}`)
    datastrarr.push(`total_out=${allusernum - male - female}`)
    datastrarr.push(`update= 于 ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()} 更新`)
    datastrarr.push(`id=${mtid}`)
    const datastr = datastrarr.join('&').replaceAll(`"`, ``)
    const d = new XMLHttpRequest()
    d.open('POST', 'http://127.0.0.1/pri/updatemt')
    d.setRequestHeader('Authorization', tokenstr)
    d.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    d.send(datastr)
    d.onreadystatechange = function () {
        if (d.readyState === 4 && d.status === 200) {
            const result = JSON.parse(d.responseText)
            if (result.status === 211) location.reload(true)
        }
    }
})