import { Project } from "./createProjectObject";
import { displayContentPage, getCurrentProject } from "./displayTodoPage"

const projectListArr = []

function displayProject() {
    const projectList = document.querySelector('.project-list');
    while (projectList.hasChildNodes()) {
        projectList.removeChild(projectList.firstChild)
    }

    for (let key of projectListArr) {
        const project = document.createElement('div')
        project.classList.add('project');
        displayContent(project)

        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = key.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-x', 'delete-icon');

        project.append(title, deleteIcon);
        projectList.append(project);
        updateNewList(deleteIcon)
    }
}

function displayContent(el) {
    el.addEventListener('click', e => {
        let child = el;
        let parent = el.parentElement;
        let indexOfItem = Array.prototype.indexOf.call(parent.children, child);

        getCurrentProject(projectListArr[indexOfItem])
        displayContentPage(projectListArr[indexOfItem])
        // console.log(projectListArr[Array.prototype.indexOf.call(parent.children, child)])

    })
}

function updateNewList(el) {
    if (el) {
        el.addEventListener('click', e => {
            e.stopPropagation()
            e.target.parentElement.remove()
            let index = updateNewList()
            projectListArr.splice(index, 1)
            console.log(projectListArr)
        })
    }
}

(function () {
    const addProject = document.querySelector(".add-project");
    const projectTitle = document.querySelector("#project-title");
    const projectDesc = document.querySelector("#project-desc");
    const deleteIcon = document.querySelectorAll('.delete-icon');
    const dropUpForm = document.querySelector('.drop-up-form')

    dropUpForm.addEventListener('submit', e => {
        e.preventDefault()
    })

    addProject.addEventListener('click', e => {
        let title = projectTitle.value;
        let desc = projectDesc.value;

        if (title !== '') {
            projectTitle.value = '';
            projectDesc.value = '';
            const project = new Project(title, desc);
            projectListArr.push(project)
            displayProject()
        }
    })

    deleteIcon.forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation()
            e.target.parentElement.remove()
            let index = updateNewList()
            projectListArr.splice(index, 1)
            console.log(projectListArr)
        })
    })


})()

export {
    projectListArr
}