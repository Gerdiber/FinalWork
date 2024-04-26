const tokenstr = localStorage.getItem('MSToken')

const loginbtn = document.querySelector('.loginbtn')
loginbtn.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = 'http://127.0.0.1/page/login.html'
})

const userbtn = document.querySelector('.userbtn')
userbtn.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = 'http://127.0.0.1/page/user.html'
})

const meetingarea = document.querySelector('.meetingarea')
const addmtbtn = document.querySelector('.addmtbtn')

let userpower = 1
let uname = ''

function refleshmtlist() {
    const b = new XMLHttpRequest()
    b.open('GET', 'http://127.0.0.1/pri/getallmt')
    b.setRequestHeader('Authorization', tokenstr)//设置请求头(重要)
    b.send()
    b.onreadystatechange = function () {
        if (b.readyState === 4 && b.status === 200) {
            let result1 = JSON.parse(b.responseText)
            if (result1.length === 0) meetingarea.innerHTML = '<div style="text-align: center;">无会议数据</div>'
            else {
                const mtlist = []
                result1.forEach((value) => {
                    mtlist.unshift({ meeting_name: value.meeting_name, id: value.id })
                })
                const mtliststr = []
                if (userpower === 0) {
                    mtlist.forEach((value) => {
                        mtliststr.push(`
        <div class="mtholder" id=${value.id}>
            <button class="meeting_b" title="${value.meeting_name}">
                <div class="mtname">${value.meeting_name}</div>
            </button>
            <button class="delmtbtn" title="删除该会议数据">X</button>
        </div>
                                `)
                    })
                }
                else {
                    mtlist.forEach((value) => {
                        mtliststr.push(`
        <div class="mtholder" id=${value.id}>
            <button class="meeting_a" title="${value.meeting_name}">
                <div class="mtname">${value.meeting_name}</div>
            </button>
        </div>
                                `)
                    })
                }
                meetingarea.innerHTML = mtliststr.join('')
            }
        }
    }
}

const a = new XMLHttpRequest()
a.open('GET', 'http://127.0.0.1/pri/getinfo')
a.setRequestHeader('Authorization', tokenstr)//设置请求头(重要)
a.send()
a.onreadystatechange = function () {
    if (a.readyState === 4 && a.status === 200) {
        let result = JSON.parse(a.responseText)
        if (result.status === 100) {
            loginbtn.classList.remove('hide')
            userbtn.classList.add('hide')
            meetingarea.innerHTML = '<div style="text-align: center;">请先登录以访问会议数据</div>'
        }
        else {
            loginbtn.classList.add('hide')
            userbtn.classList.remove('hide')
            userbtn.innerHTML = result.name
            uname = result.name
            userpower = result.status
            if (result.status === 0) {
                addmtbtn.classList.remove('hide')
            }
            refleshmtlist()
        }
    }
}

addmtbtn.addEventListener('click', () => {
    const c = new XMLHttpRequest()
    c.open('POST', 'http://127.0.0.1/pri/addmt')
    c.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    c.setRequestHeader('Authorization', tokenstr)//设置请求头(重要)
    c.send(`name=${uname}`)
    c.onreadystatechange = function () {
        if (c.readyState === 4 && c.status === 200) {
            let result = JSON.parse(c.responseText)
            if (result.status === 203) refleshmtlist()
        }
    }
})

meetingarea.addEventListener('click', (e) => {
    const btntype = e.target.getAttribute('class')
    if (btntype === 'meeting_b' || btntype === "meeting_a") {
        localStorage.setItem('mtid', `${e.target.parentNode.getAttribute('id')}`)
        location.href = 'http://127.0.0.1/page/data.html'
    }
    else if (btntype === "delmtbtn") {
        const c = new XMLHttpRequest()
        c.open('POST', 'http://127.0.0.1/pri/delmt')
        c.setRequestHeader('Authorization', tokenstr)//设置请求头(重要)
        c.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        c.send(`id=${e.target.parentNode.getAttribute('id')}`)
        c.onreadystatechange = function () {
            if (c.readyState === 4 && c.status === 200) {
                let result = JSON.parse(c.responseText)
                if (result.status === 206) {
                    refleshmtlist()
                }
            }
        }
    }
})