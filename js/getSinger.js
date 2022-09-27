// 获取歌手拼接
const getSinger = (arr) => {
    let singerStr = ``
    arr.forEach(item => {
        singerStr+=item.name+" / "
    });
    singerStr = singerStr.slice(0,singerStr.length-2)
    return singerStr
}