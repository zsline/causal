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

const minTitle = document.querySelectorAll('.min-title');
function newMinTitle(title) {
  return `[&nbsp;&nbsp;${title}&nbsp;&nbsp;]`;
}
if(minTitle.length > 0){
  minTitle.forEach(el => {
    title = el.innerText;
    el.innerHTML = newMinTitle(title);
  });
}
// ========= плавающее меню ==============
let lastScroll = 0;
const nav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // скролл вниз
    nav.classList.add('hide');
  } else {
    // скролл вверх
    nav.classList.remove('hide');
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});
// ========= переключение табов =============
const resultsItems = document.querySelectorAll('.result__info--item');
const resultTabs = document.querySelectorAll('.result__list li');
switchTabs(resultsItems, resultTabs);

const formatItems = document.querySelectorAll('.remap-format__item');
const formatTabs = document.querySelectorAll('.remap-format__wrapper--list li');
switchTabs(formatItems, formatTabs);


function switchTabs(resultsItems, resultTabs){
  if(resultsItems){
    resultTabs.forEach(tab => {
      tab.addEventListener('click', (e) =>{
        if(e.target.classList.contains('active')){
          return;
        } else {
          resultTabs.forEach(el => {
            el.classList.remove('active');
          });
          e.target.classList.add('active');
          resultsItems.forEach(item => {
            item.classList.remove('active');
            if(item.dataset.info && item.dataset.info == e.target.dataset.tab){
              item.classList.add('active');
            } 
          })
        }
      })
    })
  }
}

// ======== Формирование Содержания на странице Single ==========

const singleContent = document.querySelector('.blog-inner__content');
const singleList = document.querySelector('.sidebar__list'); // <ol> основной

if (singleContent && singleList) {
  const headings = singleContent.querySelectorAll('h2, h3');

  let h2Index = 0;
  let h3Index = 0;
  let currentSubList = null; // для хранения вложенного списка <ol>

  headings.forEach((heading) => {
    const tag = heading.tagName.toLowerCase();
    const id = `section-${Math.random().toString(36).substr(2, 5)}`;
    heading.id = id;

    if (tag === 'h2') {
      h2Index++;
      h3Index = 0; // сбрасываем счётчик подзаголовков
      currentSubList = null; // сбрасываем текущий подсписок

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = `${h2Index}. ${heading.textContent.trim()}`;
      li.appendChild(a);
      singleList.appendChild(li);

      // создаём подсписок для возможных h3
      currentSubList = document.createElement('ol');
      li.appendChild(currentSubList);

    } else if (tag === 'h3' && currentSubList) {
      h3Index++;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = `${h2Index}.${h3Index} ${heading.textContent.trim()}`;
      a.style.paddingLeft = '8px';
      li.appendChild(a);
      currentSubList.appendChild(li);
    }
  });

  // Подсветка активных ссылок
  const sections = singleContent.querySelectorAll('h2, h3');
  const links = singleList.querySelectorAll('a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = singleList.querySelector(`a[href="#${id}"]`);
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, {
    rootMargin: '0% 0px -90% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

document.querySelector('.site-nav__top')?.addEventListener('click', e => {
  e.preventDefault();

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(0, true);
  }
});


// ===================================================================
// =============== Закрытие и Открытие содержания =================

// const singleAside = document.querySelector('.sidebar');
// const openSingleAside = document.querySelector('.single__aside--open');
// const closeSingleAside = document.querySelector('.sidebar__title--close');
// if(singleAside){
//   function openAside() {
//     singleAside.classList.remove('close');
//     openSingleAside.style.display = 'none';
//   }
//   function closeAside() {
//     singleAside.classList.add('close');
//     openSingleAside.style.display = 'flex';
//   }
//   closeSingleAside.addEventListener('click', () => {
//     closeAside();
//   });
//   openSingleAside.addEventListener('click', () => {
//     openAside();
//   });
// }

