import {getResource} from '../services/services'

function cards(){

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


  axios.get('http://localhost:3000/menu')   // Гет запрос с помощью либы axios 
    .then(data => {
      data.data.forEach(({img,altimg,title,descr,price}) => {
        new MenuCard(img,altimg,title,descr,price,'.menu .container').render();

      });
    });



}


export default cards;