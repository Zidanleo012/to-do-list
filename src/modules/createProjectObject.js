export function Project(title, description) {
    this.title = title;
    this.description = description;
    this.toDoList = {}
}

export function addToDo(obj, title, desc, dueDate, priority) {
    obj.toDoList.title = title;
    obj.toDoList.desc = desc;
    obj.toDoList.dueDate = dueDate;
    obj.toDoList.priority = priority;
}

// todo title, todo desc, priority, dueDate
// export function addToDo(project, title, desc, priority, dueDate) {
    
// }

