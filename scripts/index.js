var cont = 0;
var cont2 = 0;
var cont3 = 0;

var myFullpage = new fullpage('#fullpage', {
    // Navigation
    lockAnchors: true,
    anchors: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#85FF4D'],
    navigation: true,
    navigationPosition: 'right',
    slidesNavigation: true,
    slidesNavPosition: 'bottom',

    // Scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 0,
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
    // dropEffect: false,
    // dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
    // waterEffect: false,
    // waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
    // cards: false,
    // cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

    // Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: true,
    observer: true,
    credits: { enabled: false, label: '', position: 'right' },

    // Events
    beforeLeave: function (origin, destination, direction, trigger) {

        if (cont < 2) {
            if (origin.anchor == 5 && destination.anchor == 6) {
                cont++;
                document.getElementById('imgToMove').style.left = 80 + '%';
                return cont === 2;
            }
        }
        if (cont2 < 2) {
            if (origin.anchor == 7 && destination.anchor == 8) {
                cont2++;
                document.getElementById('clip-circle').style.transition = 'all 1000ms ease'
                document.getElementById('clip-circle').style.clipPath = 'circle(' + 100 + '% at 50% 70%)'
                document.getElementById('textToChange').innerHTML = '...and the sentence in which they appear has been extracted to understand its context'
                 return cont2 === 2;
            }
        }
    },
    onLeave: function (origin, destination, direction, trigger) {
        if (origin.anchor == 1 && destination.anchor == 2) {
            document.getElementById('landingImg').style.transform = 'translate(-50%, 0%)'
            document.getElementById('landingContainer').style.transitionDelay= '500ms !important'
            document.getElementById('landingContainer').style.opacity='0'
            document.getElementById('landingContainer').style.zIndex='0'
        }
        if (destination.anchor == 1) {
            document.getElementById('landingContainer').style.transitionDelay= '0ms !important'
            document.getElementById('landingContainer').style.opacity='1'
            document.getElementById('landingContainer').style.zIndex='1'
        }
    },
    afterLoad: function (origin, destination, direction, trigger) {
        if (destination.anchor == 1) {
            document.getElementById('tag1').style.transform = 'translate(-210px, -160px)';
            document.getElementById('tag2').style.transform = 'translate(50px, -75px)';
            document.getElementById('tag3').style.transform = 'translate(-315px, 15px)';
            document.getElementById('tag4').style.transform = 'translate(75px, 120px)';
        }
        if (destination.anchor == 2) {
            document.getElementById('landingImg').style.transform = 'translate(-50%, +100%)'
            document.getElementById('rect').style.bottom = 0 + 'vh';
        }
        if (destination.anchor == 6) {
            document.getElementById('imgToAppear').style.opacity = 1;
        }

        if (destination.anchor == 7) {
            let cursX
            let cursY
            document.getElementById('fullpage').onmousemove = function (event) {
                if (destination.anchor == 7 && cont2 < 1) {
                    cursX = event.clientX;
                    cursY = event.clientY;
                    document.getElementById('clip-circle').style.clipPath = 'circle(6% at ' + cursX + 'px ' + cursY + 'px)'
                    document.getElementById('imgLens').style.transform = 'translate(' + cursX + 'px, ' + cursY + 'px)'
                }
            }
        }

        if (destination.anchor == 9) {
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


function move(){
    fullpage_api.moveSectionDown()
}