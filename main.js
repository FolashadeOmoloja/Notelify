let btn2 = document.querySelector("#bt-2");
let dropUp = document.querySelector(".drop-up")
btn2.addEventListener('click',displaybtn2);

function displaybtn2(){
    dropUp.style.display = 'block'
}

window.onclick = function (event) {
    if (!event.target.matches('#bt-2')) {
        
            dropUp.style.display = "none";
    }
}   