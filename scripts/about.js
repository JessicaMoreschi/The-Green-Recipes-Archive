
var myFullpage = new fullpage('#fullpage', {
    // Navigation
    lockAnchors: false,
    anchors: ['0', '1', '2'],
    navigation: false,
    navigationPosition: 'right',
    slidesNavigation: false,
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
    resetSliders: true,
    fadingEffect: false,
    scrollOverflow: true,
    scrollOverflowMacStyle: false,
    scrollOverflowReset: true,
    touchSensitivity: 15,
    bigSectionsDestination: null,

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: false,

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
    },
    onLeave: function (origin, destination, direction, trigger) {
    },
    afterLoad: function (origin, destination, direction, trigger) {
    },
    afterRender: function () { },
    afterResize: function (width, height) { },
    afterReBuild: function () { },
    afterResponsive: function (isResponsive) { },
    afterSlideLoad: function (section, origin, destination, direction, trigger) {},
    onSlideLeave: function (section, origin, destination, direction, trigger) { changeBorder(destination.index)},
    onScrollOverflow: function (section, slide, position, direction) { }
});

function goToSlide(b = '') {
    fullpage_api.moveTo('0', b);
   
}

function changeBorder(d){
    d3.selectAll('.subSection').style('border-bottom', '1px solid var(--main-color)')
    d3.selectAll('.subSection').nodes()[d].style.borderBottom = 'none' 

    document.getElementsByClassName('fp-overflow')[d].scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
