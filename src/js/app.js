(function() {

    "use strict";

    var app = app || {};

    app.module = (function() {

        function init() {
            console.info('Module initialized.');
        }

        return {
            init: init
        };

    })();

    app.module.init();

})();