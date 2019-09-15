import '../stylesheets/all.scss';
import Promise from 'promise-polyfill';
import 'es6-object-assign/auto';
import sliders from './sliders/sliders';
//import {_ready} from './helpers';
//import addEvent from './helpers/_addEvent'; //opject assign polyfill
import tippy from 'tippy.js';
import createModal from './components/modals';
import { MDCTextField } from '@material/textfield';

class MainPageController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;
        this.toggleCloseType = 'main';

        this.pwShown = 0;
        this.pwShownreg = 0;

        this.init();
        this.bind();
    }

    // Клики и прочие события
    bind() {
        this.container.querySelector('#js-openMenu').addEventListener('click', () => this.openMobMenu());
        this.container.querySelector('#js-mobileMenuWrapper').addEventListener('click', e => this.closeMobMenuWrapper(e));
        this.container.querySelector('#js-mobileMenuClosed').addEventListener('click', () => this.closeMobMenuBtn());
        this.container.querySelector('#js-openBrandsMenu').addEventListener('click', e => this.openBrandsMenu(e));
        this.container.querySelectorAll('.js-selectCity').forEach((item) => {
            item.addEventListener('click', e => this.selectCityPopup(e));
        });
        document.querySelector('#js-citySearch').addEventListener('input', e => this.citySearch(e));
        document.querySelector('#js-link-forgotPassword').addEventListener('click', () => this.forgotPasswordShow());
        this.container.querySelector('.header-signUp').addEventListener('click', () => this.signUpShow());
        document.querySelector('#js-modalAuthRegEnter').addEventListener('click', e => this.modalAuthRegEnterShow(e));
        document.querySelector('#js-modalAuthRegRegistration').addEventListener('click', e => this.modalAuthRegRegistrationShow(e));
        this.container.querySelector('#js-showPopupReg').addEventListener('click', () => this.showPopupReg());
        this.container.querySelector('#js-showPopupAuth').addEventListener('click', () => this.showPopupAuth());
        this.container.querySelectorAll('.sub-link').forEach((item) => {
            item.addEventListener('click', e => this.mobSubLinkShow(e));
        });
        document.querySelector('.mobileMenu-nav-wishlist').addEventListener('click', () => this.showMobWishlist());
        this.container.querySelector('#js-showMobCart').addEventListener('click', () => this.showMobCartlist());
        this.container.querySelector('#js-callMe').addEventListener('click', () => this.showCallLater());
        document.querySelector('#showpass').addEventListener('click', () => this.showpassToggle());
        document.querySelector('#showpassreg').addEventListener('click', () => this.showpassRegToggle());
        this.container.querySelectorAll('.footer-opacityFooter-shevron__down').forEach((item) => {
            item.addEventListener('click', e => this.footerShevfronDown(e));
        });

        this.container.querySelector('#js-ru').addEventListener('click', () => this.showRu());
        this.container.querySelector('#js-en').addEventListener('click', () => this.showEn());
        this.container.querySelector('#js-switchLangRu').addEventListener('click', () => this.switchLangRu());
        this.container.querySelector('#js-switchLangEn').addEventListener('click', () => this.switchLangEn());
    }

    // Применение функций
    init() {
        this.getUserName();
        this.initPopupCategories();
        this.mDCTextField();
    }

    // Сами функции
    openMobMenu() {
        document.querySelector('.mobileMenu').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeMobMenuWrapper(e) {
        if (e.target.className === 'mobileMenu-wrapper') {
            document.querySelector('.mobileMenu').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeMobMenuBtn() {
        if (this.toggleCloseType === 'brands') {
            document.getElementById('js-mobileMenuNav').style.display = 'block';
            document.getElementById('js-brands').style.display = 'none';
            this.toggleCloseType = 'main';
        } else {
            document.querySelector('.mobileMenu-nav-wrapper').classList.remove('hidden');
            document.querySelector('.mobileMenu-wrapper').classList.remove('fixed');
            document.querySelectorAll('.sub-link').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.header-sub-menu-layout').forEach(item => item.classList.remove('active'));
            if (this.toggleCloseType === 'submenu') {
                this.toggleCloseType = 'main';
            } else if (this.toggleCloseType === 'main') {
                document.querySelector('.mobileMenu').style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    getUserName() {
        if (localStorage.getItem('username')) {
            let username = JSON.parse(localStorage.getItem('username'));
            document.querySelector('.mobileMenu-nav-username').innerHTML = username.name + ' ' + username.surname;
            document.getElementById('js-mobileMenu').dataset.userLogin = 'true';
            document.getElementById('js-comebackUsername').innerHTML = username.name + ' ' + username.surname;
        }
    }

    openBrandsMenu(e) {
        e.preventDefault();
        document.getElementById('js-mobileMenuNav').style.display = 'none';
        document.getElementById('js-brands').style.display = 'block';
        document.querySelectorAll('.sub-link').forEach((item) => {
            item.classList.remove('active');
            item.nextElementSibling.classList.remove('active');
        });
        this.toggleCloseType = 'brands';
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

    selectCityPopup() {
        this.container.querySelector('.mobileMenu').style.display = 'none';

        document.body.style.overflow = 'auto';

        const modal = createModal(
            'selectedCity',
            document.getElementById('js-selectCityContent'),
            () => {
                document.getElementById('js-citySearch').value = '';
                document.getElementById('js-foundCities').style.display = 'none';
                modal.destroy();
            },
            () => (document.getElementById('js-selectCityContent').style.display = 'block')
        );

        modal.open();
    }

    showThanks() {
        const modalThanks = document.getElementById('js-modalThanks');
        const modal = createModal(
            'modalThanksOpen',
            modalThanks,
            () => modal.destroy(),
            () => (modalThanks.style.display = 'block')
        );

        modal.addFooterBtn('Закрыть', 'close-btn', () => modal.close());

        modal.open();
    }

    showForgottenPasswordBegin() {
        const forgottenPasswordBegin = document.getElementById('js-forgottenPasswordBegin');
        const modal = createModal(
            'modalForgottenBegin',
            forgottenPasswordBegin,
            () => modal.destroy(),
            () => (forgottenPasswordBegin.style.display = 'block')
        );

        modal.addFooterBtn('Назад', 'back-btn', () => {
            modal.close();
            authReg();
        });

        modal.addFooterBtn('Закрыть', 'close-btn', () => modal.close());

        modal.open();
    }

    showForgottenPassword() {
        let modal = createModal('modalForgotten', document.getElementById('js-forgottenPassword'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-forgottenPassword').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    showComeback() {
        let modal = createModal('modalComebackOpen', document.getElementById('js-comeback'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-comeback').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    successReg() {
        let modal = createModal('successRegOpen', document.getElementById('js-successReg'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-successReg').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    showMobWishlist() {
        let modal = createModal('mobWishlistLayout', document.getElementById('js-mobWishList'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-mobWishList').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    showMobCartlist() {
        let modal = createModal('mobCartlistLayout', document.getElementById('js-mobCartList'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-mobCartList').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    showCallLater() {
        let modal = createModal('modalCallMe', document.getElementById('js-callLater'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-callLater').style.display = 'block';
        });
        modal.addFooterBtn('Отправить', 'close-btn', function () {
        });
        modal.open();
    }

    authReg() {
        let modal = createModal('authRegOpen', document.getElementById('js-authReg'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-authReg').style.display = 'block';
        });
        modal.addFooterBtn('Зарегистрироваться', 'reg-btn', function () {
            console.log('reg');
        });
        modal.addFooterBtn('Войти', 'enter-btn', function () {
            console.log('enter');
        });
        modal.open();
    }

    showPassword() {
        document.getElementById('password').setAttribute('type', 'text');
        document.getElementById('showpass').classList.add('active');
    }

    hidePassword() {
        document.getElementById('password').setAttribute('type', 'password');
        document.getElementById('showpass').classList.remove('active');
    }

    showPasswordreg() {
        document.getElementById('passwordreg').setAttribute('type', 'text');
        document.getElementById('showpassreg').classList.add('active');
    }

    hidePasswordreg() {
        document.getElementById('passwordreg').setAttribute('type', 'password');
        document.getElementById('showpassreg').classList.remove('active');
    }

    mDCTextField() {
        const textField = [];
        textField['login'] = new MDCTextField(document.querySelector('.modalAuthReg-authForm-loginField'));
        textField['password'] = new MDCTextField(document.querySelector('.modalAuthReg-authForm-passwordField'));
        textField['firstname'] = new MDCTextField(document.querySelector('.modalAuthReg-regForm-firstnameField'));
        textField['surname'] = new MDCTextField(document.querySelector('.modalAuthReg-regForm-surnameField'));
        textField['email'] = new MDCTextField(document.querySelector('.modalAuthReg-regForm-emailField'));
        textField['passwordreg'] = new MDCTextField(document.querySelector('.modalAuthReg-regForm-passwordregField'));
        textField['phoneCallField'] = new MDCTextField(document.querySelector('.modalCallLater-phoneCallField'));
        textField['nameCallField'] = new MDCTextField(document.querySelector('.modalCallLater-nameCallField'));
    }

    citySearch(e) {
        if (e.currentTarget.value.length >= 3) {
            document.getElementById('js-foundCities').style.display = 'block';
        } else {
            document.getElementById('js-foundCities').style.display = 'none';
        }
    }

    forgotPasswordShow() {
        document.querySelector('.tingle-modal').remove();
        this.showForgottenPasswordBegin();
    }

    signUpShow() {
        this.authReg();
    }

    modalAuthRegEnterShow(e) {
        let active = 'modalAuthReg-active';
        let reg = document.querySelector('.modalAuthReg-registration');
        let notActive = 'modalAuthReg-notActive';
        let authForm = document.querySelector('.modalAuthReg-authForm');
        let regForm = document.querySelector('.modalAuthReg-regForm');
        let btnEnter = document.querySelector('.enter-btn');
        let btnReg = document.querySelector('.reg-btn');
        if (!e.currentTarget.classList.contains(active)) {
            reg.classList.remove(active);
            reg.classList.add(notActive);
            e.currentTarget.classList.remove(notActive);
            e.currentTarget.classList.add(active);
            authForm.style.display = 'block';
            regForm.style.display = 'none';
            btnEnter.style.display = 'block';
            btnReg.style.display = 'none';
        }
    }

    modalAuthRegRegistrationShow(e) {
        let active = 'modalAuthReg-active';
        let enter = document.querySelector('.modalAuthReg-enter');
        let notActive = 'modalAuthReg-notActive';
        let authForm = document.querySelector('.modalAuthReg-authForm');
        let regForm = document.querySelector('.modalAuthReg-regForm');
        let btnEnter = document.querySelector('.enter-btn');
        let btnReg = document.querySelector('.reg-btn');
        if (!e.currentTarget.classList.contains(active)) {
            enter.classList.remove(active);
            enter.classList.add(notActive);
            e.currentTarget.classList.remove(notActive);
            e.currentTarget.classList.add(active);
            authForm.style.display = 'none';
            regForm.style.display = 'flex';
            btnEnter.style.display = 'none';
            btnReg.style.display = 'block';
        }
    }

    showPopupReg() {
        this.authReg();
        let active = 'modalAuthReg-active';
        let enter = document.querySelector('.modalAuthReg-enter');
        let reg = document.querySelector('.modalAuthReg-registration');
        let notActive = 'modalAuthReg-notActive';
        let authForm = document.querySelector('.modalAuthReg-authForm');
        let regForm = document.querySelector('.modalAuthReg-regForm');
        let btnEnter = document.querySelector('.enter-btn');
        let btnReg = document.querySelector('.reg-btn');

        enter.classList.remove(active);
        enter.classList.add(notActive);
        reg.classList.remove(notActive);
        reg.classList.add(active);
        authForm.style.display = 'none';
        regForm.style.display = 'flex';
        btnEnter.style.display = 'none';
        btnReg.style.display = 'block';
    }

    showPopupAuth() {
        this.authReg();
        let active = 'modalAuthReg-active';
        let enter = document.querySelector('.modalAuthReg-enter');
        let reg = document.querySelector('.modalAuthReg-registration');
        let notActive = 'modalAuthReg-notActive';
        let authForm = document.querySelector('.modalAuthReg-authForm');
        let regForm = document.querySelector('.modalAuthReg-regForm');
        let btnEnter = document.querySelector('.enter-btn');
        let btnReg = document.querySelector('.reg-btn');

        reg.classList.remove(active);
        reg.classList.add(notActive);
        enter.classList.remove(notActive);
        enter.classList.add(active);
        authForm.style.display = 'block';
        regForm.style.display = 'none';
        btnEnter.style.display = 'block';
        btnReg.style.display = 'none';
    }

    mobSubLinkShow(e) {
        document.querySelectorAll('.sub-link').forEach((item) => {
            item.classList.remove('active');
            item.nextElementSibling.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        e.currentTarget.nextElementSibling.classList.add('active');
        document.querySelector('.mobileMenu-nav-wrapper').classList.toggle('hidden');
        document.querySelector('.mobileMenu-wrapper').classList.toggle('fixed');
        toggleCloseType = 'submenu';
    }

    showpassToggle() {
        if (this.pwShown === 0) {
            this.pwShown = 1;
            this.showPassword();
        } else {
            this.pwShown = 0;
            this.hidePassword();
        }
    }

    showpassRegToggle() {
        if (this.pwShown === 0) {
            this.pwShown = 1;
            this.showPasswordreg();
        } else {
            this.pwShown = 0;
            this.hidePasswordreg();
        }
    }

    footerShevfronDown(e) {
        document.querySelectorAll('.footer-opacityFooter-shevron__down').forEach((item) => {
            item.classList.remove('active');
        });
        e.preventDefault();
        e.currentTarget.classList.toggle('active');

        let panel = e.currentTarget.parentElement.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    }

    showRu() {
        document.querySelector('.mobileMenu-brandsMenu-ABCD').style.display = 'none';
        document.querySelector('.mobileMenu-brandsMenu-ABCD__ru').style.display = 'grid';
    }

    showEn() {
        document.querySelector('.mobileMenu-brandsMenu-ABCD').style.display = 'grid';
        document.querySelector('.mobileMenu-brandsMenu-ABCD__ru').style.display = 'none';
    }

    switchLangRu() {
        document.querySelector('.header-brandsMenu-ruBrands').style.display = 'flex';
        document.querySelector('.header-brandsMenu-enBrands').style.display = 'none';
    }

    switchLangEn() {
        document.querySelector('.header-brandsMenu-ruBrands').style.display = 'none';
        document.querySelector('.header-brandsMenu-enBrands').style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-main-page-container')) {
        new MainPageController(document.querySelector('.js-main-page-container'));
    }
});

if (!window.Promise) {
    window.Promise = Promise;
}

sliders();