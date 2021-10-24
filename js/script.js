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

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok){
      throw new Error(`coudn't fetch ${url}, status = ${res.status}`);
    }
    return await res.json();
  };

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img,altimg,title,descr,price}) => {     // деструктуризация(раскладывание свойств объекта на отдельные переменные) объектов из массива меню на отдельные переменные  
  //       new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
  //     });
  //   });


  axios.get('http://localhost:3000/menu')   // Гет запрос с помощью либы axios 
    .then(data => {
      data.data.forEach(({img,altimg,title,descr,price}) => {
        new MenuCard(img,altimg,title,descr,price,'.menu .container').render();

      });
    });











//forms

const forms = document.querySelectorAll('form');

const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо, мы вам перезвоним",
    failure: "Что-то пошло не так"
};

forms.forEach((item) => {
  bindPostData(item);
});


const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {'Content-type':'application/json'},
    body: data
  });
  return await res.json();
};


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






//slider


const slides = document.querySelectorAll(".offer__slide"),
      sliderButtonPrev = document.querySelector(".offer__slider-prev"),
      sliderButtonNext = document.querySelector(".offer__slider-next"),
      slider = document.querySelector(".offer__slider");
let   slideIndex = 1,
      total = document.querySelector('#total'),
      current = document.querySelector('#current');

showSlides(slideIndex);

if(slides.length < 10){
  total.textContent = `0${slides.length}`;
} else {
  total.textContent = slides.length;
}

function showSlides(n){
  if(slideIndex > slides.length){
    slideIndex = 1;
  } 
  if(slideIndex < 1){
    slideIndex = slides.length;
  }

  if(slides.length < 10){
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  slides.forEach(item => item.style.display = 'none'); 
  slides[slideIndex - 1].style.display = "block";
}


function IndexCounter(n){
  showSlides(slideIndex +=n);
}


slider.style.position = "relative";
const dots = document.createElement('ol'),
      indicators = [];


dots.classList.add("carousel-indicators");
slider.append(dots);
for(let i = 0; i < slides.length; i++){
  const dot = document.createElement("li");
  dot.setAttribute('data-slide-to', i + 1);
  dot.classList.add("dot");
  if(i == 0){
    dot.style.opacity = "1";
  }
  dots.append(dot);
  indicators.push(dot);
}


sliderButtonPrev.addEventListener('click',(item)=>{
  IndexCounter(-1);
  indicators.forEach(dot => dot.style.opacity = ".5");
  indicators[slideIndex - 1].style.opacity = "1";
});
sliderButtonNext.addEventListener('click',(item)=>{
  IndexCounter(1);
  indicators.forEach(dot => dot.style.opacity = ".5");
  indicators[slideIndex - 1].style.opacity = "1";
});

indicators.forEach(dot => {
  dot.addEventListener('click', (e)=>{
    const slideTo = +e.target.getAttribute('data-slide-to');
    slideIndex = slideTo;
    showSlides(slideIndex);
    indicators.forEach(dot => dot.style.opacity = ".5");
    indicators[slideIndex - 1].style.opacity = "1";


  });
});






// const slides = document.querySelectorAll('.offer__slide'),
//       next = document.querySelector('.offer__slider-next'),
//       prev = document.querySelector('.offer__slider-prev');
// let indexCounter = 1;
// showSlides(indexCounter);

// function showSlides(){
//   if(indexCounter > slides.length){
//     indexCounter = 1;
//   } 
//   if(indexCounter < 1) {
//     indexCounter = slides.length;
//   }
  
//   slides.forEach((item)=>{
//     item.style.display = 'none';
//   });
//   slides[indexCounter - 1].style.display = 'block';
// }

// function sumIndex(n){
//   showSlides(indexCounter += n);
// }

// next.addEventListener('click',()=>{
//   sumIndex(1);
// });
// prev.addEventListener('click',()=>{
//   sumIndex(-1);
// });







  

});
