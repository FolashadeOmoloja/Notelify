
let btn2 = document.querySelector("#bt-2");
let dropUp = document.querySelector(".drop-up")
let setIcon = document.querySelectorAll(".set-icon")
let setting = document.querySelectorAll('.setting')
let settingNote = document.querySelector('.setting-note')
let getCancelButton = document.querySelector("#cancel")
let getCancelButtonNote = document.querySelectorAll('#cancel-note')
let getCreateToDo = document.querySelector("#create-todo")
let getCreateNote = document.querySelector("#create-note")
let saveButton = document.querySelector('.btn-3')
let saveButtonNote = document.querySelector('.btn-4')
let saveEditNote = document.querySelector('.btn-5')
let saveEditTodo =document.querySelector('.btn-8')
let deleteNote = document.querySelector('.btn-6')
let deleteTodo = document.querySelector('.btn-9')
let title;
let noteInput;
let todoInputArray;
todoInputArray = document.querySelectorAll(".todo-input")
let noteInfo;
let todoInfo;
const todoArr = []
const Notes = JSON.parse(localStorage.getItem("notesArr") || "[]");
const todos = JSON.parse(localStorage.getItem("TodoList") || "[]")
const Titlearr = JSON.parse(localStorage.getItem("Titlearr") || "[]")


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



btn2.addEventListener('click',() => {
    dropUp.style.display = 'block'
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
        addEventToTodoInput()
    
    
}

function addEventToTodoInput(){
    todoInputArray = document.querySelectorAll(".todo-input")
    todoInputArray.forEach(input => input.addEventListener("keypress",createTodoItem))
}
function removePopUpNote(){
    document.querySelector('.pop-up-note').style.display = 'none'
    let div = document.createElement('div')
       
    div.classList.add("inner-div-note")
    document.querySelector(".notelist").innerHTML = `
    <div class="Note-Title">
        <input type="text" class="Note-title">
    </div>
    <div class="Note-body"></div>
        <label for="">Write something ...</label>
        <textarea name="notes" class="notes" cols="30" rows="10">
    
        </textarea>
    </div>`
}

function removeDeletePopUp(){
    document.querySelector('.pop-up-delete').style.display = "none"
}

let cancelDelete = document.querySelector('.btn-7')
cancelDelete.addEventListener('click',removeDeletePopUp)

getCancelButtonNote.forEach(el => el.addEventListener('click', () => {
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
}))



//to trigger an event when you click enter
todoInputArray.forEach(input => input.addEventListener("keydown",createTodoItem))

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
    todoInputArray.forEach(input => input.addEventListener("keydown",createTodoItem))
    //you can also use this.value to get the value of the element that trigered the event
    todoArr.push(event.target.value)
  
  

   }
