(function() {

    "use strict";

    const cookies = (() => {

        const cookiesMessage = {
            text: 'Strona stosuje pliki cookies. Korzystanie ze strony oznacza zgodę na wykorzystanie plików cookies zgodnie z',
            acceptLabel: 'Akceptuj',
            linkLabel: 'Polityką cookies',
            containerId: 'cookies-message-container',
            acceptId: 'accept-cookies',
            acceptedSlug: 'cookies-accepted',
            url: 'cookies-url'
        };

        const readCookie = () => localStorage.getItem(cookiesMessage.acceptedSlug);

        const setCookie = () => {
            var acceptBtn = document.getElementById(cookiesMessage.acceptId),
                messageContainer = document.getElementById(cookiesMessage.containerId);

            acceptBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.setItem(cookiesMessage.acceptedSlug, 1);
                messageContainer.classList.add(cookiesMessage.acceptedSlug);
            });
        };

        const addCookieMessage = () => {
            var messageContainer = document.createElement('div');
            messageContainer.setAttribute('id', cookiesMessage.containerId);
            messageContainer.setAttribute('class', cookiesMessage.containerId);
            var htmlCode = '<div class="container cookies-container"><p class="cookies-message-text">' +
                cookiesMessage.text +
                ' <a class="cookies-link" target="_blank" href="' + location.protocol + '//' + location.host + cookiesMessage.url + '">' + cookiesMessage.linkLabel +
                '</a>. </p><button type="button" id="' + cookiesMessage.acceptId + '" class="btn cookies-accept-btn">' +
                cookiesMessage.acceptLabel +
                '</button></div>';

            messageContainer.innerHTML = htmlCode;
            document.body.appendChild(messageContainer);
            setCookie();
        };

        const checkCookiesAccepted = () => {
            var cookie = readCookie();
            if (cookie === null) {
                addCookieMessage();
            }
        };

        const init = () => checkCookiesAccepted();

        return {
            init: init
        };

    })();

    cookies.init();

})();