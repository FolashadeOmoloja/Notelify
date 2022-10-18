/*
To do
refractor code
 */

let btn2 = document.querySelector("#bt-2");
let dropUp = document.querySelector(".drop-up")
let setIcon = document.querySelector(".set-icon")
let setting = document.querySelector('.setting')
let setIconNote = document.querySelector(".set-icon-note")
let settingNote = document.querySelector('.setting-note')
let getCancelButton = document.querySelector("#cancel")
let getCreateToDo = document.querySelector("#create-todo")
let todoInputArray;
todoInputArray = document.querySelectorAll(".todo-input")

const todoArr = []
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
    let div = document.createElement('div')
   
    div.classList.add("pop-up-todo")
    document.querySelector(".todolist").innerHTML = `
    <div class="pop-up-todo">
    <input type="checkbox" class="check-width">
    <input type="text" class="popup-todo todo-input">
  </div>
    `
    todoInputArray = document.querySelectorAll(".todo-input")
    todoInputArray.forEach(input => input.addEventListener("keypress",createTodoItem))
})
getCreateToDo.addEventListener('click', () => {
    document.querySelector('.pop-up').style.display = 'flex'
})
//to trigger an event when you click enter
todoInputArray.forEach(input => input.addEventListener("keypress",createTodoItem))

function createTodoItem  (event) {
    if (event.key === "Enter") { // key code of the keybord key.
    event. preventDefault();
  
    let div = document.createElement('div')
   
    div.innerHTML = `
    <input type="checkbox" class="check-width">
    <input type="text" class="popup-todo todo-input">
    `
    div.classList.add("pop-up-todo")
    document.querySelector(".todolist").appendChild(div)
    todoInputArray = document.querySelectorAll(".todo-input")
    todoInputArray[todoInputArray.length-1].focus()
    todoInputArray.forEach(input => input.addEventListener("keypress",createTodoItem))
    // console.log(todoInputArray)

    }

    }




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

