// 获取上一个页面传递的id参数
console.log(location.search)

// 定义歌词对象
let lyric = ''

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
        console.log(window.Lyric)
        console.log(data.lrc.lyric)
        // 根据歌词生成一个lyric对象用来控制歌词的播放
        lyric = new window.Lyric(data.lrc.lyric,function(obj){
            console.log(obj.txt)
            $(".lyric>p").innerText = obj.txt
        })
        console.log(lyric)
    }
)

// $(".disk").addEventListener("click",play)
// // 音频加载完
// function play() {
//     $(".disk").classList.toggle('running')
//     playMusic($("#myAudio"))
// }

// 判断是否加载完全音频
$("#myAudio").onloadedmetadata = function() {
    console.log("加载完成")
    // 歌曲的播放和暂停
    // 判断为暂停则点击后播放
    $(".disk").onclick = function() {
        if($("#myAudio").paused) {
            //开始播放
            $("#myAudio").play()
            $(".disk").classList.toggle('running')
            lyric.play()
        }else {
            // 暂停播放
            $("#myAudio").pause()
            $(".disk").classList.toggle('running')
            lyric.togglePlay()
        }
    }

    // 歌曲播放的时候滑块自动前进
    // ontimeupdate用于表示音频正在播放的状态
    $("#myAudio").ontimeupdate = function() {
        $("#range").value = 100*$("#myAudio").currentTime / $("#myAudio").duration
        console.log($("#range").value)
    }
    // 手动拖动滑块的时候，歌曲跳到对应的时间位置
    // onchange方法是监测input表单的值变化，在鼠标抬起的时候出发
    // oninput方法检测input表单的值变化，但是是实时检测，不用鼠标抬起就能实时多次触发
    $("#range").oninput = function() {
        console.log('值变化了')
        $("#myAudio").currentTime = $("#range").value * $("#myAudio").duration / 100
        lyric.seek($("#myAudio").currentTime*1000)
        $("#myAudio").play()
        $(".disk").classList.remove('running')
        $(".disk").classList.add('running')
    }
}