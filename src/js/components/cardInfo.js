import createModal from './modals';
import Counter from './counter';

export default class CardInfo {
    constructor(selector) {
        this.container = selector;

        this.bind();
    }

    bind() {
        this.container.querySelectorAll('.js-product-card-view')
            .forEach(button => button.addEventListener('click', e => this.initProductCardModal(e)));

        this.container.querySelectorAll('.js-add-product-to-favorite')
            .forEach(item => item.addEventListener('click', e => this.addProductToFavorite(e)));
    }

    addProductToFavorite(e) {
        if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
        } else {
            e.currentTarget.classList.add('active');
        }
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

        const activeModalButtonClose = document.querySelector('.tingle-modal--visible .tingle-modal__close');
        const activeModalLayout = document.querySelector('.tingle-modal--visible .tingle-modal-box');
        activeModalButtonClose.style.left = activeModalLayout.offsetWidth / 2 - 30 + 'px';
    }
}