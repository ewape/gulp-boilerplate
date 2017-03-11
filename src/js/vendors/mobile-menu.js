(function() {

    "use strict";

    const mobileMenu = (function() {

        const button = document.querySelector('.nav-btn'),
            body = document.body,
            menuSelector = '.main-menu',
            menu = body.querySelector(menuSelector),
            openMenuClass = 'menu-open';

        const openMenu = () => body.classList.add(openMenuClass);
        const closeMenu = () => body.classList.remove(openMenuClass);
        const getMenuState = () => body.classList.contains(openMenuClass);
        const toggleMenu = () => body.classList.contains(openMenuClass) ? closeMenu() : openMenu();
        const addEvents = () => {
            let links = Array.apply(null, menu.childNodes);
            links.map((link) => link.addEventListener('click', openMenu));
            button.addEventListener('click', toggleMenu);
        };

        const init = () => addEvents();

        return {
            init: init,
            openMenu: openMenu,
            closeMenu: closeMenu,
            getMenuState: getMenuState
        };

    })();

    mobileMenu.init();

})();