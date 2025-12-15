gsap.registerPlugin(ScrollTrigger);

const mq = window.matchMedia("(min-width: 560px)");

function initDesktop() {
  animateSite();
  animateText();
  console.log("JS включён ( > 560px )");
}

function destroyDesktop() {
  animateText();
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
  }
}

// первый запуск
handleMQ(mq);

// слушаем изменения
mq.addEventListener("change", handleMQ);
