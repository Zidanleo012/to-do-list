export default (function(){
    const dropbtn = document.querySelector(".dropbtn")
    const dropUpContent = document.querySelector(".dropup-content")
    let isDisplayed = true;

    dropbtn.addEventListener('click', e => {
        if (isDisplayed) {
            dropUpContent.style['display'] = 'block';
            isDisplayed = false
        } else {
            dropUpContent.style['display'] = 'none';
            isDisplayed = true
        }
    })
})();

(() => {
    const addProject = document.querySelector('.add-project');
    const projectTitle = document.querySelector('#project-title');
    const pseudoInput = document.querySelector('.pseudo-input');

    addProject.addEventListener('click', e => {
        projectTitle.value === '' ? pseudoInput.style.display = 'block' : pseudoInput.style.display = 'none';
    })

    projectTitle.addEventListener('keypress', e => {
        pseudoInput.style.display = 'none';
    })
})()