import ready from "../helpers/_ready";
import Swiper from "swiper";
import merge from 'lodash';

export default function () {
    const mainSliderClass = '.main-slider';
    const tizersSliderClass = '.categoriesTizers';
    const newProductsSliderClass = '.newProducts';
    const stockTizersSliderClass = '.stockTizers';
    const needTakeSliderClass = '.needTake';
    const lastStockSliderClass = '.lastStock';
    const forYouSliderClasss = '.forYou';
    const brandsSliderClass1Line = '.brands.line1';
    const brandsSliderClass2Line = '.brands.line2';
    const bottomSliderClass = '.bottom-slider';
    ready(function () {
        let swipers = new Swiper('.swiper-container', {
            init: false
        });

        /**собираем слайдер на главной*/
        let mainSlider = document.querySelector(mainSliderClass).swiper;
        let mainSliderParams = {
            loop: true,
            spaceBetween: 0,
            autoplay: {
                enabled: true,
                delay: 2000,
            },
            pagination: {
                clickable: true,
            }
        }
        _.merge(mainSlider.params, _.merge(mainSliderParams,
            {
                pagination: {
                    el: document.querySelector('.main-slider-pagination')
                }
            })
        );
        mainSlider.init();


        /**слайдер тизеров**/
        let tizersCategoriesSlider = document.querySelector(tizersSliderClass).swiper;
        let tizersCategoriesSliderParams = {
            loop: true,
            slidesPerView: 2.2,
            spaceBetween: 8,
            loopedSlides: 4
        };
        _.merge(tizersCategoriesSlider.params, tizersCategoriesSliderParams);
        tizersCategoriesSlider.init();

        /**слайдер новинок**/
        let newProductsSlider = document.querySelector(newProductsSliderClass).swiper;
        let productSliderParams = {
            loop: true,
            spaceBetween: 30,
            loopedSlides: 10,
            breakpoints: {
                320: {
                    slidesPerView: 1.3
                },
                480: {
                    slidesPerView: 2.1
                },
                640: {
                    slidesPerView: 2.8
                },
                768: {
                    slidesPerView: 2.8
                },
                1440: {
                    slidesPerView: 4
                },
                1920: {
                    slidesPerView: 4
                }

            }
        };
        _.merge(newProductsSlider.params, productSliderParams);
        newProductsSlider.init();

        /**слайдер акций**/
        let stockTizersSlider = document.querySelector(stockTizersSliderClass).swiper;
        let stockSliderParams = {
            loop: true,
            slidesPerView: 1.05,
            spaceBetween: 10,
            loopedSlides: 4,
            autoplay: {
                enabled: true,
                delay: 3000,
            },
        }
        _.merge(stockTizersSlider.params, stockSliderParams);
        stockTizersSlider.init();

        /**слайдер "Надо брать"**/
        let needTakeSlider = document.querySelector(needTakeSliderClass).swiper;
        _.merge(needTakeSlider.params, productSliderParams);
        needTakeSlider.init();

        /**слайдер Последних акций**/
        let lastStockSlider = document.querySelector(lastStockSliderClass).swiper;
        _.merge(lastStockSlider.params, stockSliderParams);
        lastStockSlider.init();

        /**слайдер "Только для тебя"**/
        let forYouSlider = document.querySelector(forYouSliderClasss).swiper;
        _.merge(forYouSlider.params, productSliderParams);
        forYouSlider.init();

        /**слайдер Брендов 1 линия**/
        let brandsSlider1line = document.querySelector(brandsSliderClass1Line).swiper;
        let brandsSliderParams = {
            spaceBetween: 8,
            slidesPerView: 2.1,
            autoplay: {
                enabled: true,
                delay: 3000,
            },
            loop: true,
            loopedSlides: 20
        };
        _.merge(brandsSlider1line.params, brandsSliderParams);
        brandsSlider1line.init();

        /**слайдер Брендов 2 линия**/
        let brandsSlider2line = document.querySelector(brandsSliderClass2Line).swiper;
        /**прикрепляем реверс**/
        _.merge(brandsSlider2line.params, _.merge(brandsSliderParams,
            {
                autoplay: {
                    reverseDirection: true
                }
            })
        );
        brandsSlider2line.init();

        /**Слайдер внизу**/
        let bottomSlider = document.querySelector(bottomSliderClass).swiper;
        _.merge(bottomSlider.params, _.merge(mainSliderParams,
            {
                pagination: {
                    el: document.querySelector('.bottom-slider-pagination')
                }
            })
        );
        bottomSlider.init();
    });
}