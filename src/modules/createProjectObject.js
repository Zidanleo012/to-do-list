export function Project(title, description) {
    this.title = title;
    this.description = description;
    this.toDoList = [];
}

export function addToDo(obj, title, desc, dueDate, priority) {
    obj.toDoList.push({
        check: false,
        title,
        desc,
        dueDate,
        priority
    })
}

// todo title, todo desc, priority, dueDate
// export function addToDo(project, title, desc, priority, dueDate) {
    
// }

