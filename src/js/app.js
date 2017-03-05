(function($) {

    "use strict";

    var app = app || {};

    app.scroll = (function() {
        var $scrollConntainer = $('main');

        function init() {
            $scrollConntainer.pagepiling({
                direction: 'horizontal',
                //sectionsColor: ['goldenrod', '#04a466', '#2980b9'],
                navigation: false,
                menu: '.main-menu',
                anchors: ['home', 'setup', 'dependencies', 'clean', 'sprites', 'plugins'],
                scrollingSpeed: 500,
                sectionSelector: 'section',
                onLeave: function(index, nextIndex, direction) {},
                afterLoad: function(anchorLink, index) {},
                afterRender: function() {},
            });
        }
        return {
            init: init
        };

    })();

    app.scroll.init();

})(jQuery);
// $(document).ready(function() {
//     $('main').pagepiling({
//         direction: 'horizontal',
//         //sectionsColor: ['goldenrod', '#04a466', '#2980b9'],
//         navigation: false,
//         menu: '.main-menu',
//         anchors: ['home', 'setup', 'dependencies', 'clean', 'sprites', 'plugins'],
//         scrollingSpeed: 500,
//         sectionSelector: 'section',
//         onLeave: function(index, nextIndex, direction) {},
//         afterLoad: function(anchorLink, index) {},
//         afterRender: function() {},
//     });
// });
// $(document).ready(function() {
//     $('#pagepiling').pagepiling({
//         menu: null,
//         direction: 'vertical',
//         verticalCentered: true,
//         sectionsColor: [],
//         anchors: [],
//         scrollingSpeed: 700,
//         easing: 'swing',
//         loopBottom: false,
//         loopTop: false,
//         css3: true,
//         navigation: {
//             'textColor': '#000',
//             'bulletsColor': '#000',
//             'position': 'right',
//             'tooltips': ['section1', 'section2', 'section3', 'section4']
//         },
//         normalScrollElements: null,
//         normalScrollElementTouchThreshold: 5,
//         touchSensitivity: 5,
//         keyboardScrolling: true,
//         sectionSelector: '.section',
//         animateAnchor: false,

//         //events
//         onLeave: function(index, nextIndex, direction) {},
//         afterLoad: function(anchorLink, index) {},
//         afterRender: function() {},
//     });
// });