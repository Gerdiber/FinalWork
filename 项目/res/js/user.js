const tokenstr = localStorage.getItem('MSToken')

const input = document.querySelectorAll('input')
const btn = document.querySelectorAll('button')

let userinfo

let a = new XMLHttpRequest()
a.open('GET', 'http://127.0.0.1/pri/getinfo')
a.setRequestHeader('Authorization', tokenstr)//设置请求头(重要)
a.send()
a.onreadystatechange = function () {
    if (a.readyState === 4 && a.status === 200) {
        let result = JSON.parse(a.responseText)
        if (result.status === 100) {
            location.href = 'http://127.0.0.1/page/index.html'
        }
        else {
            userinfo = result
            input[0].setAttribute('value', result.username)
            input[1].setAttribute('value', result.password)
            input[2].setAttribute('value', result.name)
            if (result.gender === 1) input[3].setAttribute('value', '男')
            else input[3].setAttribute('value', '女')
            input[4].setAttribute('value', result.age)
            switch (result.gender) {
                case 1: { input[5].setAttribute('value', '前端'); break }
                case 2: { input[5].setAttribute('value', '后台'); break }
                case 3: { input[5].setAttribute('value', '嵌入式'); break }
                case 4: { input[5].setAttribute('value', '移动'); break }
                case 5: { input[5].setAttribute('value', '人工智能'); break }
                case 6: { input[5].setAttribute('value', '图形'); break }
                case 7: { input[5].setAttribute('value', '设计'); break }
            }
        }
    }
}

btn[0].addEventListener('click', (e) => {
    e.preventDefault()
    btn[0].classList.add('hide')
    btn[1].classList.add('hide')
    btn[2].classList.remove('hide')
    btn[3].classList.remove('hide')
    btn[4].classList.add('hide')
    input[1].classList.add('input_update')
    input[2].classList.add('input_update')
    input[1].removeAttribute('readonly')
    input[1].setAttribute('type', 'password')
    input[2].removeAttribute('readonly')
})

btn[1].addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('MSToken')
    location.href = 'http://127.0.0.1/page/index.html'
})

btn[4].addEventListener('click', (e) => {
    e.preventDefault()
    location.href = 'http://127.0.0.1/page/index.html'
})

btn[2].addEventListener('click', (e) => {
    e.preventDefault()
    const infoform = document.querySelector('.infoform')
    const newdata = new FormData(infoform)
    const warn1 = document.querySelector('.warn1')
    if (newdata.get('password') === '' || newdata.get('name') === '') {
        warn1.innerHTML = '密码或昵称不能为空'
    }
    else {
        let b = new XMLHttpRequest()
        b.open('POST', 'http://127.0.0.1/pri/updateinfo')
        b.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')//设置请求头(重要)
        b.setRequestHeader('Authorization', tokenstr)//设置请求头(重要)
        let arr = []
        arr.push(`username=${userinfo.username}`)
        arr.push(`password=${newdata.get('password')}`)
        arr.push(`name=${newdata.get('name')}`)
        arr.push(`group=${userinfo.group}`)
        let datastr = arr.join('&')//将foemdata数据拼接成查询字符串(重要)
        b.send(datastr)
        b.onreadystatechange = function () {
            if (b.readyState === 4 && b.status === 200) {
                let result = JSON.parse(b.responseText)
                if (result.status !== 103) {
                    warn1.innerHTML = result.msg
                }
                else if (result.status === 103) {
                    location.reload(true)
                }
            }
        }
    }
})

btn[3].addEventListener('click', (e) => {
    e.preventDefault()
    location.reload(true)
})