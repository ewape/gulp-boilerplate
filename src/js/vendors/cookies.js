(() => {

    "use strict";

    const cookies = (() => {

        const options = {
            text: 'Strona stosuje pliki cookies. Korzystanie ze strony oznacza zgodę na wykorzystanie plików cookies zgodnie z',
            linkLabel: 'Polityką cookies',
            acceptLabel: 'Akceptuj',
            containerId: 'cookies-message-container',
            acceptId: 'accept-cookies',
            acceptedSlug: 'cookies-accepted',
            btnClasses: 'btn cookies-accept-btn',
            url: 'cookies-url'
        };

        const readCookie = () => localStorage.getItem(options.acceptedSlug);

        const setCookie = () => {
            let acceptBtn = document.getElementById(options.acceptId),
                messageContainer = document.getElementById(options.containerId);

            acceptBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem(options.acceptedSlug, 1);
                messageContainer.classList.add(options.acceptedSlug);
            });
        };

        const addCookieMessage = () => {
            let messageContainer = document.createElement('div');
            messageContainer.setAttribute('id', options.containerId);
            messageContainer.setAttribute('class', options.containerId);

            let htmlCode = `<div class="container cookies-container"><p class="cookies-message-text">` +
                `${options.text} ` +
                `<a class="cookies-link" target="_blank" href="${location.protocol}//${location.host}${options.url}">` +
                options.linkLabel +
                `</a>. </p><button type="button" id="${options.acceptId}" class="${options.btnClasses}">` +
                options.acceptLabel +
                `</button></div>`;

            messageContainer.innerHTML = htmlCode;
            document.body.appendChild(messageContainer);
            setCookie();
        };

        const checkCookiesAccepted = () => {
            let cookie = readCookie();
            if (cookie === null) {
                addCookieMessage();
            }
        };

        const init = () => checkCookiesAccepted();

        return {
            init
        };

    })();

    cookies.init();

})();