(function() {

    "use strict";

    const mobileMenu = (() => {

        const button = document.querySelector('.nav-btn'),
            body = document.body,
            menuSelector = '.main-menu',
            openMenuClass = 'menu-open',
            menu = body.querySelector(menuSelector),
            transitionDelay = 300;

        const openMenu = () => body.classList.add(openMenuClass);
        const closeMenu = () => body.classList.remove(openMenuClass);
        const getMenuState = () => body.classList.contains(openMenuClass);
        const toggleMenu = () => body.classList.contains(openMenuClass) ? closeMenu() : openMenu();
        const menuClick = () => {
            setTimeout(() => {
                closeMenu();
            }, transitionDelay);
        };

        const addEvents = () => {
            let links = Array.apply(null, menu.childNodes);
            links.map((link) => link.addEventListener('click', menuClick));
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