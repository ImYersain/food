import tabs from './modules/tabs';
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {closeModal, openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

      tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
      // здесь можно одной строкой создавать новые табы, например вызвать функцию по созданию табов, написать классы , таба, родителя, контейнера и будет новый таб
      calculator();
      cards();
      forms('form',modalTimerId);
      modal('[data-modal]', '.modal', modalTimerId);
      slider({
        // slide: ".offer__slide",
        // container: ".offer__slider",
        // nextArrow: ".offer__slider-next",
        // prevArrow: ".offer__slider-prev",
        // currentCounter: '#current',
        // totalCounter: '#total'
      });
      timer('.timer', '2021-12-10');  

});
