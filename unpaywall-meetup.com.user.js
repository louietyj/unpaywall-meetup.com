// ==UserScript==
// @name         Unpaywall meetup.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove paywall, unblur photos, enable scrolling, and re-enable dynamic content
// @author       louietyj
// @match        https://www.meetup.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/louietyj/unpaywall-meetup.com/main/unpaywall-meetup.com.user.js
// @updateURL    https://raw.githubusercontent.com/louietyj/unpaywall-meetup.com/main/unpaywall-meetup.com.user.js
// ==/UserScript==

(function() {
    'use strict';

    function unPaywall() {
        document.querySelectorAll('div#modal').forEach(el => {
            if (el.textContent.includes('Join Meetup+')) {
                el.style.display = 'none';
            }
        });
    }

    function unblurPhotos() {
        const elements = document.querySelectorAll('.blur-sm');
        elements.forEach(element => {
            element.classList.remove('blur-sm');
        });
    }

    function enableScrolling() {
        const style = document.createElement('style');
        style.textContent = `
            html, body {
                overflow: auto !important;
                overflow-y: auto !important;
                position: static !important;
                height: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    function removeLocks() {
        const svgs = document.querySelectorAll('svg[data-src="https://secure.meetupstatic.com/next/images/design-system-icons/lock-outline.svg"]');
        svgs.forEach(svg => {
            svg.remove();
        });
    }

    function removeInert() {
        document.querySelectorAll('.inert, [inert]').forEach(el => {
            el.classList.remove('inert');
            el.removeAttribute('inert');
        });
    };

    function run() {
        unPaywall();
        unblurPhotos();
        enableScrolling();
        removeLocks();
        removeInert();
    }

    //window.addEventListener('load', run);
    const observer = new MutationObserver(run);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
