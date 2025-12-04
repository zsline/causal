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

const accordion = document.querySelectorAll(".accordion__item");
     if (accordion.length > 0) {
        accordion.forEach((el) => {
          el.addEventListener("click", (e) => {
            const self = e.currentTarget;
            const control = self.querySelector(".accordion__item--control");
            const content = self.querySelector(".accordion__item--content");
            if (self.classList.contains("open")) {
              self.classList.remove("open");
              control.setAttribute("aria-expanded", false);
              content.setAttribute("aria-hidden", true);
              return;
            }
            accordion.forEach((el) => {
              el.classList.remove("open");
            });
            self.classList.toggle("open");
          });
        });
      }

const blogSlider = document.querySelector('.home-blog__slider');
  if(blogSlider){
  new Swiper(blogSlider, {
    slidesPerView: 1,
    mousewheel: true,
      pagination: {
    el: '.home-blog__pagination',
  },
  breakpoints: {
    440: {
    slidesPerView: 'auto',
    }
  }
  })
}
// const historySlider = document.querySelector('.reviews__wrapper');
// if(historySlider){
//     new Swiper(historySlider, {
//     slidesPerView: 'auto',
//     mousewheel: true,
//   })
// }

const items = document.querySelectorAll('.footer__nav--item');
if(items){
  items.forEach(item => {
    const title = item.querySelector('.footer__nav--title');
    title.addEventListener('click', () => {
      if (item.classList.contains('open')) {
        item.classList.remove('open');
        return;
      }
      items.forEach(i => i.classList.remove('open'));
      item.classList.add('open');
    });
  });
}
