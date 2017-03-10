(function() {
    "use strict";

    var app = app || {};

    app.cookies = (function() {

        var cookiesMessage = {
            text: 'Strona stosuje pliki cookies. Korzystanie ze strony oznacza zgodę na wykorzystanie plików cookies zgodnie z',
            acceptLabel: 'Akceptuj',
            linkLabel: 'Polityką cookies',
            containerId: 'cookies-message-container',
            acceptId: 'accept-cookies',
            url: 'cookies-url'
        };

        function readCookie() {
            return localStorage.getItem('cookies-accepted');
        }

        function setCookie() {
            var acceptBtn = document.getElementById(cookiesMessage.acceptId),
                messageContainer = document.getElementById(cookiesMessage.containerId);
            acceptBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.setItem('cookies-accepted', 1);
                messageContainer.classList.add('cookies-accepted');
            });
        }

        function addCookieMessage() {
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
        }

        function checkCookiesAccepted() {
            var cookie = readCookie();
            if (cookie === null) {
                addCookieMessage();
            }
        }

        function init() {
            checkCookiesAccepted();
        }

        return {
            init: init
        };

    })();

})();