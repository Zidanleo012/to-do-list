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