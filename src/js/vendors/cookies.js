(() => {

    "use strict";

    const cookies = (() => {

        const options = {
            text: 'Strona stosuje pliki cookies. Korzystanie ze strony oznacza zgodę na wykorzystanie plików cookies zgodnie z',
            linkLabel: 'Polityką cookies',
            btnClasses: 'btn cookies-accept-btn',
            btnId: 'accept-cookies',
            btnLabel: 'Akceptuj',
            containerId: 'cookies-message-container',
            cookieKey: 'cookies-accepted',
            policyUrl: '/cookies-policy.html'
        };

        const readCookie = () => window.localStorage.getItem(options.cookieKey);

        const setCookie = () => {
            let acceptBtn = document.getElementById(options.btnId),
                messageContainer = document.getElementById(options.containerId);

            acceptBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.localStorage.setItem(options.cookieKey, 1);
                messageContainer.classList.add(options.cookieKey);
            });
        };

        const addCookieMessage = () => {
            let messageContainer = document.createElement('div');

            messageContainer.setAttribute('id', options.containerId);
            messageContainer.setAttribute('class', options.containerId);

            let htmlCode = `<div class="container cookies-container"><p class="cookies-message-text">` +
                `${options.text} ` +
                `<a class="cookies-link" target="_blank" href="${location.protocol}//${location.host}${options.policyUrl}">` +
                options.linkLabel +
                `</a>. </p><button type="button" id="${options.btnId}" class="${options.btnClasses}">` +
                options.btnLabel +
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
