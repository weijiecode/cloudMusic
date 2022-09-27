const tabBtns = document.querySelectorAll(".tabBtn")
const screenGroup = document.querySelector(".screenGroup")


function changeTabs(obj,ml){
    obj.onclick = function() {
        screenGroup.style.marginLeft = ml
    
        for(let i = 0;i<tabBtns.length;i++) {
            tabBtns[i].classList.remove("active")
        }
        this.classList.add("active")
    }
}

for(i=1;i<=tabBtns.length;i++){
    changeTabs(tabBtns[i-1],(i*-100+100+"%"))
}