const tabBtns = document.querySelectorAll(".tabBtn")
const screenGroup = document.querySelector(".screenGroup")

tabBtns[0].onclick = function() {
    screenGroup.style.marginLeft = 0

    for(let i = 0;i<tabBtns.length;i++) {
        tabBtns[i].classList.remove("active")
    }
    this.classList.add("active")
}

tabBtns[1].onclick = function() {
    screenGroup.style.marginLeft = "-100%"

    for(let i = 0;i<tabBtns.length;i++) {
        tabBtns[i].classList.remove("active")
    }
    this.classList.add("active")
}

tabBtns[2].onclick = function() {
    screenGroup.style.marginLeft = "-200%"

    for(let i = 0;i<tabBtns.length;i++) {
        tabBtns[i].classList.remove("active")
    }
    this.classList.add("active")
}