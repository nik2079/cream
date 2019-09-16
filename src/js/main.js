import Promise from 'promise-polyfill';
import 'es6-object-assign/auto';
import sliders from './sliders/sliders';
//import {_ready} from './helpers';
//import addEvent from './helpers/_addEvent'; //opject assign polyfill
import tippy from 'tippy.js';
import createModal from './components/modals';
import Counter from './components/counter';
//import { MDCTextField } from '@material/textfield';
import TopMenuController from './header/topMenu';
import MobileMenuController from './header/mobileMenu';
import HeaderController from './header/header';
import FooterController from './footer';

class MainPageController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;

        this.init();
        this.bind();
    }

    init() {
        this.initPopupCategories();
    }

    bind() {
        this.container.querySelectorAll('.js-product-card-view')
            .forEach(button => button.addEventListener('click', e => this.initProductCardModal(e)));
    }

    initPopupCategories() {
        tippy(document.getElementById('js-popupCategories'), {
            content: document.getElementById('js-popupCategoriesContent'),
            arrow: true,
            interactive: true,
            placement: 'bottom-end',
            theme: 'light-border',
            arrowType: 'round',
            a11y: false,
            trigger: 'click'
        });
    }

    initProductCardModal(e) {
        const cardData = JSON.parse(e.currentTarget
            .closest('.js-product-card')
            .querySelector('.js-product-card-template')
            .innerHTML);

        const modalContainer = document.getElementById('modalFastProductView');
        const modal = createModal(
            false,
            'js-product-card-view',
            modalContainer,
            () => {
                //
            },
            () => {
                const modalPrices = modalContainer.querySelector('.js-prices');
                modalContainer.style.display = 'flex';
                modalContainer.querySelector('.js-image').src = cardData.image;
                modalContainer.querySelector('.js-title').innerHTML = cardData.title;
                modalContainer.querySelector('.js-description').innerHTML = cardData.description;
                modalContainer.querySelector('.js-reviews').innerHTML = cardData.reviews;
                modalContainer.querySelector('.js-art-num').innerHTML = cardData.art_num;
                modalContainer.querySelector('.js-rating').setAttribute('data-card-rate', cardData.rating);
                modalPrices.innerHTML = '';

                cardData.price_list.forEach((item) => {
                    const priceType = document.createElement('tr');
                    const priceTitle = document.createElement('td');
                    const priceValue = document.createElement('td');
                    const priceCondition = document.createElement('td');

                    priceTitle.classList.add('prices__item_title');
                    priceTitle.innerHTML = item.title;
                    priceValue.classList.add('prices__item_price');
                    priceValue.innerHTML = item.price;
                    priceCondition.classList.add('prices__item_condition');
                    priceCondition.innerHTML = item.condition;

                    priceType.classList.add('prices__item');
                    priceType.setAttribute('data-availability', item.availability);
                    priceType.appendChild(priceTitle);
                    priceType.appendChild(priceValue);
                    priceType.appendChild(priceCondition);

                    modalPrices.appendChild(priceType);
                });
            }
        );

        new Counter('.js-product-counter');

        modalContainer.querySelector('.js-copy-code-button').addEventListener('click', () => {
            const text = modalContainer.querySelector('.js-promo-code');
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);

            document.execCommand('copy');
        });

        modal.open();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TopMenuController(document.querySelector('.topMenu'));
    new MobileMenuController(document.querySelector('#js-mobileMenu'));
    new HeaderController(document.querySelector('.header'));
    new FooterController(document.querySelector('.footer'));

    if (document.querySelector('.js-main-page-container')) {
        new MainPageController(document.querySelector('.js-main-page-container'));
    }
});

if (!window.Promise) {
    window.Promise = Promise;
}

sliders();