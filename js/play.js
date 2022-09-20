const disk = document.querySelector(".disk")

disk.addEventListener("click",play)

function play() {
    console.log('play')
    disk.classList.toggle('running')
}