(function() {

    "use strict";

    const app = {};

    app.module = (() => {

        const generateColor = () => '#' + Math.random().toString(16).slice(2, 8);

        const updateColorVar = () => {
            document.body.style.setProperty('--color-var', generateColor());
        };

        const init = () => updateColorVar();

        return {
            init: init
        };

    })();

    app.module.init();

})();