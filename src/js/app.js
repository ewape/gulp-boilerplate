(function() {

    "use strict";

    const app = {};

    app.mod = (() => {

        const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

        const updateColorVar = () => {
            document.body.style.setProperty('--color-var', generateColor());
        };

        const init = () => updateColorVar();

        return {
            init: init
        };

    })();

    app.mod.init();

})();