//deleting the todo
   else if (event.keyCode === 46) { // key code of the delete key.
    event.preventDefault();
    let todoArrIndex = todoArr.indexOf(event.target.value)
    todoArr.splice(todoArrIndex,1)
     event.target.parentElement.remove()
     
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
        document.querySelectorAll(".todo").forEach(div => div.remove());
        window.location.reload();
        todoArr.push(todoInputArray[todoInputArray.length-1].value)
        pushToLocalStorageTodo()
        showTodo()
        // window.location.reload();
    }

    function pushToLocalStorageTodo(){

        
        todoInfo = {todoArr,date}
        //local storage
         todos.push(todoInfo)
        Titlearr.push('To-Do')
        localStorage.setItem("TodoList", JSON.stringify(todos));
        localStorage.setItem("Titlearr", JSON.stringify(Titlearr));
    }

    function showTodo() {
        if(!todos) return;
      
        todos.forEach((todo, id) =>{
        let div = document.createElement('div')
        div.classList.add('todo')
        div.innerHTML = `
        <div class="title">
                        <i class="fa-solid fa-lightbulb"></i><span class="title-value">To-Do</span>
                    </div>
                    <div class="body newClass">
                    </div>
                    <footer class="note-footer">
                        <span>${todo.date}</span>
                        <i class="fa-solid fa-pen-to-square set-icon" onclick="showSetIcon(this)">
                           <div class="setting">
                              <ul>
                                <li id="edit" onclick="editTodo('${id}', '${todo.todoArr}')"><i class="fa-solid fa-pencil" ></i>Edit</li>
                                <li id="delete" onclick="deleteAllTodos('${id}')"><i class="fa-solid fa-trash"></i>Delete</li>
                              </ul>
                           </div>
                        </i>

                    </footer>
                   
        `
   

        document.querySelector(".notes-todo").appendChild(div)
        for(let i = 0; i < todo.todoArr.length; i++){
            let li = document.createElement('li')
            li.innerHTML = `
            <input type="checkbox" class="check-box">
            <label for="text" id="todo"> ${todo.todoArr[i]}</label>
            `
            let todoBody = document.querySelectorAll(".body")
            todoBody[todoBody.length-1].appendChild(li)
        }
     
        removePopUp()


    })}

    //editing Todos
    function editTodo(todoId,todoArray){
    
        saveEditTodo.style.display = 'block'
        saveButton.style.display = 'none'
        oldTodos = todoArray.split(",")
        getCreateToDo.click()
        oldTodos.forEach(el => todoArr.push(el))
        
        for(let i = 0; i < todoArr.length; i++){
             let div = document.createElement('div')
            
             div.innerHTML = `
             <input type="checkbox" class="check-width">
             <input type="text" class="popup-todo todo-input">
             `
             div.classList.add("pop-up-todo")
             document.querySelector(".todolist").appendChild(div)
             let arrOfTodos = document.querySelectorAll('.todo-input')
             arrOfTodos[i].value =todoArr[i]
         
        }
        addEventToTodoInput()
  
        //pushing edits to local storage
     
        saveEditTodo.addEventListener('click',(e)=>{
            e.preventDefault()
            todoArr.push(todoInputArray[todoInputArray.length-1].value)
            todoInfo = {todoArr,date}
            todos.splice(todoId,1,todoInfo)
            // todos[todoId] = todoInfo
            localStorage.setItem("TodoList", JSON.stringify(todos));
            removePopUp()
            window.location.reload();
      })
    }

    //deleting entire todolist

    function deleteAllTodos(todoId){
            document.querySelector('.btn-6').style.display ='none'
            document.querySelector('.btn-9').style.display ='block'
            document.querySelector('#comfirmDel').innerHTML = 'Are you sure want to Delete this To-Do?'
            document.querySelector('.pop-up-delete').style.display = 'flex'
            deleteTodo.addEventListener('click',(e)=>{
                e.preventDefault()
                todos.splice(todoId,1)
                localStorage.setItem("TodoList", JSON.stringify(todos));
                removeDeletePopUp()
                window.location.reload();
            })
        
          
         
    }
    
   

    //show note
    saveButtonNote.addEventListener('click',showNote)
    function showNote(e){
        // e.preventDefault();
        pushToLocalStorage()
        createShowNote()
        window.location.reload();
    }

    function pushToLocalStorage(){
        document.querySelectorAll(".todo").forEach(div => div.remove());

        title = document.querySelector('.Note-title').value
        let noteInputText = document.querySelector('.notes').value
         noteInput = noteInputText.replaceAll(/\n\r?/g, `<br>`)
        noteInfo = {title,noteInput,date}
        //local storage
        Notes.push(noteInfo)
        Titlearr.push(title)
        localStorage.setItem("notesArr", JSON.stringify(Notes));
        localStorage.setItem("Titlearr", JSON.stringify(Titlearr));
    }

    function createShowNote(){
    
        
        if(!Notes) return;
        document.querySelectorAll(".todo").forEach(div => div.remove());
        //local storage
        Notes.forEach((note, id) =>{
        let div = document.createElement('div')
        div.classList.add('todo')
        div.innerHTML = `
        <div class="title">
        <i class="fa-solid fa-bookmark"></i><span class="note-title title-value">${note.title}</span>
        </div>
        <div class="body">
            <p id="text">${note.noteInput}</p>
        </div>
        <footer class="note-footer">
            <span>${note.date}</span>
            <i class="fa-solid fa-pen-to-square set-icon-note" onclick="showSetIcon(this)">
               <div class="setting-note"><ul>
               <li id="edit-note" onclick="editNote( '${id}' , '${note.title}' ,'${note.noteInput}')" ><i class="fa-solid fa-pencil"></i>Edit</li>
               <li id="delete-note" onclick="deleteNotes(${id})"><i class="fa-solid fa-trash"></i>Delete</li></ul>
            </div>
            </i>

        </footer>
    
            `
        
        document.querySelector(".notes-todo").appendChild(div)
        removePopUpNote()
            
    })}
    // createShowNote()

    function showContent(){
      
        createShowNote()
        showTodo()
    }
    showContent()

    //editing/updating Notes

const editNote = (noteId,titleTag, noteInput) => {
    saveButtonNote.style.display = 'none'
    saveEditNote.style.display = 'block'
    document.querySelector('.pop-up-note').style.display = 'flex'
    document.querySelector('.Note-title').value = titleTag
    document.querySelector('.notes').value = noteInput.replaceAll('<br>', '\n\r')
    saveEditNote.addEventListener('click',(e)=>{
        e.preventDefault()
        title = document.querySelector('.Note-title').value
        noteInput = document.querySelector('.notes').value.replaceAll(/\n\r?/g, `<br>`)
        noteInfo = {title,noteInput,date}
        Notes.splice(noteId,1,noteInfo)
        localStorage.setItem("notesArr", JSON.stringify(Notes));
        removePopUpNote()
        window.location.reload();
  })
  
}

 //deleting Notes

 function deleteNotes(noteId){
    document.querySelector('.pop-up-delete').style.display = 'flex'
    deleteNote.addEventListener('click',(e)=>{
        e.preventDefault()
        Notes.splice(noteId,1)
        localStorage.setItem("notesArr", JSON.stringify(Notes));
        removeDeletePopUp()
        window.location.reload();
    })

  
 }



window.onclick = function (event) {
    if (!event.target.matches('#bt-2')) {
        
            dropUp.style.display = "none";
    }
    
}   



function search(){
    let searchInput = document.querySelector('#search-input'),
    filterWords = searchInput.value.toLowerCase(),
    searchTitleArr = document.querySelectorAll('.title-value'),
    content = document.querySelectorAll('.todo')
    for(let i = 0; i< searchTitleArr.length; i++){
        let txtValue  = searchTitleArr[i].innerText || searchTitleArr[i].innerText
        if(txtValue.toLowerCase().indexOf(filterWords) > -1) {
                        content[i].style.display = "";
                    } else {
                        content[i].style.display = "none";
                    }
    }
}

//toggle 
let toggleOn = document.querySelector('.toggle')
let toggleOff = document.querySelector('.show-main')
toggleOn.addEventListener('click',()=>{
    document.querySelector('.left-section').style.display = 'block'
})
toggleOff.addEventListener('click',()=>{
    document.querySelector('.left-section').style.display = 'none'
})