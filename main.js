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

/* .sam{
    background-color: white;
    padding: 20px;
    color: black;
    display: flex;
}

.sam input{
    background-color: white;
    outline: none;
    font-size: 16px;
    height: 17px;
    width: 500px;
    border: none;
} */