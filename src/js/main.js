import '../stylesheets/all.scss';
import Promise from 'promise-polyfill';
import 'es6-object-assign/auto';
import sliders from './sliders/sliders';
import {_ready} from './helpers';
import addEvent from './helpers/_addEvent'; //opject assign polyfill
import tippy from 'tippy.js';
import modals from './modals/modals';

if (!window.Promise) {
    window.Promise = Promise;
}

sliders();

_ready(function () {
    /***Так ловим клик по лупе в поиске***/
    /*let searchButton = document.querySelector('.header-search-icon');
    console.log(searchButton);
    searchButton.addEventListener('click',() => alert('ASd'),true);*/
    /******************/
    const menu = document.querySelector('.mobileMenu');
    const burger = document.getElementById('js-openMenu');
    const wrapper = document.getElementById('js-mobileMenuWrapper');
    const idMenuClosed = 'js-mobileMenuClosed';
    const crossMenuClosed = document.getElementById(idMenuClosed);
    const idBrandsClosed = 'js-brandsClosed';
    const mobileNav = document.getElementById('js-mobileMenuNav');
    const brands = document.getElementById('js-brands');
    /*const crossBrandsClosed = document.getElementById(idBrandsClosed);*/
    const openBrands = document.getElementById('js-openBrandsMenu');
    const categoriesButton = document.getElementById('js-popupCategories');
    const categoriesContent = document.getElementById('js-popupCategoriesContent');
    const selectCity = document.getElementsByClassName('js-selectCity');
    const selectCityContent = document.getElementById('js-selectCityContent');
    const inputCityInModal = document.getElementById('js-citySearch');
    const foundCitiesContainer = document.getElementById('js-foundCities');
    const thanksContent = document.getElementById('js-modalThanks');
    const forgottenContent = document.getElementById('js-forgottenPassword');
    const comebackContent = document.getElementById('js-comeback');
    const successRegContent = document.getElementById('js-successReg');
    /**Регистрация и вход**/
    const authRegContent = document.getElementById('js-authReg');
    const enterLinkInModal = document.getElementById('js-modalAuthRegEnter');
    const regLinkInModal = document.getElementById('js-modalAuthRegRegistration');
    addEvent(burger, 'click', function () {
        menu.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    addEvent(wrapper, 'click', function () {
        if (event.target.className === 'mobileMenu-wrapper') {
            menu.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    addEvent(crossMenuClosed, 'click', function () {
        if (this.id !== idBrandsClosed) {
            menu.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            mobileNav.style.display = 'block';
            brands.style.display = 'none';
            document.getElementById(idBrandsClosed).setAttribute('id', idMenuClosed);
        }
    });
    /**{'name':'Петр','surname':'Петров'}**/
    if (localStorage.getItem('username')) {
        let username = JSON.parse(localStorage.getItem('username'));
        document.querySelector('.mobileMenu-nav-username').innerHTML = username.name + ' ' + username.surname;
        document.getElementById('js-mobileMenu').dataset.userLogin = 'true';
        document.getElementById('js-comebackUsername').innerHTML = username.name + ' ' + username.surname;
    }
    openBrands.addEventListener('click', function () {
        event.preventDefault();
        mobileNav.style.display = 'none';
        brands.style.display = 'block';
        document.getElementById(idMenuClosed).setAttribute('id', idBrandsClosed);
        return false;
    }, false);
    categoriesContent.style.display = 'block';
    tippy(categoriesButton, {
        content: categoriesContent,
        arrow: true,
        interactive: true,
        placement: 'bottom-end',
        theme: 'light-border',
        arrowType: 'round',
        hideOnClick: 'toggle',
        a11y: false,
        trigger: 'click'
    });
    for (let i = 0; i < selectCity.length; i++) {
        selectCity[i].addEventListener('click', function () {
            menu.style.display = 'none';
            document.body.style.overflow = 'auto';
            let modal = modals('selectedCity', selectCityContent, function () {
                inputCityInModal.value = '';
                foundCitiesContainer.style.display = 'none';
                modal.destroy();
            }, function () {
                selectCityContent.style.display = 'block';
            });
            modal.open();
        });
    }

    function showThanks() {
        let modal = modals('modalThanksOpen', thanksContent, function () {
            modal.destroy();
        }, function () {
            thanksContent.style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    function showForgottenPassword() {
        let modal = modals('modalForgotten', forgottenContent, function () {
            modal.destroy();
        }, function () {
            forgottenContent.style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    function showComeback() {
        let modal = modals('modalComebackOpen', comebackContent, function () {
            modal.destroy();
        }, function () {
            comebackContent.style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    function successReg() {
        let modal = modals('successRegOpen', successRegContent, function () {
            modal.destroy();
        }, function () {
            successRegContent.style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    /*showThanks();*/

    /*showForgottenPassword();
    showComeback();
    successReg();*/
    function authReg() {
        let modal = modals('authRegOpen', authRegContent, function () {
                modal.destroy();
            }, function () {
                authRegContent.style.display = 'block';
            }
        );
        modal.addFooterBtn('Зарегистрироваться', 'reg-btn', function () {
            console.log('reg');
        });
        modal.addFooterBtn('Войти', 'enter-btn', function () {
            console.log('enter');
        });
        modal.open();
    }

    authReg();
    inputCityInModal.addEventListener('input', function () {
        console.log(this.value);
        if (this.value.length >= 3) {
            foundCitiesContainer.style.display = 'block';
        } else {
            foundCitiesContainer.style.display = 'none';
        }
    }, false);

    enterLinkInModal.addEventListener('click', function () {
        let active = 'modalAuthReg-active';
        let reg = document.querySelector('.modalAuthReg-registration');
        let notActive = 'modalAuthReg-notActive';
        let authForm = document.querySelector('.modalAuthReg-authForm');
        let regForm = document.querySelector('.modalAuthReg-regForm');
        let btnEnter = document.querySelector('.enter-btn');
        let btnReg = document.querySelector('.reg-btn');
        if (!this.classList.contains(active)) {
            reg.classList.remove(active);
            reg.classList.add(notActive);
            this.classList.remove(notActive);
            this.classList.add(active);
            authForm.style.display = 'block';
            regForm.style.display = 'none';
            btnEnter.style.display = 'block';
            btnReg.style.display = 'none';
        }
    }, false);
    regLinkInModal.addEventListener('click', function () {
        let active = 'modalAuthReg-active';
        let enter = document.querySelector('.modalAuthReg-enter');
        let notActive = 'modalAuthReg-notActive';
        let authForm = document.querySelector('.modalAuthReg-authForm');
        let regForm = document.querySelector('.modalAuthReg-regForm');
        let btnEnter = document.querySelector('.enter-btn');
        let btnReg = document.querySelector('.reg-btn');
        if (!this.classList.contains(active)) {
            enter.classList.remove(active);
            enter.classList.add(notActive);
            this.classList.remove(notActive);
            this.classList.add(active);
            authForm.style.display = 'none';
            regForm.style.display = 'block';
            btnEnter.style.display = 'none';
            btnReg.style.display = 'block';
        }
    }, false);
});