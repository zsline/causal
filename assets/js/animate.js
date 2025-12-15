





const mq = window.matchMedia("(min-width: 1821px)");

function initDesktop() {
  animateSite();
  console.log("JS включён ( > 560px )");
}

function destroyDesktop() {
  // если нужно — очистка
  console.log("JS выключен ( <= 560px )");
}
function animateSite(){
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
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


    gsap.to('.happiness__offer h2', {
        scrollTrigger:{
            trigger: '.happiness',
            start: 'top bottom',
            end: 'top top',
            // scrub: true
        },
        x: 0,
        opacity: 1,
        duration: 2
    });




    gsap.from('.couching__whot h2', {
        scrollTrigger:{
            trigger: '.couching__whot',
            start: 'top bottom',
            end: 'top top',
            // scrub: true
        },
        x: -300,
        opacity: 1,
        duration: 2
    });

    gsap.to('.whot__img--text span:nth-child(1)', {
        scrollTrigger:{
            trigger: '.whot__img--text',
            start: 'top bottom',
            end: 'top top',
            scrub: true
        },
        y: 0,
        opacity: 1,
        duration: 2
    });
    gsap.to('.whot__img--text span:nth-child(2)', {
        scrollTrigger:{
            trigger: '.whot__img--text',
            start: 'top bottom',
            end: 'top top',
            scrub: true
        },
        y: 0,
        opacity: 1,
        duration: 2
    });
    // gsap.to('.principles__line', {
    //     scrollTrigger:{
    //         trigger: '.principles',
    //         start: 'top bottom',
    //         end: 'top top',
    //         scrub: true
    //     },
    //     y: -300,
    // });

    const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about__img",
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
