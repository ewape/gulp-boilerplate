(() => {

    "use strict";

    const scrolling = (() => {

        const $menu = $('.main-menu'),
            linkActiveClass = 'active',
            $menuLinks = $menu.find('a:not(.btn)'),
            $scrollRoot = $('html, body'),

            getHeaderHeight = () => {
                return document.querySelector('.main-header').offsetHeight;
            };

        let utmParams = location.search,
            entryHash = location.hash;

        const anchorScroll = () => {
            let $mainSection = $('.section-main');

            $(document).on('click', '.main-header a', function(e) {
                e.preventDefault();
                let targetSection = $(this.hash).length ? $(this.hash) : $mainSection,
                    offset = targetSection.offset().top - getHeaderHeight();

                $scrollRoot.animate({
                    scrollTop: offset
                }, 500);
            });
        };

        const locationChange = (section) => {
            if (utmParams) {
                utmParams = false;
                return;
            }

            let sectionHash = section[0].id ? '#' + section[0].id : window.location.pathname;

            if (window.history && window.history.replaceState) {
                history.replaceState(null, null, sectionHash);
            } else {
                location.hash = sectionHash;
            }
        };

        const setActiveLink = (hash) => {
            $menuLinks.map((i, el) => {
                if (el.hash === hash || (!el.hash && hash === '#')) {
                    el.classList.add(linkActiveClass);
                } else {
                    el.classList.remove(linkActiveClass);
                }
            });
        };

        const setWatchers = (sections) => {
            sections.map((section) => {
                let elementWatcher = scrollMonitor.create(section, -getHeaderHeight());

                elementWatcher.enterViewport(function() {
                    setActiveLink('#' + this.watchItem.id);
                    locationChange(section);
                });

            });
        };

        const setActiveSection = () => {
            const sections = [$('.section-main')];

            $menuLinks.map((i, el) => {
                let $section = $(el.hash);
                if ($section.length) {
                    sections.push($section);
                }
            });

            if (entryHash) {
                setActiveLink(entryHash);
                entryHash = false;
            }

            setWatchers(sections);

        };

        const init = () => {
            anchorScroll();
            setActiveSection();
        };

        return {
            init
        };

    })();

    scrolling.init();

})();
