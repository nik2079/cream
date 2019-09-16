import 'simplebar';
import DoubleRangeInput from './sliders/doubleRangeInputSlider';
import Roller from './components/Roller';
import tippy from 'tippy.js';
import TopMenuController from './header/topMenu';
import MobileMenuController from './header/mobileMenu';
import HeaderController from './header/header';
import FooterController from './footer';
import CardInfo from './components/cardInfo';

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


        this.container.querySelectorAll('.js-order-filter-item')
            .forEach(item => item.addEventListener('click', e => this.handleOrderFilterElement(e)));
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

    handleOrderFilterElement(e) {
        if (e.currentTarget.classList.contains('active')) {
            if (e.currentTarget.classList.contains('up')) {
                e.currentTarget.classList.remove('up');
            } else {
                e.currentTarget.classList.add('up');
            }
        } else {
            this.container.querySelectorAll('.' + e.currentTarget.classList[0]).forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.classList.remove('up');
                }
            });
            e.currentTarget.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TopMenuController(document.querySelector('.topMenu'));
    new MobileMenuController(document.querySelector('#js-mobileMenu'));
    new HeaderController(document.querySelector('.header'));
    new FooterController(document.querySelector('.footer'));

    if (document.querySelector('.js-catalog-page-container')) {
        new CardInfo(document.querySelector('.js-catalog-page-container'));
        new CatalogPageController(document.querySelector('.js-catalog-page-container'));
    }
});