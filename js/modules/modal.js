function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
    }
    
    function openModal(modalSelector, modalTimerId){
    // modal.style.display = "block";
    // modal.classList.toggle('show');
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";

    if(modalTimerId){
        clearInterval(modalTimerId);
    }
    
    }
    



function modal(triggerSelector, modalSelector, modalTimerId){

//modal

const modBtn = document.querySelectorAll(triggerSelector),
modal = document.querySelector(modalSelector);



modBtn.forEach(btn => {   //стрелочные, и event.target
btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
});


modal.addEventListener('click', e => {
if (e.target === modal || e.target.getAttribute('data-close') == "") {
closeModal(modalSelector);
}
});
document.addEventListener('keydown', e => {
if (e.code === "Escape") {
closeModal(modalSelector);
}
});




function showModalScroll(){
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
openModal(modalSelector, modalTimerId);
window.removeEventListener('scroll',showModalScroll);   //removeEventListener
}
}

window.addEventListener('scroll',showModalScroll);


}

export default modal;
export {closeModal, openModal};