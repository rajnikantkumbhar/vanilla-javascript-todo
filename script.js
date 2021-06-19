//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const blank = document.querySelector(".blank");
const todoFilterBox = document.querySelector(".filter-box");
const filterSelect = document.querySelector(".filter-select");
const deleteAllButton = document.querySelector(".delete-all-btn");

//event listerners
document.addEventListener('DOMContentLoaded',loadSavedTodos);
todoButton.addEventListener('click',addTodo);
filterSelect.addEventListener('click',filterToDo);
deleteAllButton.addEventListener('click',deleteAllTodo);

//functions
function loadSavedTodos(event){
    //stop browser from submit
    event.preventDefault();
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(todos!==null){
        todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //complete button 
        const compBtn = document.createElement('button');
        compBtn.innerHTML='<i class="fas fa-check"></i>';
        compBtn.classList.add('comp-btn');
        compBtn.addEventListener('click',completeTodo);
        todoDiv.appendChild(compBtn);

        //trash button 
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML='<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        trashBtn.addEventListener('click',deleteTodo);
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);

        //remove no task text and filter
        if(todoList.childElementCount!=0){
            todoFilterBox.style.display='flex';
            blank.style.display='none';
        }
        });
    }
}
//add new to do
function addTodo(event){
    //stop browser from submit
    event.preventDefault();

    if(todoInput.value!='')
    {
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //complete button 
        const compBtn = document.createElement('button');
        compBtn.innerHTML='<i class="fas fa-check"></i>';
        compBtn.classList.add('comp-btn');
        compBtn.addEventListener('click',completeTodo);
        todoDiv.appendChild(compBtn);
        
        //trash button 
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML='<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        trashBtn.addEventListener('click',deleteTodo);
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);

        //remove no task text and filter
        if(todoList.childElementCount!=0){
            todoFilterBox.style.display='flex';
            blank.style.display='none';
        }

        //save to local storage
        saveLocalTodos(todoInput.value);
        
        //clear to do input
        todoInput.value='';
    }
    else{
        //focus to do input
        todoInput.focus();
    }
}

function deleteTodo(event)
{ 
    const element=event.target.parentElement;
    element.classList.add('fall');
    element.ontransitionend = () => {
        element.remove();
        if(todoList.childElementCount==1){
            todoFilterBox.style.display='none';
            blank.style.display='block';
        }
    }
    
    //delete from local storage
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(todos.indexOf(element.children[0].innerText),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function deleteAllTodo()
{ 
    const allToDos = document.querySelectorAll('.todo');

    allToDos.forEach(function(todo){
        todo.classList.add('fall');
        todo.ontransitionend = () => {
            todo.remove();
        }
    });
    todoFilterBox.style.display='none';
    blank.style.display='block';

    //delete from local storage
    localStorage.setItem('todos',JSON.stringify([]));
}

function completeTodo(event)
{
    const element=event.target.parentElement;
    element.classList.toggle('completed');
}

function filterToDo(event){
    const allToDos = document.querySelectorAll('.todo');
    allToDos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                todo.style.display='flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed'))
                {
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
            case 'uncompleted':
                if(todo.classList.contains('completed'))
                {
                    todo.style.display='none';
                }
                else{
                    todo.style.display='flex';
                }
            default:
                break;
        }

    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
