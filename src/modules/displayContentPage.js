
export function displayContentPage(obj) {
    const contentSection = document.querySelector('.content');

    while(contentSection.hasChildNodes()) {
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

    todoWrapper.append(contentDesc)

    contentSection.append(title, todoWrapper)
}