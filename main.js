
let btn2 = document.querySelector("#bt-2");
let dropUp = document.querySelector(".drop-up")
let setIcon = document.querySelectorAll(".set-icon")
let setting = document.querySelectorAll('.setting')
let setIconNote = document.querySelector(".set-icon-note")
let settingNote = document.querySelector('.setting-note')
let getCancelButton = document.querySelector("#cancel")
let getCancelButtonNote = document.querySelector('#cancel-note')
let getCreateToDo = document.querySelector("#create-todo")
let getCreateNote = document.querySelector("#create-note")
let saveButton = document.querySelector('.btn-3')
let todoInputArray;
todoInputArray = document.querySelectorAll(".todo-input")
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
//to get the current date
function getDate(){
    let currentDate = new Date(),
    month = months[currentDate.getMonth()],
    day = currentDate.getDate(),
    year = currentDate.getFullYear();
    date = `${month} ${day}, ${year}`
    return date
}
var date= getDate()


function updateHeaderDate(){
    document.querySelector(".header-date").innerHTML = date
}
updateHeaderDate()


const todoArr = []
btn2.addEventListener('click',() => {
    dropUp.style.display = 'block'
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
getCancelButton.addEventListener('click', removePopUp)

function removePopUp () {
    
        document.querySelector('.pop-up').style.display = 'none'
        let div = document.createElement('div')
       
        div.classList.add("pop-up-todo")
        document.querySelector(".todolist").innerHTML = `
        <div class="pop-up-todo">
        <input type="checkbox" class="check-width">
        <input type="text" class="popup-todo todo-input">
      </div>
        `
        //to remove all the todos from the array
        todoArr.splice(0,todoArr.length)
        todoInputArray = document.querySelectorAll(".todo-input")
        todoInputArray.forEach(input => input.addEventListener("keypress",createTodoItem))
    
    
}

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
    event.preventDefault();
  
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

    saveButton.addEventListener('click',show)

    function showSetIcon(elem){

        elem.firstElementChild.style.display = 'block'
        document.addEventListener("click", e => {
            if(e.target.tagName != "I" || e.target != elem) {
                elem.firstElementChild.style.display = 'none'
            }
        });
        
    
    }

    function show(e) {
        e.preventDefault();
        todoArr.push(todoInputArray[todoInputArray.length-1].value)
        showTodo()
    }
    let showTodo = () => {
        let div = document.createElement('div')
        div.classList.add('todo')
        div.innerHTML = `
        <div class="title">
                        <i class="fa-solid fa-lightbulb"></i><span>To-Do</span>
                    </div>
                    <div class="body newClass">
                    </div>
                    <footer class="note-footer">
                        <span>${date}</span>
                        <i class="fa-solid fa-pen-to-square set-icon" onclick="showSetIcon(this)">
                           <div class="setting">
                              <ul>
                                <li id="add"><i class="fa-solid fa-plus"></i>Add</li>
                                <li id="edit"><i class="fa-solid fa-pencil"></i>Edit</li>
                                <li id="delete"><i class="fa-solid fa-trash"></i>Delete</li>
                              </ul>
                           </div>
                        </i>

                    </footer>
        `

        document.querySelector(".notes-todo").appendChild(div)

        for(let i = 0; i < todoArr.length; i++){
            let li = document.createElement('li')
            li.innerHTML = `
            <input type="checkbox" class="check-box">
            <label for="text" id="todo"> ${todoArr[i]}</label>
            `
            let todoBody = document.querySelectorAll(".body")
            todoBody[todoBody.length-1].appendChild(li)
        }

        removePopUp()

    }



    




window.onclick = function (event) {
    if (!event.target.matches('#bt-2')) {
        
            dropUp.style.display = "none";
    }
    
    if (!event.target.matches('.set-icon')) {
        
        setting.forEach(el => el.style.display = "none");
}
if (!event.target.matches('.set-icon-note')) {
        
    settingNote.style.display = "none";
}
}   

