import { Project } from "./createProjectObject";
import { displayContentPage } from "./displayTodoPage";
import { displayNewToDo } from "./displayNewToDo";

const projectListArr = JSON.parse(localStorage.getItem('projectListArr')) || [
    {
        title: 'Grocery',
        description: 'Buy groceries from the market, including fruits, vegetables, bread, milk, and eggs.',
        toDoList: [
            {
                check: false,
                title: 'Buy tomato',
                desc: 'Buy one kilo of tomato from the market to make salsa.',
                dueDate: '21-10-2024',
                priority: 'important'
            },
            {
                check: false,
                title: 'Buy milk',
                desc: 'Buy one liter of milk from the dairy shop.',
                dueDate: '20-12-2024',
                priority: 'normal'
            },
            {
                check: false,
                title: 'Buy orange',
                desc: 'Buy one kilo of orange from the fruit shop.',
                dueDate: '19-12-2024',
                priority: 'normal'
            },
            {
                check: false,
                title: 'Buy bread',
                desc: 'Buy one loaf of bread from the bakery.',
                dueDate: '18-12-2024',
                priority: 'normal'
            },
            {
                check: false,
                title: 'Buy egg',
                desc: 'Buy one dozen of egg from the dairy shop.',
                dueDate: '17-12-2024',
                priority: 'normal'
            }
        ]
    }
]
window.addEventListener('beforeunload', () => {
    localStorage.setItem('projectListArr', JSON.stringify(projectListArr))
})

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
        addDeleteEvent(deleteIcon)
    }
}

function displayContent(el) {

    el.addEventListener('click', e => {
        let child = el;
        let parent = el.parentElement;
        let indexOfItem = Array.prototype.indexOf.call(parent.children, child);

        currentProject.setProject(indexOfItem);
        // console.log('Project at index:', projectListArr[indexOfItem]);
        displayContentPage(projectListArr[indexOfItem])
        displayNewToDo();
    })
}

const currentProject = (function () {
    let indexProject = 0;

    const setProject = (index) => indexProject = index;
    const getProject = () => indexProject;

    return {
        setProject,
        getProject
    }
})();

if (projectListArr.length !== 0) {
    displayProject()
    displayContentPage(projectListArr[currentProject.getProject()]);
    displayNewToDo()
} else {
    displayBlankContent();
}

function addDeleteEvent(el) {
    if (el) {
        el.addEventListener('click', e => {
            e.stopPropagation()
            let child = el.parentElement;
            let parent = el.parentElement.parentElement;
            let indexOfItem = Array.prototype.indexOf.call(parent.children, child);
            e.target.parentElement.remove();
            console.log("current index: ", indexOfItem)
            displayBlankContent(indexOfItem);
            projectListArr.splice(indexOfItem, 1);
        })
    }
}

function displayBlankContent(deletedElIndex) {
    const content = document.querySelector('.content');
    if (deletedElIndex === currentProject.getProject() || deletedElIndex === undefined) {
        while (content.hasChildNodes()) {
            content.removeChild(content.firstChild)
        }
        const para = document.createElement('p');
        para.classList.add('blank-para');
        para.textContent = 'Select project you want to see on the left or create new project'

        content.append(para)
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

    // deleteIcon.forEach(item => {
    //     item.addEventListener('click', e => {
    //         e.stopPropagation()
    //         e.target.parentElement.remove()
    //         let index = addDeleteEvent()
    //         projectListArr.splice(index, 1)
    //         console.log(index)
    //     })
    // })


})()

export {
    projectListArr,
    currentProject
}