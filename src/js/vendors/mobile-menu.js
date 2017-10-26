(() => {

    "use strict";

    const mobileMenu = (() => {

        const button = document.querySelector('.nav-btn'),
            body = document.body,
            menuSelector = '.main-menu',
            openMenuClass = 'menu-open',
            menuScrolledClass = 'menu-scrolled',
            menuScrolledOffset = 100,
            menu = body.querySelector(menuSelector),
            transitionDelay = 300,
            mobileMenuMax = 1024,
            singlePage = true;

        let windowOffset = 0;

        const toggleDocumentScroll = (disable) => {
            if (window.innerWidth <= mobileMenuMax) {
                if (disable) {
                    document.ontouchmove = function(e) {
                        e.preventDefault();
                    };
                } else {
                    document.ontouchmove = function() {
                        return true;
                    };
                }

            } else {
                document.ontouchmove = function() {
                    return true;
                };
            }
        };

        const openMenu = () => {
            body.classList.add(openMenuClass);
            windowOffset = window.pageYOffset;
            toggleDocumentScroll(true);
        };

        const closeMenu = () => {
            body.classList.remove(openMenuClass);
            toggleDocumentScroll(false);
        };

        const getMenuState = () => body.classList.contains(openMenuClass);

        const toggleMenu = () => {
            body.classList.contains(openMenuClass) ? closeMenu() : openMenu();
            window.scroll(0, windowOffset);
        };

        const menuClick = () => {
            setTimeout(() => {
                closeMenu();
            }, transitionDelay);
        };

        const menuScrollClassToggle = () => {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > menuScrolledOffset) {
                    document.body.classList.add(menuScrolledClass);
                } else {
                    document.body.classList.remove(menuScrolledClass);
                }
            });
        };

        const onResize = () => {
            window.addEventListener('resize', () => {
                if (window.innerWidth > mobileMenuMax) {
                    toggleDocumentScroll(false);
                    body.classList.remove(openMenuClass);
                }
            });
        };

        const addEvents = () => {
            onResize();
            menuScrollClassToggle();
            button.addEventListener('click', toggleMenu);
            if (singlePage) {
                Array.prototype.slice.call(menu.childNodes).map((link) => link.addEventListener('click', menuClick));
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
