(function() {

    "use strict";

    var app = app || {};

    app.cookies = (function() {

        function init() {
            console.log('cookies - coming soon');
        }

        return {
            init: init
        };

    })();

    app.cookies.init();

})();