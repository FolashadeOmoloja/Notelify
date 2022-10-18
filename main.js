let btn2 = document.querySelector("#bt-2");
let dropUp = document.querySelector(".drop-up")
let setIcon = document.querySelector(".set-icon")
let setting = document.querySelector('.setting')
let setIconNote = document.querySelector(".set-icon-note")
let settingNote = document.querySelector('.setting-note')
let getCancelButton = document.querySelector("#cancel")
btn2.addEventListener('click',() => {
    dropUp.style.display = 'block'
});
setIcon.addEventListener('click',() => {
    setting.style.display = 'block'
});
setIconNote.addEventListener('click',() => {
    settingNote.style.display = 'block'
});
getCancelButton.addEventListener('click', () => {
    document.querySelector('.pop-up').style.display = 'none'
})


window.onclick = function (event) {
    if (!event.target.matches('#bt-2')) {
        
            dropUp.style.display = "none";
    }
    
    if (!event.target.matches('.set-icon')) {
        
        setting.style.display = "none";
}
if (!event.target.matches('.set-icon-note')) {
        
    settingNote.style.display = "none";
}
}   

