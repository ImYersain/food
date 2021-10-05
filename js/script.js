window.addEventListener('DOMContentLoaded', () => {


  //tabs




  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabcontainer');
  const tabsDescr = document.querySelectorAll('.tabcontent__descr');

  function hidenTabContent() {
    tabsContent.forEach(item => {
      // item.style.display = 'none';
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hidenTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hidenTabContent();
          showTabContent(i);
        }
      });
    }
  });
  
  
  
  //timer



  
  const deadline = '2021-10-21';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          seconds = Math.floor(t / 1000 % 60),
          minutes = Math.floor(t / 1000 / 60 % 60),
          hours = Math.floor(t / (1000 * 60 * 60) % 24);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);
  
  
  
  
  
  
  //modal

  const modBtn = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector('.modal');
        

    

  modBtn.forEach(btn => {   //стрелочные, и event.target
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
  }

  function openModal(){
    // modal.style.display = "block";
    // modal.classList.toggle('show');
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
}

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape") {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);


  function showModalScroll(){
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll',showModalScroll);   //removeEventListener
    }
  }

  window.addEventListener('scroll',showModalScroll);



  // classes for cards

  class MenuCard{
    constructor(src, alt, title, descr, price, parentSelector, ...classes){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.changeToUAH();
    }

    changeToUAH(){
      this.price = +this.price * this.transfer; 
    }

    render(){
      const element = document.createElement('div');  //дополнить проверку на класс меню айтем  -- done
      if(this.classes.length === 0 || this.classes !== "menu__item") {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
      `;
      this.parent.append(element);
    }
  }
  
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container",
    "menu__item"
  ).render();
  
  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container",
    "menu__item"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! Lorem ipsum dolor adipisicing elit. Deserunt, optio.',
    21,
    ".menu .container",
    "menu__item"
).render();




//forms

const forms = document.querySelectorAll('form');

const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо, мы вам перезвоним",
    failure: "Что-то пошло не так"
};

forms.forEach((item) => {
  postData(item);
});

function postData(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
              statusMessage.src = message.loading;
              statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
              `;
              form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type','application/json');
        const formData = new FormData(form);
        
        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });

        request.send(JSON.stringify(object));

        request.addEventListener('load',() =>{
            if(request.status === 200) {
              console.log(request.response);
              showThanksModal(message.success);
              statusMessage.remove();
              form.reset();
            } else {
              showThanksModal(message.failure);
            }
        });
    });    
}



function showThanksModal(message){
  const modalDialog = document.querySelector(".modal__dialog");
        modalDialog.classList.add("hide");
        openModal();

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
            closeModal();  
            newDialog.remove();
            modalDialog.classList.add("show");
            modalDialog.classList.remove("hide");
            
        }, 4000);
  

}








});
