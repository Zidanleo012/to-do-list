import { addToDo } from "./createProjectObject";
import { projectListArr, currentProject } from "./projectDisplay.js";
import { formatDistance } from "date-fns";

export function displayNewToDo() {
    const todoList = document.querySelector('.todo-list');
    let index = currentProject.getProject();
    while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }

    for (let i = 0; i < projectListArr[index].toDoList.length; i++) {
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.classList.add('check-todo');
        checkBox.checked = projectListArr[index].toDoList[i].check;
        toggleCheckToDo(checkBox)

        const title = document.createElement('p');
        title.classList.add('toDoTitle')
        title.textContent = projectListArr[index].toDoList[i].title

        const deleteToDoIcon = document.createElement('i');
        deleteToDoIcon.classList.add('fa-solid', 'fa-trash');
        deleteToDo(deleteToDoIcon);

        const desc = document.createElement('p');
        desc.classList.add('desc');
        desc.textContent = projectListArr[index].toDoList[i].desc

        const dueDate = document.createElement('p');
        dueDate.classList.add('due-date');
        // dueDate.textContent = projectListArr[index].toDoList[i].dueDate
        dueDate.textContent = getTimeDistance(projectListArr[index].toDoList[i].dueDate)

        const priority = document.createElement('p');
        priority.classList.add('priority');
        priority.textContent = projectListArr[index].toDoList[i].priority;

        const todo = document.createElement('div');
        todo.classList.add('todo');
        toggleExpandedToDo(todo, desc, priority)
        // , desc, dueDate, priority)

        todo.append(checkBox, title, dueDate, deleteToDoIcon);
        todoList.append(todo)
    }
}

function getTimeDistance(dueDate) {
    return formatDistance(new Date(dueDate.split('-').reverse()), new Date(), { addSuffix: true });
}

function toggleExpandedToDo(el, desc, priority) {
    el.addEventListener('click', e => {
        el.classList.toggle('todo-expanded')
        if (el.classList.contains('todo-expanded')) {
            el.append(desc, priority);
        } else {
            [desc, priority].forEach(deletedEl => deletedEl.remove());
        }
     })
}


function deleteToDo(el) {
    el.addEventListener('click', e => {
        e.stopPropagation()
        let projectIndex = currentProject.getProject()
        let indexOfItem = getToDoIndex(el);
        projectListArr[projectIndex].toDoList.splice(indexOfItem, 1);
        displayNewToDo();
    })
}

function toggleCheckToDo(el) {
    el.addEventListener('click', e => {
        e.stopPropagation()
        let projectIndex = currentProject.getProject()
        let checkItem = projectListArr[projectIndex].toDoList[getToDoIndex(el)];
        checkItem.check = e.target.checked;
        console.log('on displayNewToDo.js: ',checkItem.check);
    })
}

function getToDoIndex(el) {
    let child = el.parentElement;
    let parent = el.parentElement.parentElement;
    let indexOfItem = Array.prototype.indexOf.call(parent.children, child);

    return indexOfItem;
}

// const currentToDo = (function() {
//     let indexToDo;

//     const setToDo = (index) => {indexToDo = index};
//     const getToDo = () => indexToDo;

//     return {
//         setToDo,
//         getToDo
//     }
// })()

(() => {
    const title = document.querySelector('#title');
    const desc = document.querySelector('#desc');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('#priority');
    const addToDoButton = document.querySelector('#add-todo-button');
    const close = document.querySelector('.close');
    const formContainer = document.querySelector('#formContainer');
    const todo = document.querySelector('.todo');
    const dropDownForm = document.querySelector('#dropdownForm');
    const today = new Date();

    dueDate.min = today.toISOString().split('T')[0];

    addToDoButton.addEventListener('click', e => {
        let index = currentProject.getProject();
        let reversedDueDate = dueDate.value.split('-').reverse().join('-');
        addToDo(projectListArr[index], title.value, desc.value, reversedDueDate, priority.value);
        dropDownForm.reset()
        displayNewToDo()
    })

    close.addEventListener('click', e => {
        formContainer.style.display = 'none';
    })

    document.querySelector('#dropdownForm').addEventListener('submit', e => {
        e.preventDefault()
    })
})()