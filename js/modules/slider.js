function slider(container, slide, nextArrow, prevArrow, totalCounter, currentCounter){


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

  slides.forEach(item => {
    item.style.display = 'none';
    item.classList.add('fade');
  }); 
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

function activeDot(arr){
  arr.forEach(dot => dot.style.opacity = ".5");
  arr[slideIndex - 1].style.opacity = "1";
}


sliderButtonPrev.addEventListener('click',(item)=>{
  IndexCounter(-1);
  activeDot(indicators);
  // indicators.forEach(dot => dot.style.opacity = ".5");
  // indicators[slideIndex - 1].style.opacity = "1";
});
sliderButtonNext.addEventListener('click',(item)=>{
  IndexCounter(1);
  activeDot(indicators);
  // indicators.forEach(dot => dot.style.opacity = ".5");
  // indicators[slideIndex - 1].style.opacity = "1";
});

indicators.forEach(dot => {
  dot.addEventListener('click', (e)=>{
    const slideTo = +e.target.getAttribute('data-slide-to');
    slideIndex = slideTo;
    showSlides(slideIndex);
    activeDot(indicators);
    // indicators.forEach(dot => dot.style.opacity = ".5");
    // indicators[slideIndex - 1].style.opacity = "1";


  });
});





}


export default slider;