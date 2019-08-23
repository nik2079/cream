import '../stylesheets/all.scss';
import Promise from 'promise-polyfill';
import 'es6-object-assign/auto'; //opject assign polyfill

import Swiper from 'swiper';
import ready from './helpers/_ready';

if (!window.Promise) {
    window.Promise = Promise;
}
ready(function () {
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
    console.log(swiper);
});