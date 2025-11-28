const menuFix = document.querySelector('.site-nav__menu');
if(menuFix){
    menuFix.querySelector('.site-nav__menu--burger').addEventListener('click', (e) => {
        menuFix.querySelector('.menu').classList.toggle('open');
    })
}

const reviewItems = document.querySelectorAll('.reviews__item');
if(reviewItems.length){
    reviewItems.forEach((item) => {
        const btn = item.querySelector('.reviews__item--btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            reviewItems.forEach((i) => {
              i.classList.remove('open') 
            });
            
            if (!isOpen) {
               item.classList.add('open'); 
            } 
        });
    });
}


const rewiewSlider = document.querySelector('.reviews__wrapper');
if(rewiewSlider){

let isDown = false;
let startX;
let scrollLeft;

rewiewSlider.addEventListener('mousedown', (e) => {
  isDown = true;
  rewiewSlider.classList.add('dragging');
  startX = e.pageX - rewiewSlider.offsetLeft;
  scrollLeft = rewiewSlider.scrollLeft;
});

rewiewSlider.addEventListener('mouseleave', () => {
  isDown = false;
  rewiewSlider.classList.remove('dragging');
});

rewiewSlider.addEventListener('mouseup', () => {
  isDown = false;
  rewiewSlider.classList.remove('dragging');
});

rewiewSlider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - rewiewSlider.offsetLeft;
  const walk = (x - startX) * 1.3; // скорость (1.3 — норм)
  rewiewSlider.scrollLeft = scrollLeft - walk;
});    
}



