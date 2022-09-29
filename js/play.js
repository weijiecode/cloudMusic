// 获取上一个页面传递的id参数
console.log(location.search)

// 获取歌曲的音频地址
fetch("http://localhost:3000/song/url"+location.search).then(
    data => data.json()
).then(
    data => {
        console.log(data.data[0].url)
        // 可以直接使用标签，属性的方式进行设置
        $("#myAudio").src = data.data[0].url
    }
)

// 获取歌曲名、歌曲专辑
fetch("http://localhost:3000/song/detail?ids="+location.search.slice(4)).then(
    data => data.json()
).then(
    data => {
        console.log(data)
        $("#diskImg").src = data.songs[0].al.picUrl+"?param=200y200"
        $("#bgImg").src = data.songs[0].al.picUrl+"?param=200y200"
        $(".songName").innerHTML = data.songs[0].al.name
    }
)

// 获取歌词
fetch("http://localhost:3000/lyric"+location.search).then(
    data => data.json()
).then(
    data => {
        console.log(data.lrc.lyric)
    }
)

$(".disk").addEventListener("click",play)
// 音频加载完
function play() {
    $(".disk").classList.toggle('running')
    playMusic($("#myAudio"))
}

// 判断是否加载完全音频
$("#myAudio").onloadedmetadata = function() {
    console.log("加载完成")
}