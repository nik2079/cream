import '../../stylesheets/all.scss';
import { MDCTextField } from '@material/textfield';
import createModal from '../components/modals';

export default class HeaderController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;

        this.pwShown = 0;
        this.pwShownreg = 0;

        this.init();
        this.bind();
    }

    bind() {
        this.container.querySelector('#js-openMenu').addEventListener('click', () => this.openMobMenu());
        document.querySelector('#js-link-forgotPassword').addEventListener('click', () => this.forgotPasswordShow());
        this.container.querySelector('.header-signUp').addEventListener('click', () => this.authReg());
        document.querySelector('#js-modalAuthRegEnter').addEventListener('click', e => this.modalAuthRegEnterShow(e));
        document.querySelector('#js-modalAuthRegRegistration').addEventListener('click', e => this.modalAuthRegRegistrationShow(e));
        document.querySelector('#showpass').addEventListener('click', () => this.showpassToggle());
        document.querySelector('#showpassreg').addEventListener('click', () => this.showpassRegToggle());
        this.container.querySelector('#js-showMobCart').addEventListener('click', () => this.showMobCartlist());
        this.container.querySelector('#js-switchLangRu').addEventListener('click', () => this.switchLangRu());
        this.container.querySelector('#js-switchLangEn').addEventListener('click', () => this.switchLangEn());
    }

    init() {
        this.getUserName();
        this.mDCTextField();
    }

    showMobCartlist() {
        const modal = createModal('mobCartlistLayout', document.getElementById('js-mobCartList'),
        () => {},
        () => {
            document.getElementById('js-mobCartList').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    openMobMenu() {
        document.querySelector('.mobileMenu').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    forgotPasswordShow() {
        document.querySelector('.tingle-modal').remove();
        this.showForgottenPasswordBegin();
    }

    authReg() {
        let modal = createModal(true, 'authRegOpen', document.getElementById('js-authReg'),
        function () {}, function () {
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

    switchLangRu() {
        document.querySelector('.header-brandsMenu-ruBrands').style.display = 'flex';
        document.querySelector('.header-brandsMenu-enBrands').style.display = 'none';
    }

    switchLangEn() {
        document.querySelector('.header-brandsMenu-ruBrands').style.display = 'none';
        document.querySelector('.header-brandsMenu-enBrands').style.display = 'flex';
    }

    showForgottenPasswordBegin() {
        const forgottenPasswordBegin = document.getElementById('js-forgottenPasswordBegin');
        const modal = createModal(
            true,
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
        const modal = createModal(
            true,
            'modalForgotten',
            document.getElementById('js-forgottenPassword'),
            () => {},
            () => {
                document.getElementById('js-forgottenPassword').style.display = 'block';
            }
        );
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    successReg() {
        const modal = createModal(
            true,
            'successRegOpen',
            document.getElementById('js-successReg'),
            function () {},
            function () {
            document.getElementById('js-successReg').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    getUserName() {
        if (localStorage.getItem('username')) {
            let username = JSON.parse(localStorage.getItem('username'));
            document.querySelector('.mobileMenu-nav-username').innerHTML = username.name + ' ' + username.surname;
            document.getElementById('js-mobileMenu').dataset.userLogin = 'true';
            document.getElementById('js-comebackUsername').innerHTML = username.name + ' ' + username.surname;
        }
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
}