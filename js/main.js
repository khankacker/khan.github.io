/* -------------------------------------------

Name:       Josie
Version:    1.0
Author:	    bslthemes
Website:    https://bslthemes.com/
Developer:	millerDigitalDesign (https://themeforest.net/user/millerdigitaldesign/)

------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* -------------------------------------------

    register gsap plugins

    ------------------------------------------- */
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    /* -------------------------------------------

    ScrollSmoother

    ------------------------------------------- */
    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });

    /* -------------------------------------------

    preloader

    ------------------------------------------- */
    const preloaderTimeline = gsap.timeline();

    let curtainWidth;

    if (window.innerWidth < 992) {
        curtainWidth = '0';
    } else if (window.innerWidth < 1200) {
        curtainWidth = '30%';
    } else {
        curtainWidth = '35%';
    }

    preloaderTimeline
        .to(".mil-preloader .mil-curtain", {
            width: curtainWidth,
            ease: "sine",
            duration: 0.4,
            delay: 0.2,
            onComplete: function () {
                ScrollTrigger.refresh();
            },
        })
        .to(".mil-preloader .mil-load", {
            width: '100%',
            ease: "sine",
            duration: 1,
            onComplete: function () {
                ScrollTrigger.refresh();
            },
        })
        .to(".mil-preloader", {
            opacity: 0,
            ease: "sine",
            duration: 0.4,
            delay: 0.2,
            onComplete: function () {
                ScrollTrigger.refresh();
            },
        });

    /* -------------------------------------------
    
    scroll link
    
    ------------------------------------------- */
    document.querySelectorAll('.mil-onepage-menu > li > a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const offsetY = window.innerWidth < 992 ? 180 : 90;
            gsap.to(window, {
                duration: 1,
                ease: 'sine',
                scrollTo: {
                    y: targetId,
                    offsetY: offsetY
                }
            });
        });
    });
    /* -------------------------------------------

    cursor

    ------------------------------------------- */
    var follower = document.querySelector(".mil-cursor-follower");
    var posX = 0,
        posY = 0;
    var mouseX = 0,
        mouseY = 0;

    gsap.ticker.add(function () {
        posX += (mouseX - posX) / 29;
        posY += (mouseY - posY) / 29;
        gsap.set(follower, {
            css: {
                left: posX,
                top: posY
            }
        });
    });

    function addHoverEffect(selector, className) {
        document.querySelectorAll(selector).forEach(function (link) {
            link.addEventListener("mouseenter", function () {
                follower.classList.add(className);
            });
            link.addEventListener("mouseleave", function () {
                follower.classList.remove(className);
            });
        });
    }

    addHoverEffect(".mil-c-light", "mil-light-active");
    addHoverEffect(".mil-c-dark", "mil-dark-active");
    addHoverEffect(".mil-c-gone", "mil-gone-active");
    addHoverEffect(".mil-c-view", "mil-view-active");
    addHoverEffect(".mil-c-next", "mil-next-active");
    addHoverEffect(".mil-c-read", "mil-read-active");
    addHoverEffect(".mil-c-swipe", "mil-swipe-active");

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* -------------------------------------------

    menu

    ------------------------------------------- */
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('mil-menu-btn')) {
            event.target.classList.toggle('mil-active');
            document.querySelector('.mil-sidebar').classList.toggle('mil-active');
        }
    });

    const menu = document.querySelector('.mil-main-menu');
    const sidebar = document.querySelector('.mil-sidebar');
    const menuBtn = document.querySelector('.mil-menu-btn');

    if (menu && menu.classList.contains('mil-onepage-menu')) {
        menu.addEventListener('click', function (event) {
            if (event.target.matches('li a')) {
                sidebar.classList.remove('mil-active');
                menuBtn.classList.remove('mil-active');
            }
        });
    }
    /* -------------------------------------------

    scrollbar

    ------------------------------------------- */
    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });

    /* -------------------------------------------

    scroll animations

    ------------------------------------------- */
    const appearance = document.querySelectorAll(".mil-up");
    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 60,
            scale: .96,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /* -------------------------------------------

    scale animations

    ------------------------------------------- */
    const scaleImage = document.querySelectorAll(".mil-scale-img");

    scaleImage.forEach((section) => {
        var value1 = section.getAttribute("data-value-1");
        var value2 = section.getAttribute("data-value-2");

        if (window.innerWidth < 1200) {
            value1 = Math.max(.95, value1);
        }

        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,
        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /* -------------------------------------------

    add class

    ------------------------------------------- */
    function addClassToElement(element) {
        if (element) {
            element.classList.add('mil-added');
        }
    }

    function removeClassFromElement(element) {
        if (element) {
            element.classList.remove('mil-added');
        }
    }

    document.querySelectorAll('.mil-add-class').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            toggleActions: 'play none none reverse',
            onEnter: () => addClassToElement(element),
            onLeaveBack: () => removeClassFromElement(element)
        });
    });
    /* -------------------------------------------

    progressbar

    ------------------------------------------- */

    const progressBars = document.querySelectorAll('.mil-prog');

    progressBars.forEach(progressBar => {
        const widthPercentage = progressBar.getAttribute('data-number');
        gsap.fromTo(progressBar, {
            ease: 'sine',
            width: '0%'
        }, {
            width: `${widthPercentage}%`,
            scrollTrigger: {
                trigger: progressBar,
                toggleActions: 'play none none reverse',
                once: true
            },
            duration: 2,
            ease: 'sine'
        });
    });
    /* -------------------------------------------

    sliders

    ------------------------------------------- */
    var swiper = new Swiper('.mil-portfolio-slider', {
        parallax: true,
        autoHeight: true,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-swiper-pagination",
            type: "fraction",
        },
        on: {
            slideChangeTransitionEnd: function () {
                ScrollTrigger.refresh();
            }
        }
    });

    var swiper = new Swiper('.mil-blog-slider', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: ".mil-swiper-pagination-2",
            type: "fraction",
        },
        on: {
            slideChangeTransitionEnd: function () {
                ScrollTrigger.refresh();
            }
        }
    });

});
