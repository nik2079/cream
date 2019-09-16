import 'simplebar';
import DoubleRangeInput from './sliders/doubleRangeInputSlider';
import Roller from './components/Roller';
import tippy from 'tippy.js';
import createModal from './components/modals';
import Counter from './components/counter';

class CatalogPageController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;
        this.filterLists = this.container.querySelector('.js-filter-lists');
        this.dynamicShowFilterLabel = this.container.querySelector('.js-dynamic-show-filter-label');

        this.init();
        this.bind();
    }

    bind() {
        document.body.addEventListener('click', e => this.hideDynamicShowFilterButtonByOuterClick(e));

        this.container.querySelectorAll('.js-checkbox-item')
            .forEach(item => item.addEventListener('click', e => this.showDynamicShowFilterButton(e)));

        this.container.querySelector('.js-filter-lists-button-reset')
            .addEventListener('click', () => this.resetFilters());

        this.container.querySelector('.js-add-product-to-favorite')
            .addEventListener('click', e => this.addProductToFavorite(e));

        this.container.querySelectorAll('.js-product-card-view')
            .forEach(button => button.addEventListener('click', e => this.initProductCardModal(e)));
    }

    init() {
        this.initRageSlider();
        this.initFilterLists();
        this.initCategoriesPopup();
        this.initPriceInfoTooltip();
    }

    initCategoriesPopup() {
        const moreCategoriesContainer = this.container.querySelector('.js-more-categories-container');

        moreCategoriesContainer.style.display = 'block';

        tippy(this.container.querySelector('.js-more-categories'), {
            content: moreCategoriesContainer,
            arrow: true,
            interactive: true,
            placement: 'bottom-end',
            theme: 'light-border',
            arrowType: 'round',
            hideOnClick: 'toggle',
            a11y: false,
            trigger: 'click'
        });
    }

    initPriceInfoTooltip() {
        tippy(document.querySelector('.js-price-tooltip'), {
            content: document.querySelector('.js-price-tooltip-container'),
            arrow: true,
            interactive: true,
            placement: 'bottom-end',
            theme: 'light-border',
            arrowType: 'round',
            hideOnClick: 'toggle',
            a11y: false,
            trigger: 'click',
            onTrigger: (el, evt) => {
                console.log('fuuuuuuck', el, evt);
            }
        });
    }

    initRageSlider() {
        const rangeSliderContainer = this.container.querySelector('.js-filter-price');
        const lowLabel = rangeSliderContainer.querySelector('.js-low-price-value');
        const highLabel = rangeSliderContainer.querySelector('.js-high-price-value');

        new DoubleRangeInput(rangeSliderContainer.querySelector('.js-price-range-slider'), {
            min: parseInt(rangeSliderContainer.getAttribute('data-min-value')),
            max: parseInt(rangeSliderContainer.getAttribute('data-max-value')),
            onChange: (valueLow, valueHigh) => {
                lowLabel.value = valueLow;
                highLabel.value = valueHigh;
            }
        });
    }

    initFilterLists() {
        new Roller('#filterRollListCategory');
        new Roller('#filterRollListBrand');
    }

    hideDynamicShowFilterButtonByOuterClick(e) {
        const dynamicShowFilterLabelClass = this.dynamicShowFilterLabel.classList[0];
        const filterListsClass = this.filterLists.classList[0];
        const isNotFiltersElements = !e.target.matches(`.${filterListsClass}, .${filterListsClass} *`);
        const isNotSelf = !e.target.matches(`.${dynamicShowFilterLabelClass}, .${dynamicShowFilterLabelClass} *`);

        if (isNotFiltersElements && isNotSelf) {
            this.dynamicShowFilterLabel.style.display = 'none';
        }
    }

    showDynamicShowFilterButton(e) {
        const parent = e.currentTarget.closest('.js-roll-list');
        const counter = this.dynamicShowFilterLabel.querySelector('.js-filter-total-count');
        const parentPosition = parent.getBoundingClientRect();
        let count = 0;

        counter.html = this.filterLists.querySelectorAll('input:checked').forEach((input) => {
            count += parseInt(input.closest('.js-checkbox-item').getAttribute('data-filter-item-count'));
        });

        this.dynamicShowFilterLabel.style.left = (parentPosition.left + parentPosition.width) + 'px';
        this.dynamicShowFilterLabel.style.top = (parentPosition.top + pageYOffset + 50) + 'px';

        if (count > 0) {
            counter.innerText = count;

            if (this.dynamicShowFilterLabel.style.display === 'none') {
                this.dynamicShowFilterLabel.style.display = 'flex';
            }
        } else {
            this.dynamicShowFilterLabel.style.display = 'none';
        }
    }

    resetFilters() {
        if (this.dynamicShowFilterLabel.style.display !== 'none') {
            this.dynamicShowFilterLabel.style.display = 'none';
        }

        this.filterLists.querySelectorAll('input:checked').forEach((input) => {
            input.checked = false;
        });
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
            'js-product-card-view',
            modalContainer,
            () => {
                //
            },
            () => {
                const modalPrices = modalContainer.querySelector('.js-prices');

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
    if (document.querySelector('.js-catalog-page-container')) {
        new CatalogPageController(document.querySelector('.js-catalog-page-container'));
    }
});