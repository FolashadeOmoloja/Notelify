
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
let deleteNote = document.querySelector('.btn-6')
let title;
let noteInput;
let todoInputArray;
todoInputArray = document.querySelectorAll(".todo-input")
let noteInfo;
const todoArr = []
const Notes = JSON.parse(localStorage.getItem("notesArr") || "[]");
const todos = JSON.parse(localStorage.getItem("TodoList") || "[]")


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
        document.querySelectorAll(".todo").forEach(div => div.remove());
        window.location.reload();
        todoArr.push(todoInputArray[todoInputArray.length-1].value)
        pushToLocalStorageTodo()
        showTodo()
        // window.location.reload();
    }

    function pushToLocalStorageTodo(){

        
        let todoInfo = {todoArr,date}
        //local storage
         todos.push(todoInfo)
        localStorage.setItem("TodoList", JSON.stringify(todos));
    }

    function showTodo() {
        if(!todos) return;
      
        todos.forEach((todo, id) =>{
            console.log(todos)
            console.log(todoArr)
        let div = document.createElement('div')
        div.classList.add('todo')
        div.innerHTML = `
        <div class="title">
                        <i class="fa-solid fa-lightbulb"></i><span>To-Do</span>
                    </div>
                    <div class="body newClass">
                    </div>
                    <footer class="note-footer">
                        <span>${todo.date}</span>
                        <i class="fa-solid fa-pen-to-square set-icon" onclick="showSetIcon(this)">
                           <div class="setting">
                              <ul>
                                <li id="edit"><i class="fa-solid fa-pencil" ></i>Edit</li>
                                <li id="delete"><i class="fa-solid fa-trash"></i>Delete</li>
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
        localStorage.setItem("notesArr", JSON.stringify(Notes));
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
        <i class="fa-solid fa-bookmark"></i><span class="note-title">${note.title}</span>
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
    
//     if (!event.target.matches('.set-icon')) {
        
//         setting.forEach(el => el.style.display = "none");
// }
// if (!event.target.matches('.set-icon-note')) {
        
//     settingNote.style.display = "none";
// }
}   

