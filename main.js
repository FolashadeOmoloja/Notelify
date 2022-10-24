
let btn2 = document.querySelector("#bt-2");
let dropUp = document.querySelector(".drop-up")
let setIcon = document.querySelector(".set-icon")
let setting = document.querySelector('.setting')
let setIconNote = document.querySelector(".set-icon-note")
let settingNote = document.querySelector('.setting-note')
let getCancelButton = document.querySelector("#cancel")
let getCancelButtonNote = document.querySelector('#cancel-note')
let getCreateToDo = document.querySelector("#create-todo")
let getCreateNote = document.querySelector("#create-note")
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
getCreateToDo.addEventListener('click', () => {
    document.querySelector('.pop-up').style.display = 'flex'
})

getCreateNote.addEventListener('click', () => {
    document.querySelector('.pop-up-note').style.display = 'flex'
})
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

getCancelButtonNote.addEventListener('click', () => {
    document.querySelector('.pop-up-note').style.display = 'none'
    let div = document.createElement('div')
   
    div.classList.add("pop-up-box")
    document.querySelector(".notelist").innerHTML = `
    <div class="Note-Title">
    <input type="text" class="Note-title">
</div>
<div class="Note-body"></div>
    <label for="">Write something ...</label>
    <textarea name="notes" class="notes" cols="30" rows="10">
        
    </textarea>
</div>
    `

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
    //you can also use this.value to get the value of the element that trigered the event
    todoArr.push(event.target.value)
 console.log(todoArr)
  

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

