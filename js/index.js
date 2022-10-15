// let recSongs = [
//     {
//         img: "img/1.jpeg",
//         text: "这是一首好听的歌单这是一首好听的歌1"
//     },
//     {
//         img: "img/1.jpeg",
//         text: "这是一首好听的歌单这是一首好听的歌2"
//     },
//     {
//         img: "img/1.jpeg",
//         text: "这是一首好听的歌单这是一首好听的歌3"
//     },
//     {
//         img: "img/1.jpeg",
//         text: "这是一首好听的歌单这是一首好听的歌4"
//     },
//     {
//         img: "img/1.jpeg",
//         text: "这是一首好听的歌单这是一首好听的歌5"
//     },
//     {
//         img: "img/1.jpeg",
//         text: "这是一首好听的歌单这是一首好听的歌6"
//     }
// ]

// 获取推荐歌单
fetch("http://localhost:3000/personalized?limit=6", {
    method: 'GET',
    mode: 'cors'
}).then(res => res.json()).then(res => {
    console.log(res.result)
    let str = ``
    res.result.forEach(item => {
        str += `
        <div class="rec_item">
            <img src="${item.picUrl}" alt="">
            <p>${item.name}</p>
        </div>
        `
    })
    document.querySelector(".rec").innerHTML = str
})

// 获取推荐音乐
fetch("http://localhost:3000/personalized/newsong", {
    method: "GET",
    mode: "cors"
}).then(res => res.json()).then(res => {
    console.log(res.result)
    let str = ``
    res.result.forEach(item => {
        str += `
        <li>
            <a href="html/play.html?id=${item.id}">
                <p class="songName">${item.name}</p>
                <p class="songInfo">
                    <icon class="sq_icon"></icon>
                    ${getSinger(item.song.artists)}-${item.song.album.name}
                </p>
                <playicon></playicon>
            </a>
        </li>
        `
    })
    document.querySelector(".newSong").innerHTML = str
    document.querySelector(".newSong1").innerHTML = str
})

