let Lpage = document.querySelector('.login')//登录页
let Rpage = document.querySelector('.register')//注册页

let ttr = document.querySelector('.turnToR')//转到注册页
ttr.addEventListener('click', function () {
    Lpage.classList.add('hide')
    Rpage.classList.remove('hide')
})
let ttl = document.querySelector('.turnToL')//转到登录页
ttl.addEventListener('click', function () {
    Rpage.classList.add('hide')
    Lpage.classList.remove('hide')
})

let logindata = document.querySelector('.logindata')//登录页信息提交
logindata.addEventListener('submit', function (e) {
    e.preventDefault()
    let ld = new FormData(logindata)//获取表单数据
    let warn = document.querySelector('.lwarn')//登录警告
    if ((ld.get('username') === '') || (ld.get('password') === '')) {
        warn.innerHTML = '用户名,密码不能为空'
        warn.classList.remove('hide')//表单内容为空警告
    }
    else {
        let a = new XMLHttpRequest()
        a.open('POST', 'http://127.0.0.1/open/login')
        a.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')//设置请求头(重要)
        let arr = []
        ld.forEach((value, key) => arr.push(`${key}=${value}`))
        let datastr = arr.join('&')//将foemdata数据拼接成查询字符串(重要)
        a.send(datastr)
        a.onreadystatechange = function () {
            if (a.readyState === 4 && a.status === 200) {
                let result = JSON.parse(a.responseText)
                if (result.status !== 4) {
                    warn.innerHTML = result.msg
                    warn.classList.remove('hide')//账号密码错误警告
                }
                else if (result.status === 4) {
                    alert('登录成功')
                    localStorage.setItem('MSToken', result.token)
                    location.href = 'http://127.0.0.1/page/index.html'
                }
            }
        }
    }
})

let registerdata = document.querySelector('.registerdata')//注册页信息提交
registerdata.addEventListener('submit', function (e) {
    e.preventDefault()
    let rd = new FormData(registerdata)
    let warn = document.querySelector('.rwarn')
    if ((rd.get('name') === '') || (rd.get('username') === '') || (rd.get('password') === '')) {
        warn.innerHTML = '用户名,密码,昵称不能为空'
        warn.classList.remove('hide')
    }
    else {
        let a = new XMLHttpRequest()
        a.open('POST', 'http://127.0.0.1/open/register')
        a.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')//设置请求头(重要)
        let arr = []
        rd.forEach((value, key) => arr.push(`${key}=${value}`))
        let datastr = arr.join('&')//将foemdata数据拼接成查询字符串(重要)
        a.send(datastr)
        a.onreadystatechange = function () {
            if (a.readyState === 4 && a.status === 200) {
                let result = JSON.parse(a.responseText)
                if (result.status === 2) {
                    warn.innerHTML = '用户已存在,注册失败'
                    warn.classList.remove('hide')
                }
                else if (result.status === 5) {
                    alert('注册成功')
                    location.reload(true)
                }
            }
        }
    }
})