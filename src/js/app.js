(function($) {

    "use strict";

    var app = app || {};

    app.mobileMenu = (function() {

        function init() {

        }

        return {
            init: init
        };
    })();

    app.scroll = (function() {
        var $scrollConntainer = $('main'),
            $containers = $scrollConntainer.find('.container');

        function init() {
            $scrollConntainer.pagepiling({
                direction: 'horizontal',
                navigation: false,
                menu: '.main-menu',
                anchors: ['home', 'setup', 'dependencies', 'clean', 'sprites', 'plugins'],
                scrollingSpeed: 500,
                sectionSelector: 'section',
                onLeave: function(index, nextIndex, direction) {
                    //remove animation class
                    //$containers.eq(index - 1).removeClass('show-content');
                },
                afterLoad: function(anchorLink, index) {
                    //add animation class
                    //$containers.eq(index - 1).addClass('show-content');
                },
                afterRender: function() {

                },
            });
        }
        return {
            init: init
        };

    })();

    app.scroll.init();
    //app.mobileMenu.init();

})(jQuery);