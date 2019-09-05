import {_addEvent, _ready} from "../helpers";
import Swiper from "swiper";
import merge from 'lodash';


export default function () {
    const mainSliderClass = '.slider-top';
    const tizersSliderClass = '.content-categoriesTizers';
    const newProductsSliderClass = '.newProducts';
    const needTakeSliderClass = '.needTake';
    const forYouSliderClasss = '.forYou';
    const brandsSliderClass1Line = '.brands.line1';
    const brandsSliderClass2Line = '.brands.line2';
    const bottomSliderClass = '.bottomSlider-container';
    const currentWidth = window.innerWidth;
    const maxWidthForSliderTizers = 768;
    const widthShow4Tizer = 992;
    _ready(function () {

        let swipers = new Swiper('.swiper-container', {
            init: false
        });

        /**Cлайдер на главной*/
        let mainSliderParams = {
            loop: true,
            spaceBetween: 0,
            autoplay: {
                enabled: false,
                delay: 2000,
            },
            pagination: {
                clickable: true,
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
                        prevEl: '.slider-top-prev',
                    },
                })
            );
            mainSlider.init();
        }


        /**слайдер тизеров**/
        if(document.querySelector(tizersSliderClass)!==null) {
            let tizersCategoriesSlider = document.querySelector(tizersSliderClass).swiper;
            let tizersCategoriesSliderParams = {
                speed: 1000,
                spaceBetween: 8,
                slidesPerView: 2.2,
                breakpoints: {
                    650: {
                        slidesPerView: 2.2
                    },
                    768: {
                        slidesPerView: 3.2
                    },
                    992: {
                        slidesPerView: 3.2
                    },
                },
            };
            _.merge(tizersCategoriesSlider.params, tizersCategoriesSliderParams);
            let tizers = document.getElementsByClassName("content-categoriesTizers-item");
            let lastTizer = tizers[tizers.length - 1];

            if (currentWidth < maxWidthForSliderTizers) {
                tizersCategoriesSlider.init();
            }
            //  else if (currentWidth >= widthShow4Tizer) {
            //     lastTizer.style.display = "block";
            // } else {

            //     lastTizer.style.display = "none";
            // }
            _addEvent(window, "resize", function (event) {
                let currentWidth = window.innerWidth;
                console.log(currentWidth);
                if (currentWidth < maxWidthForSliderTizers) {

                    tizersCategoriesSlider.tizersCategoriesSlider.init();
                }
                //  else if (currentWidth >= widthShow4Tizer) {
                //     lastTizer.style.display = "block";
                // } else {
                //     lastTizer.style.display = "none";
                //     tizersCategoriesSlider.destroy(false, false);
                // }
            });
        }


        /**слайдер новинок**/
        let productSliderParams = {
            loop: true,
            spaceBetween: -19,
            loopedSlides: 10,
            breakpoints: {
                300: {
                    slidesPerView: 1
                },
                320: {
                    slidesPerView: 1.3
                },
                480: {
                    slidesPerView: 1.3
                },
                620: {
                    slidesPerView: 2.3
                },
                768: {
                    slidesPerView: 2.8
                },
                1100: {
                    slidesPerView: 3.4
                },
                1440: {
                    slidesPerView: 4
                },
                1920: {
                    slidesPerView: 4
                },
                2560: {
                    slidesPerView: 4
                }
            }
        };
        if(document.querySelector(newProductsSliderClass)!==null) {
            let newProductsSlider = document.querySelector(newProductsSliderClass).swiper;
            _.merge(newProductsSlider.params, _.merge(productSliderParams,
                {
                    navigation: {
                        nextEl: '.newProducts-next',
                        prevEl: '.newProducts-prev',
                    },
                })
            );
            newProductsSlider.init();
        }

        /**слайдер акций**/
        let stockSliderParams = {
            loop: true,
            spaceBetween: 10,
            loopedSlides: 4,
            /*autoplay: {
                enabled: true,
                delay: 3000,
            },*/
            breakpoints: {
                300: {
                    slidesPerView: 1.05
                },
                320: {
                    slidesPerView: 1.05
                },
                480: {
                    slidesPerView: 1.3
                },
                620: {
                    slidesPerView: 2.1
                },
                768: {
                    slidesPerView: 2.3
                },
                1100: {
                    slidesPerView: 3.4
                },
                1440: {
                    slidesPerView: 2
                },
                1920: {
                    slidesPerView: 2
                },
                2560: {
                    slidesPerView: 2
                }

            }
        }
        /**слайдер "Надо брать"**/
        if(document.querySelector(needTakeSliderClass)) {
            let needTakeSlider = document.querySelector(needTakeSliderClass).swiper;
            _.merge(needTakeSlider.params, _.merge(productSliderParams,
                {
                    navigation: {
                        nextEl: '.needTake-next',
                        prevEl: '.needTake-prev',
                    },
                }));
            needTakeSlider.init();
        }

        /**слайдер "Только для тебя"**/
        if(document.querySelector(forYouSliderClasss)!==null) {
            let forYouSlider = document.querySelector(forYouSliderClasss).swiper;
            _.merge(forYouSlider.params, _.merge(productSliderParams,
                {
                    navigation: {
                        nextEl: '.forYou-next',
                        prevEl: '.forYou-prev',
                    },
                }));
            forYouSlider.init();
        }
        /**слайдер Брендов 1 линия**/
        let brandsSliderParams = {

            autoplay: {
                enabled: true,
                delay: 0,
            },
            speed: 2000,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 2.1,
                },
                768: {
                    slidesPerView: 2.4,
                },
                1920: {
                    slidesPerView: 6,
                },
                2560: {
                    slidesPerView: 6,
                }
            },
            loopedSlides: 6
        };
        if(document.querySelector(brandsSliderClass1Line)!==null) {
            let brandsSlider1line = document.querySelector(brandsSliderClass1Line).swiper;
            _.merge(brandsSlider1line.params, _.merge(brandsSliderParams,
                {
                    navigation: {
                        nextEl: '.brands-next',
                        prevEl: '.brands-prev',
                    }
                })
            );
            brandsSlider1line.init();
        }

        /**слайдер Брендов 2 линия**/
        if(document.querySelector(brandsSliderClass2Line)!==null) {
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
        if(document.querySelector(bottomSliderClass)!==null) {
            let bottomSlider = document.querySelector(bottomSliderClass).swiper;
            _.merge(bottomSlider.params, _.merge(mainSliderParams,
                {
                    pagination: {
                        el: document.querySelector('.bottomSlider-container-pagination')
                    },
                    navigation: {
                        nextEl: '.bottomSlider-next',
                        prevEl: '.bottomSlider-prev',
                    },
                })
            );
            bottomSlider.init();
        }
    });
}