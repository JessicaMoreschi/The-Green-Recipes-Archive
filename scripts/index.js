var cont = 0;
var cont2 = 0;

var myFullpage = new fullpage('#fullpage', {
    // Navigation
    lockAnchors: true,
    anchors: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#85FF4D', '#fff', '#fff', '#fff'],
    navigation: true,
    navigationPosition: 'right',
    slidesNavigation: true,
    slidesNavPosition: 'bottom',

    // Scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: false,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    // normalScrollElements: '#element1, .element2',
    scrollOverflow: false,
    scrollOverflowMacStyle: false,
    scrollOverflowReset: false,
    touchSensitivity: 15,
    bigSectionsDestination: null,

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    // Design
    controlArrows: false,
    controlArrowsHTML: [
        '<div class="fp-arrow"></div>',
        '<div class="fp-arrow"></div>'
    ],
    verticalCentered: true,
    paddingTop: '0',
    paddingBottom: '0',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
    // Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: true,
    observer: true,
    credits: { enabled: false, label: '', position: 'right' },

    // Events
    beforeLeave: function (origin, destination, direction, trigger) {
         // block the scroll and fire action
        if (cont < 2) { 
            // move img to the left
            if (origin.anchor == 5 && destination.anchor == 6) { 
                cont++; 
                document.getElementById('imgToMove').style.left = 80 + '%'; 
                return cont === 2; 
            }
        }
        if (cont2 < 2) {
            // see all contexts
            if ((origin.anchor == 7 && destination.anchor == 8)) {
                cont2++;
                document.getElementById('clip-circle').style.transition = 'all 1000ms ease'
                document.getElementById('clip-circle').style.clipPath = 'circle(' + 100 + '% at 50% 70%)'
                document.getElementById('textToChange').innerHTML = '...and the sentence in which they appear has been extracted to understand its context'
                return cont2 === 2;
            }
        }
        //open archive on scroll
        if (origin.anchor == 10 && destination.anchor == 11) {
            window.open('pages/archive.html', '_self')
        }
    },

    onLeave: function (origin, destination, direction, trigger) {
        if (origin.anchor == 1 && destination.anchor == 2) {
            //reset slides after animations
            document.getElementById('landingImg').style.transform = 'translate(-50%, 0%)'
            document.getElementById('landingContainer').style.transitionDelay = '500ms !important'
            document.getElementById('landingContainer').style.opacity = '0'
            document.getElementById('landingContainer').style.zIndex = '0'            
        }
        if (origin.anchor == 2) {
            document.getElementById('rect').style.bottom = -34 + 'vh';
        }
        if (origin.anchor == 7) {
            cont2 = 0
            document.getElementById('clip-circle').style.transition = 'all 200ms ease'
            document.getElementById('clip-circle').style.clipPath = 'circle(' + 6 + '% at 50% 70%)'
            document.getElementById('textToChange').innerHTML = 'To better understand their green communication, several environment-related <b>keywords</b> were chosen to be looked for in each website...'
        }

        if (destination.anchor == 1) {
            document.getElementById('landingContainer').style.transitionDelay = '0ms !important'
            document.getElementById('landingContainer').style.opacity = '1'
            document.getElementById('landingContainer').style.zIndex = '1'
            document.getElementById('runningTxtDiv').style.display = 'block'

        } else {
            document.getElementById('landingContainer').style.transitionDelay = '500ms !important'
            document.getElementById('landingContainer').style.opacity = '0'
            document.getElementById('landingContainer').style.zIndex = '0'
            document.getElementById('runningTxtDiv').style.display = 'none'

        }
    },
    afterLoad: function (origin, destination, direction, trigger) {
        if (destination.anchor == 1) {
            //animate title homepage
            document.getElementById('tag2').style.transform = 'translate(100px, -75px)';
            document.getElementById('tag3').style.transform = 'translate(-340px, 15px)';
        }
        if (destination.anchor == 2) {
            //rise hands and green rectangle
            document.getElementById('landingImg').style.transform = 'translate(-50%, +100%)'
                document.getElementById('rect').style.bottom = 0 + 'vh';
        }
        if (destination.anchor == 6) {
            document.getElementById('imgToAppear').style.opacity = 1;
        }

        if (destination.anchor == 7) {
            //lens animation
            let cursX
            let cursY
            document.getElementById('fullpage').onmousemove = function (event) {
                if (destination.anchor == 7 && cont2 < 1) {
                    cursX = event.clientX;
                    cursY = event.clientY;
                    document.getElementById('clip-circle').style.clipPath = 'circle(6% at ' + cursX + 'px ' + cursY + 'px)'
                }
            }
        }

        if (destination.anchor == 9) {
            //rise all recipes
            document.getElementById('allRecipesImg').style.transform = 'translate(-50%, 40%)';
        }
    },
    afterRender: function () { },
    afterResize: function (width, height) { },
    afterReBuild: function () { },
    afterResponsive: function (isResponsive) { },
    afterSlideLoad: function (section, origin, destination, direction, trigger) { },
    onSlideLeave: function (section, origin, destination, direction, trigger) { },
    onScrollOverflow: function (section, slide, position, direction) { }
});

//hide access to last 'fake' slide (necessary to permit access to archive on scroll)
d3.select('#fp-nav').select('ul').selectAll('li').nodes()[d3.select('#fp-nav').select('ul').selectAll('li').nodes().length - 1].style.display = 'none'