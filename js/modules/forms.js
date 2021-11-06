import {closeModal, openModal} from './modal';
import {postData} from '../services/services';


function forms(formSelector,modalTimerId){


//forms

const forms = document.querySelectorAll(formSelector);

const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо, мы вам перезвоним",
    failure: "Что-то пошло не так"
};

forms.forEach((item) => {
  bindPostData(item);
});





function bindPostData(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
              statusMessage.src = message.loading;
              statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
              `;
              form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      // const object = {};
      // formData.forEach(function(value,key){       собираем ключ значение с форма даты и присваем в пустой только созданный объект, чтоб потом за парсить в джейсон
      //   object[key] = value;
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));  // более короткий метод, того же что и сверху, entries() разбивает объект на массив с массивами внутри в виде ключей и значений объекта.
      
      postData('http://localhost:3000/requests', json)
      .then((data)=>{
        console.log(data);
              showThanksModal(message.success);
              statusMessage.remove();          
      }).catch(()=>{
        showThanksModal(message.failure);
      }).finally(()=>{
        form.reset();
      });

    });    
}



function showThanksModal(message){
  const modalDialog = document.querySelector(".modal__dialog");
        modalDialog.classList.add("hide");
        openModal('.modal', modalTimerId);

  const newDialog = document.createElement("div");
        newDialog.classList.add("modal__dialog");
        newDialog.innerHTML= `
        <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                    
            </div>
        `;
        document.querySelector(".modal").append(newDialog);

        setTimeout(()=>{
            closeModal('.modal');  
            newDialog.remove();
            modalDialog.classList.add("show");
            modalDialog.classList.remove("hide");
            
        }, 4000);
  

}




}

export default forms; 