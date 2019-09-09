import {_addEvent, _ready} from '../helpers';
import Swiper from 'swiper';
// eslint-disable-next-line no-unused-vars
import merge from 'lodash';

export default function () {
    const mainSliderClass = '.slider-top';
    const tizersSliderClass = '.content-categoriesTizers';
    const newProductsSliderClass = '.newProducts';
    const stockTizersSliderClass = '.stockTizers';
    const needTakeSliderClass = '.needTake';
    const lastStockSliderClass = '.lastStock';
    const forYouSliderClasss = '.forYou';
    const brandsSliderClass1Line = '.brands.line1';
    const brandsSliderClass2Line = '.brands.line2';
    const bottomSliderClass = '.bottomSlider-container';
    const currentWidth = window.innerWidth;
    const maxWidthForSliderTizers = 768;
    const widthShow4Tizer = 992;
    _ready(function () {
        // eslint-disable-next-line no-unused-vars
        let swipers = new Swiper('.swiper-container', {
            init: false
        });

        /**Cлайдер на главной*/
        let mainSliderParams = {
            loop: true,
            spaceBetween: 0,
            autoplay: {
                enabled: false,
                delay: 2000
            },
            pagination: {
                clickable: true
            }
        };
        if (document.querySelector(mainSliderClass) !== null) {
            let mainSlider = document.querySelector(mainSliderClass).swiper;
            _.merge(mainSlider.params, _.merge(mainSliderParams,
                {
                    pagination: {
                        el: document.querySelector('.slider-top-pagination')
                    },
                    navigation: {
                        nextEl: '.slider-top-next',
                        prevEl: '.slider-top-prev'
                    }
                })
            );
            mainSlider.init();
        }

        /**слайдер тизеров**/
        if (document.querySelector(tizersSliderClass) !== null) {
            let tizersCategoriesSlider = document.querySelector(tizersSliderClass).swiper;
            let tizersCategoriesSliderParams = {
                speed: 1100,
                spaceBetween: 8,
                slidesPerView: 'auto'
            };
            _.merge(tizersCategoriesSlider.params, tizersCategoriesSliderParams);
            let tizers = document.getElementsByClassName('content-categoriesTizers-item');
            let lastTizer = tizers[tizers.length - 1];

            if (currentWidth < maxWidthForSliderTizers) {
                tizersCategoriesSlider.init();
            } else if (currentWidth >= widthShow4Tizer) {
                lastTizer.style.display = 'flex';
            } else {
                lastTizer.style.display = 'none';
            }
            _addEvent(window, 'resize', function (event) {
                let currentWidth = window.innerWidth;
                console.log(currentWidth);
                if (currentWidth < maxWidthForSliderTizers) {
                    tizersCategoriesSlider.init();
                } else if (currentWidth >= widthShow4Tizer) {
                    lastTizer.style.display = 'flex';
                } else {
                    lastTizer.style.display = 'none';
                    tizersCategoriesSlider.destroy();
                }
            });
        }

        /**слайдер новинок**/
        let productSliderParams = {
            loop: true,
            spaceBetween: -19,
            loopedSlides: 10,
            breakpoints: {
                1100: {
                    slidesPerView: 'auto',
                    spaceBetween: 2
                },
                2560: {
                    slidesPerView: 4
                }
            }
        };
        if (document.querySelector(newProductsSliderClass) !== null) {
            let newProductsSlider = document.querySelector(newProductsSliderClass).swiper;
            _.merge(newProductsSlider.params, _.merge(productSliderParams,
                {
                    navigation: {
                        nextEl: '.newProducts-next',
                        prevEl: '.newProducts-prev'
                    }
                })
            );
            newProductsSlider.init();
        }

        /**слайдер акций**/
        let stockSliderParams = {
            loop: false,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 1.1
                },
                2560: {
                    slidesPerView: 2
                }

            }
        };
        if (document.querySelector(stockTizersSliderClass)) {
            let stockTizersSlider = document.querySelector(stockTizersSliderClass).swiper;

            _.merge(stockTizersSlider.params, _.merge(stockSliderParams, {
                //breakpointsInverse: true,
                slidesPerView: 2,
                spaceBetween: 10,
                breakpoints: {
                    768: {
                        slidesPerView: 1.1
                    }
                }
            }));
            stockTizersSlider.init();
        }
        /**слайдер "Надо брать"**/
        if (document.querySelector(needTakeSliderClass)) {
            let needTakeSlider = document.querySelector(needTakeSliderClass).swiper;
            _.merge(needTakeSlider.params, _.merge(productSliderParams,
                {
                    navigation: {
                        nextEl: '.needTake-next',
                        prevEl: '.needTake-prev'
                    }
                }));
            needTakeSlider.init();
        }

        /**слайдер Последних акций**/
        /**слайдер акций**/
        let stockSliderParamsLast = {
            loop: false,
            spaceBetween: 40,
            /*autoplay: {
                enabled: true,
                delay: 3000,
            },*/
            breakpoints: {
                1100: {
                    slidesPerView: 'auto',
                    loopedSlides: 4,
                    loop: true
                },
                2560: {
                    slidesPerView: 4
                }

            }
        };
        if (document.querySelector(lastStockSliderClass) !== null) {
            let lastStockSlider = document.querySelector(lastStockSliderClass).swiper;
            _.merge(lastStockSlider.params, _.merge(stockSliderParamsLast,
                {
                    navigation: {
                        nextEl: '.lastStock-next',
                        prevEl: '.lastStock-prev'
                    }
                }));
            lastStockSlider.init();
        }

        /**слайдер "Только для тебя"**/
        if (document.querySelector(forYouSliderClasss) !== null) {
            let forYouSlider = document.querySelector(forYouSliderClasss).swiper;
            _.merge(forYouSlider.params, _.merge(productSliderParams,
                {
                    navigation: {
                        nextEl: '.forYou-next',
                        prevEl: '.forYou-prev'
                    }
                }));
            forYouSlider.init();
        }
        /**слайдер Брендов 1 линия**/
        let brandsSliderParams = {
            spaceBetween: 8,
            autoplay: {
                enabled: true,
                delay: 0
            },
            speed: 2000,
            loop: true,
            breakpoints: {
                1100: {
                    slidesPerView: 'auto'
                },
                2560: {
                    slidesPerView: 6
                }
            },
            loopedSlides: 6
        };
        if (document.querySelector(brandsSliderClass1Line) !== null) {
            let brandsSlider1line = document.querySelector(brandsSliderClass1Line).swiper;
            _.merge(brandsSlider1line.params, _.merge(brandsSliderParams,
                {
                    navigation: {
                        nextEl: '.brands-next',
                        prevEl: '.brands-prev'
                    }
                })
            );
            brandsSlider1line.init();
        }

        /**слайдер Брендов 2 линия**/
        if (document.querySelector(brandsSliderClass2Line) !== null) {
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
        }

        /**Слайдер внизу**/
        if (document.querySelector(bottomSliderClass) !== null) {
            let bottomSlider = document.querySelector(bottomSliderClass).swiper;
            _.merge(bottomSlider.params, _.merge(mainSliderParams,
                {
                    pagination: {
                        el: document.querySelector('.bottomSlider-container-pagination')
                    },
                    navigation: {
                        nextEl: '.bottomSlider-next',
                        prevEl: '.bottomSlider-prev'
                    }
                })
            );
            bottomSlider.init();
        }
    });
}