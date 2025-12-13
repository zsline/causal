gsap.registerPlugin(ScrollTrigger);

gsap.to('.happiness__offer h2', {
    scrollTrigger:{
        trigger: '.happiness',
        markers: true,
        start: 'top 30%',
        // scrub: true
    },
    x: 0,
    opacity: 1
})