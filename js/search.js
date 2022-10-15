// 第一种：持续性监听输入框的焦点事件
// $("#searchInput").oninput = function (e) {
//     console.log("获取焦点成功")
//     if ($("#searchInput").value != "") {
//         console.log("不等于为空")
//         // 判断是否输入回车键
//         console.log(e)
//         console.log(e.target)
//         if (回车) {
//             展示第二个界面
//         } else {
//             展示第三个界面
//         }
//     } else { }
// }



// 存储歌手
let singerArr

// 第二种：瞬间动作监听 可以使用键盘事件的keycode判断
$("#searchInput").onkeyup = function (e) {
    console.log(e)
    if ($("#searchInput").value != "") {
        // 展示搜索推荐页或者结果页
        if (e.keyCode == 13) {
            // 按下了回车 展示结果页
            $(".searchDefault").style.display = 'none'
            $(".searchRec").style.display = 'none'
            $(".searchResult").style.display = 'block'
            // 离线存储数据
            // 判断是否有离线存储
            singerArr = JSON.parse(localStorage.getItem("singer") || [])
            // 判断是否有重复
            if (!singerArr.includes($("#searchInput").value)) {
                singerArr.push($("#searchInput").value)
                localStorage.setItem('singer', JSON.stringify(singerArr))
            }
            // 按下回车重新调用一次
            readData()
            // 发起两个搜索请求
            function getSongList() {
                return axios.get("http://localhost:3000/cloudsearch?keywords=" + $('#searchInput').value)
            }
            function singerInfo() {
                return axios.get("http://localhost:3000/search/multimatch?keywords=" + $('#searchInput').value)
            }
            axios.all([getSongList(), singerInfo()]).then(
                axios.spread(function (songlist, singinfo) {
                    console.log(songlist)
                    console.log(singinfo)
                    let listStr = ``
                    songlist.data.result.songs.forEach(item => {
                        listStr += `
                                    <li>
                                            <a href="html/play.html?id=${item.id}">
                                                <p class="songName">${item.name}</p>
                                                <p class="songInfo">
                                                    <icon class="sq_icon"></icon>
                                                    ${getSinger(item.ar)} -${item.al.name}
                                                </p>
                                                <playicon></playicon>
                                            </a>
                                        </li>`
                    })
                    $('.searchResult>ul').innerHTML = listStr
                })
            )
        } else {
            // 按下其它 展示搜索推荐页
            $(".searchDefault").style.display = 'none'
            $(".searchRec").style.display = 'block'
            $(".searchResult").style.display = 'none'
            axios.get(`http://localhost:3000/search/suggest?keywords=${$("#searchInput").value}&type=mobile`).then(data => {
                console.log(data)
                let str = ``
                data.data.result.allMatch.forEach(item => {
                    str += `
                    <li>
                        <span>${item.keyword}<span>
                    </li>`
                })
                $('.searchRec>ul').innerHTML = str
            })
        }
    } else {
        // 展示默认搜索页
        $(".searchDefault").style.display = 'block'
        $(".searchRec").style.display = 'none'
        $(".searchResult").style.display = 'none'
    }
}

// 使用axios请求热门搜索关键词数据
axios.get("http://localhost:3000/search/hot").then(data => {
    console.log(data)
    let str = ``
    data.data.result.hots.forEach(item => {
        str += `<span>${item.first}</span>`
    })
    $(".search_hot").innerHTML = str

})

// 删除指定缓存
function del(index) {
    console.log('删除')
    let arr = JSON.parse(localStorage.getItem("singer"))
    arr.splice(index, 1)
    localStorage.setItem("singer", JSON.stringify(arr))
    readData()
}

// 读取离线存储的方法
function readData() {
    let data = JSON.parse(localStorage.getItem('singer'))
    console.log(data)
    let str = ``
    data.forEach((item, index) => {
        str += `
        <li>
        <span>${item}</span>
        <span class="delbtn" onclick="del(${index})">✖️</span>
        </li>`
    })
    $(".search_value>ul").innerHTML = str
}

readData()

