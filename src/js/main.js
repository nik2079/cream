import Promise from 'promise-polyfill';
import 'es6-object-assign/auto';
import sliders from './sliders/sliders';
//import {_ready} from './helpers';
//import addEvent from './helpers/_addEvent'; //opject assign polyfill
import tippy from 'tippy.js';
//import { MDCTextField } from '@material/textfield';
import TopMenuController from './header/topMenu';
import MobileMenuController from './header/mobileMenu';
import HeaderController from './header/header';
import FooterController from './footer';
import CardInfo from './components/cardInfo';

class MainPageController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;

        this.init();
    }

    init() {
        this.initPopupCategories();
    }

    initPopupCategories() {
        const buttonPopupCategories = document.getElementById('js-popupCategories');
        const popupCategoriesContent = document.getElementById('js-popupCategoriesContent');
        buttonPopupCategories.addEventListener('click', () => { popupCategoriesContent.style.display = 'block'; });
        tippy(buttonPopupCategories, {
            content: popupCategoriesContent,
            arrow: true,
            interactive: true,
            placement: 'bottom-end',
            theme: 'light-border',
            arrowType: 'round',
            a11y: false,
            trigger: 'click'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TopMenuController(document.querySelector('.topMenu'));
    new MobileMenuController(document.querySelector('#js-mobileMenu'));
    new HeaderController(document.querySelector('.header'));
    new FooterController(document.querySelector('.footer'));

    if (document.querySelector('.js-main-page-container')) {
        new CardInfo(document.querySelector('.js-main-page-container'));
        new MainPageController(document.querySelector('.js-main-page-container'));
    }
});

if (!window.Promise) {
    window.Promise = Promise;
}

sliders();