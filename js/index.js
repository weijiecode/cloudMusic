window.addEventListener('load', function () {
    var topnav = document.querySelector('.nav')
    for (var i = 0; i < topnav.children.length; i++) {
        topnav.children[i].addEventListener('click', function () {
            for (var j = 0; j < topnav.children.length; j++) {
                topnav.children[j].style.color = '';
            }
            this.style.color = 'red';
        })
    }
})