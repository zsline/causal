gsap.registerPlugin(ScrollTrigger);

const mq = window.matchMedia("(min-width: 560px)");

function createSidebarLinks(){
    let startValue = window.innerWidth < 860 ? "top+=40 top" : "top-=20 top";
    ScrollTrigger.create({
    trigger: ".blog-inner__wrapper",
    start: startValue,
    end: "bottom bottom-=300",
    pin: ".sidebar",
    pinSpacing: false,
    });
    document.addEventListener("click", (e) => {
    const link = e.target.closest(".sidebar__list a");
    if (!link) return;

    const id = link.getAttribute("href");
    if (!id.startsWith("#")) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    ScrollSmoother.get().scrollTo(target, true, "top top");
    });
}

function initDesktop() {
  animateSite();
  animateText(".about__wrapper", "#tp1", "#tp2", "#max-tp1", "#max-tp2");
  animateText(".faq__img--inner", "#faq-tp1", "#faq-tp2", "#faq-max-tp1", "#faq-max-tp2");
  createSidebarLinks();

}
function initMobile(){
    animateText(".about__wrapper", "#tp1", "#tp2", "#max-tp1", "#max-tp2");
    createSidebarLinks();
    gsap.to('.hero__poster--author', {
    scrollTrigger:{
        trigger: '.hero',
        start: 'top top',
        scrub: true
    },
    scale: 1.2
    });
}
function destroyDesktop() {
  console.log("JS выключен ( <= 560px )");
}
function animateText(trigger, tp1, tp2 , max1, max2 ){
    const tl = gsap.timeline({
    scrollTrigger: {
        trigger: trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true 
    }
    });
       /* MIN — по часовой */
    tl.fromTo(tp1,
    { attr: { startOffset: "0%" } },
    { attr: { startOffset: "-100%" }, ease: "none" },
    0
    );

    tl.fromTo(tp2,
    { attr: { startOffset: "100%" } },
    { attr: { startOffset: "0%" }, ease: "none" },
    0
    );

    /* MAX — против часовой */
    tl.fromTo(max1,
    { attr: { startOffset: "0%" } },
    { attr: { startOffset: "100%" }, ease: "none" },
    0
    );

    tl.fromTo(max2,
    { attr: { startOffset: "-100%" } },
    { attr: { startOffset: "0%" }, ease: "none" },
    0
    );
}
function animateSite(){
    gsap.registerPlugin(ScrollSmoother);
    ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,          // плавность
    effects: true,
    smoothTouch: 0.1      // мобильные
    });
    gsap.to('.hero__poster--author', {
        scrollTrigger:{
            trigger: '.hero',
            start: 'top top',
            scrub: true
        },
        scale: 1.2
    });
        gsap.to('.remap-hero__poster img', {
        scrollTrigger:{
            trigger: '.hero__wrapper',
            start: 'top top',
            scrub: true
        },
        scale: 1
    });
        gsap.to('.hero__offer--remap', {
        scrollTrigger:{
            trigger: '.hero',
            start: 'top top',
            scrub: true
        },
        yPercent: 160,
        opacity: 0
    });
    gsap.from('.happiness__offer h2', {
        scrollTrigger:{
            trigger: '.happiness',
            start: 'top bottom',
            end: 'top top',
            // scrub: true
        },
        xPercent: 100,
        opacity: 0,
        duration: 2
    });
    gsap.from('.couching__whot h2', {
        scrollTrigger:{
            trigger: '.couching__whot',
            start: 'top bottom',
            end: 'top top',
            // scrub: true
        },
        xPercent: -100,
        opacity: 0,
        duration: 2
    });
    gsap.from('.principles h2', {
        scrollTrigger:{
            trigger: '.principles',
            start: 'top bottom',
            end: 'top top',
            // scrub: true
        },
        xPercent: -100,
        opacity: 0,
        duration: 2
    });
    gsap.from('.whot__img--text span:nth-child(1)', {
        scrollTrigger:{
            trigger: '.whot__img--text',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
        },
        yPercent: 100,
        opacity: 0,
        duration: 2
    });
    gsap.from('.whot__img--text span:nth-child(2)', {
        scrollTrigger:{
            trigger: '.whot__img--text',
            start: 'top bottom',
            end: 'top top',
            scrub: true
        },
        yPercent: -100,
        opacity: 0,
        duration: 2
    });
    gsap.from(".whot__content p", {
        scrollTrigger: {
            trigger: ".whot__content",
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none"
        },
        yPercent: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.25
    });
    if(window.innerWidth > 654){
        gsap.utils.toArray(".formats__item").forEach(item => {
          gsap.fromTo(
            item,
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: item,
                start: "center top",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
    }
}
function handleMQ(e) {
  if (e.matches) {
    initDesktop();
  } else {
    destroyDesktop();
    initMobile();
  }
}

// первый запуск
handleMQ(mq);

// слушаем изменения
mq.addEventListener("change", handleMQ);

function animateaList(list, color_one = "rgba(0, 0, 0, 0.31)", color_two = "#33845D"){
    const items = document.querySelectorAll(list);
    items.forEach(li => {
    const tl = gsap.timeline({
        scrollTrigger: {
        trigger: li,
        start: "top 50%",
        end: "bottom 15%",
        scrub: true,
        }
    });

    // ДО ЦЕНТРА — усиливаем
    tl.to(li, {
        color: color_two,
        "--line-opacity": 0.30,
        opacity: 1,
        ease: "none"
    }, 0.5);

    // ПОСЛЕ ЦЕНТРА — возвращаем
    tl.to(li, {
        color: color_one,
        "--line-opacity": 0.15,
        opacity: 0.3,
        ease: "none"    
    }, 1);
    });
}
const formatsItems = document.querySelectorAll('.formats__item');
if(formatsItems.length > 0){
    formatsItems.forEach(item => {
        if(window.innerWidth < 760){
            item.dataset.speed = 1.1; 
        }
    })
}
