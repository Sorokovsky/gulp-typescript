"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebp = exports.headerScroll = exports.paralaxOnMove = exports.mobileMenu = exports.closePopub = exports.openPopub = void 0;
const variables_js_1 = require("./variables.js");
function openPopub(popub) {
    if (!popub.classList.contains('_active')) {
        popub.classList.add('_active');
    }
}
exports.openPopub = openPopub;
function closePopub(popub) {
    if (popub.classList.contains('_active')) {
        popub.classList.remove('_active');
    }
}
exports.closePopub = closePopub;
const burgerToggle = () => {
    if (variables_js_1.burger.classList.contains("_active")) {
        variables_js_1.burger.classList.remove("_active");
        document.body.classList.remove("_lock");
        variables_js_1.burger.children[0].classList.remove("_active");
        closePopub(variables_js_1.menu);
    }
    else if (!variables_js_1.burger.classList.contains("_active")) {
        variables_js_1.burger.classList.add("_active");
        document.body.classList.add("_lock");
        variables_js_1.burger.children[0].classList.add("_active");
        openPopub(variables_js_1.menu);
    }
};
const mobileMenu = () => {
    if (window.innerWidth <= 991) {
        variables_js_1.burger.addEventListener('click', burgerToggle);
    }
};
exports.mobileMenu = mobileMenu;
function paralaxOnMove(paralax) {
    if (window.innerWidth >= 991) {
        let centerX = window.innerWidth / 2, centerY = window.innerHeight / 2, paralaxX = 30, speed = 0.23, paralaxY = -30;
        paralax.style.transform = `translate(${paralaxX}px, ${paralaxY}px)`;
        document.addEventListener('mousemove', (e) => {
            if (e.clientX < centerX) {
                paralaxX = paralaxX - speed;
            }
            else if (e.clientX > centerX) {
                paralaxX = paralaxX + speed;
            }
            if (e.clientY > centerY) {
                paralaxY = paralaxY + speed;
            }
            else if (e.clientY < centerY) {
                paralaxY = paralaxY - speed;
            }
            paralax.style.transform = `translate(${paralaxX}px, ${paralaxY}px)`;
            centerY = e.clientY;
            centerX = e.clientX;
        });
    }
}
exports.paralaxOnMove = paralaxOnMove;
const headerScroll = () => {
    headerFix();
    document.addEventListener('scroll', headerFix);
};
exports.headerScroll = headerScroll;
function headerFix() {
    let headerHeight = Number(window.getComputedStyle(variables_js_1.header, null).getPropertyValue("height").replace("px", "")) / 2;
    if (window.scrollY > headerHeight) {
        console.log(window.scrollY >= headerHeight);
        variables_js_1.header.classList.add("fixed");
    }
    else {
        variables_js_1.header.classList.remove("fixed");
    }
}
function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        }
        else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}
exports.isWebp = isWebp;
