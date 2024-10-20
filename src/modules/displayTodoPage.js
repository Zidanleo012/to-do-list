import { addToDo } from "./createProjectObject";

export function displayContentPage(obj) {
    console.log('on displayContentPage: ', obj)
    const contentSection = document.querySelector('.content');

    while (contentSection.hasChildNodes()) {
        contentSection.removeChild(contentSection.firstChild)
    }

    const title = document.createElement('p');
    title.classList.add('content-title');
    title.textContent = obj.title;

    const todoWrapper = document.createElement('div');
    todoWrapper.classList.add('todo-wrapper');

    const contentDesc = document.createElement('p');
    contentDesc.classList.add('content-desc');
    contentDesc.textContent = obj.description ? obj.description : "I am a Placeholder!!!";

    const toDoList = document.createElement('div');
    toDoList.classList.add('todo-list');

    const button = document.createElement('button');
    button.classList.add('new-todo');
    button.setAttribute('type', 'button');
    button.textContent = 'New ToDo';
    addButtonEvent(button)

    todoWrapper.append(contentDesc, toDoList, button);

    contentSection.append(title, todoWrapper);
}

function addButtonEvent(el) {
    el.addEventListener('click', e => {
        const formContainer = document.querySelector("#formContainer");
        formContainer.style.display = formContainer.style.display === "block" ? "none" : "block";
    })

    // document.querySelector("#dropdownForm").addEventListener("submit", (event) => {
    //     event.preventDefault(); // Prevent form from refreshing the page
    //     alert("Form submitted successfully!");
    // })
}