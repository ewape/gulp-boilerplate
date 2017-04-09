(() => {

    "use strict";

    const mobileMenu = (() => {

        const button = document.querySelector('.nav-btn'),
            body = document.body,
            menuSelector = '.main-menu',
            openMenuClass = 'menu-open',
            menu = body.querySelector(menuSelector),
            transitionDelay = 300,
            singlePage = true;

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
            button.addEventListener('click', toggleMenu);
            if (singlePage) {
                Array.from(menu.childNodes).map((link) => link.addEventListener('click', menuClick));
            }
        };

        const init = () => addEvents();

        return {
            init,
            openMenu,
            closeMenu,
            getMenuState
        };

    })();

    mobileMenu.init();

})();