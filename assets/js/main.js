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

// ====== Функция для перетягивания любого блока ======
function enableDragScroll(container, speed = 1.3) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  container.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return; // только левая кнопка
    if (e.target.closest('.reviews__item--btn')) return; // кнопки не участвуют в drag

    isDown = true;
    startX = e.clientX;
    scrollLeft = container.scrollLeft;
    container.setPointerCapture(e.pointerId); // захватываем все события pointer для контейнера
    container.classList.add('dragging');
    e.preventDefault();
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const walk = (e.clientX - startX) * speed;
    container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener('pointerup', (e) => {
    isDown = false;
    container.classList.remove('dragging');
    container.releasePointerCapture(e.pointerId);
  });

  container.addEventListener('pointerleave', (e) => {
    isDown = false;
    container.classList.remove('dragging');
    container.releasePointerCapture(e.pointerId);
  });
}




// ====== Подключаем перетягивание к блокам ======
const resultSlider = document.querySelector('.remap-result__content--wrapper');
if (resultSlider) enableDragScroll(resultSlider, 1.3);

const reviewSlider = document.querySelector('.reviews__wrapper');
if (reviewSlider) enableDragScroll(reviewSlider, 1.3);

const programBox = document.querySelector('.remap-program__wrapper');
if (programBox) enableDragScroll(programBox, 1.3);

// ====== Кастомный ползунок ======
const thumb = document.getElementById('program-thumb');
// function customThumb(scrollBox, thumb){
//   if (scrollBox && thumb) {
//     function updateThumb() {
//       const ratio = scrollBox.scrollLeft / (scrollBox.scrollWidth - scrollBox.clientWidth);
//       const max = scrollBox.clientWidth - thumb.offsetWidth;
//       thumb.style.left = ratio * max + 'px';
//     }
//     scrollBox.addEventListener('scroll', updateThumb);
//     let isThumbDragging = false;
//     let thumbStartX = 0;
//     thumb.addEventListener('mousedown', (e) => {
//       isThumbDragging = true;
//       thumbStartX = e.clientX - thumb.offsetLeft;
//       document.body.style.userSelect = 'none';
//     });
//     document.addEventListener('mouseup', () => {
//       isThumbDragging = false;
//       document.body.style.userSelect = '';
//     });
//     document.addEventListener('mousemove', (e) => {
//       if (!isThumbDragging) return;
//       const max = scrollBox.clientWidth - thumb.offsetWidth;
//       let pos = e.clientX - thumbStartX;
//       pos = Math.max(0, Math.min(pos, max));
//       thumb.style.left = pos + 'px';
//       const ratio = pos / max;
//       scrollBox.scrollLeft = ratio * (scrollBox.scrollWidth - scrollBox.clientWidth);
//     });
//     // Обновляем при загрузке и ресайзе
//     updateThumb();
//     window.addEventListener('resize', updateThumb);
//   }
// }

function customThumb(scrollBox, thumb){
  if (scrollBox && thumb) {

    function updateThumb() {
      const ratio = scrollBox.scrollLeft / (scrollBox.scrollWidth - scrollBox.clientWidth);
      const max = scrollBox.clientWidth - thumb.offsetWidth;
      thumb.style.left = ratio * max + 'px';
    }

    scrollBox.addEventListener('scroll', updateThumb);

    let isThumbDragging = false;
    let thumbStartX = 0;

    thumb.addEventListener('pointerdown', (e) => {
      isThumbDragging = true;
      thumb.setPointerCapture(e.pointerId);

      thumbStartX = e.clientX - thumb.offsetLeft;
      document.body.style.userSelect = 'none';
    });

    thumb.addEventListener('pointermove', (e) => {
      if (!isThumbDragging) return;

      const max = scrollBox.clientWidth - thumb.offsetWidth;
      let pos = e.clientX - thumbStartX;

      pos = Math.max(0, Math.min(pos, max));
      thumb.style.left = pos + 'px';

      const ratio = pos / max;
      scrollBox.scrollLeft = ratio * (scrollBox.scrollWidth - scrollBox.clientWidth);
    });

    thumb.addEventListener('pointerup', (e) => {
      isThumbDragging = false;
      thumb.releasePointerCapture(e.pointerId);
      document.body.style.userSelect = '';
    });

    updateThumb();
    window.addEventListener('resize', updateThumb);
  }
}


customThumb(programBox, thumb);
const resultBox = document.querySelector('.remap-result__content--wrapper');
const resultThumb = document.querySelector('.result-thumb');
customThumb(resultBox, resultThumb);
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


