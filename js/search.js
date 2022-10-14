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
let singerArr = []

// 第二种：瞬间动作监听 可以使用键盘事件的keycode判断
$("#searchInput").onkeyup = function (e) {
    console.log(e)
    if ($("#searchInput").value != "") {
        // 展示搜索推荐页或者结果页
        if(e.keyCode == 13){
            // 按下了回车 展示结果页
            $(".searchDefault").style.display='none'
            $(".searchRec").style.display='none'
            $(".searchResult").style.display='block'
            // 离线存储数据
            singerArr.push($("#searchInput").value)
            localStorage.setItem('singer', JSON.stringify(singerArr))
        }else {
            // 按下其它 展示搜索推荐页
            $(".searchDefault").style.display='none'
            $(".searchRec").style.display='block'
            $(".searchResult").style.display='none'
        }
    }else {
        // 展示默认搜索页
        $(".searchDefault").style.display='block'
        $(".searchRec").style.display='none'
        $(".searchResult").style.display='none'
    }
}

// 使用axios请求热门搜索关键词数据
axios.get("http://localhost:3000/search/hot").then( data => {
    let str =  ``
    data.data.result.hots.forEach( item => {
        str += `<span>${item.first}</span>`
    })
    $(".search_hot").innerHTML = str

})

// 读取离线存储的方法
function readData() {
    let data = JSON.parse(localStorage.getItem('singer'))
    console.log(data)
    let str = ``
    data.forEach( item => {
        str += `
        <li>
        <span>${item}</span>
        <span>✖️</span>
        </li>`
    })
    $(".search_value>ul").innerHTML = str
}

readData()