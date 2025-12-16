gsap.registerPlugin(ScrollTrigger);

const mq = window.matchMedia("(min-width: 560px)");

function initDesktop() {
  animateSite();
  animateText();
    const smoother = ScrollSmoother.get();
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const id = link.getAttribute("href");
            if (id.length > 1) {
            e.preventDefault();
            smoother.scrollTo(id, true);
            }
        });
    });
    animateaList(".remap-format__wrapper--list li", "#000000", "#306049");
    animateaList(".result__list li", "#FFFFFF", "#E3B891");
}
function initMobile(){
    animateText();
    animateaList(".remap-format__wrapper--list li", "#000000", "#306049");
     animateaList(".result__list li", "#FFFFFF", "#E3B891");
}
function destroyDesktop() {
  console.log("JS выключен ( <= 560px )");
}
function animateText(){
    const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about__wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true 
    }
    });
       /* MIN — по часовой */
    tl.fromTo("#tp1",
    { attr: { startOffset: "0%" } },
    { attr: { startOffset: "-100%" }, ease: "none" },
    0
    );

    tl.fromTo("#tp2",
    { attr: { startOffset: "100%" } },
    { attr: { startOffset: "0%" }, ease: "none" },
    0
    );

    /* MAX — против часовой */
    tl.fromTo("#max-tp1",
    { attr: { startOffset: "0%" } },
    { attr: { startOffset: "100%" }, ease: "none" },
    0
    );

    tl.fromTo("#max-tp2",
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
