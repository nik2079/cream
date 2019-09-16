import createModal from '../components/modals';

export default class MobileMenuController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;
        this.toggleCloseType = 'main';

        this.bind();
    }

    bind() {
        this.container.querySelector('.js-selectCity').addEventListener('click', e => this.selectCityPopup(e));
        this.container.querySelector('#js-mobileMenuWrapper').addEventListener('click', e => this.closeMobMenuWrapper(e));
        this.container.querySelector('#js-mobileMenuClosed').addEventListener('click', () => this.closeMobMenuBtn());
        this.container.querySelector('#js-openBrandsMenu').addEventListener('click', e => this.openBrandsMenu(e));
        this.container.querySelector('#js-showPopupReg').addEventListener('click', () => this.showPopupReg());
        this.container.querySelector('#js-showPopupAuth').addEventListener('click', () => this.showPopupAuth());
        this.container.querySelectorAll('.sub-link').forEach((item) => {
            item.addEventListener('click', e => this.mobSubLinkShow(e));
        });
        document.querySelector('.mobileMenu-nav-wishlist').addEventListener('click', () => this.showMobWishlist());
        this.container.querySelector('#js-ru').addEventListener('click', () => this.showRu());
        this.container.querySelector('#js-en').addEventListener('click', () => this.showEn());
    }

    selectCityPopup() {
        this.container.style.display = 'none';

        document.body.style.overflow = 'auto';

        const modal = createModal(
            true,
            'selectedCity',
            document.getElementById('js-selectCityContent'),
            () => {
                document.getElementById('js-citySearch').value = '';
                document.getElementById('js-foundCities').style.display = 'none';
            },
            () => (document.getElementById('js-selectCityContent').style.display = 'block')
        );

        modal.open();
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

    authReg() {
        const modal = createModal(true, 'authRegOpen', document.getElementById('js-authReg'),
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

    showPopupReg() {
        this.authReg();
        const active = 'modalAuthReg-active';
        const enter = document.querySelector('.modalAuthReg-enter');
        const reg = document.querySelector('.modalAuthReg-registration');
        const notActive = 'modalAuthReg-notActive';
        const authForm = document.querySelector('.modalAuthReg-authForm');
        const regForm = document.querySelector('.modalAuthReg-regForm');
        const btnEnter = document.querySelector('.enter-btn');
        const btnReg = document.querySelector('.reg-btn');

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
        const active = 'modalAuthReg-active';
        const enter = document.querySelector('.modalAuthReg-enter');
        const reg = document.querySelector('.modalAuthReg-registration');
        const notActive = 'modalAuthReg-notActive';
        const authForm = document.querySelector('.modalAuthReg-authForm');
        const regForm = document.querySelector('.modalAuthReg-regForm');
        const btnEnter = document.querySelector('.enter-btn');
        const btnReg = document.querySelector('.reg-btn');

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
        this.toggleCloseType = 'submenu';
    }

    showMobWishlist() {
        let modal = createModal(true, 'mobWishlistLayout', document.getElementById('js-mobWishList'), function () {
            modal.destroy();
        }, function () {
            document.getElementById('js-mobWishList').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }

    showRu() {
        document.querySelector('.mobileMenu-brandsMenu-ABCD').style.display = 'none';
        document.querySelector('.mobileMenu-brandsMenu-ABCD__ru').style.display = 'grid';
    }

    showEn() {
        document.querySelector('.mobileMenu-brandsMenu-ABCD').style.display = 'grid';
        document.querySelector('.mobileMenu-brandsMenu-ABCD__ru').style.display = 'none';
    }

    showThanks() {
        const modalThanks = document.getElementById('js-modalThanks');
        const modal = createModal(
            true,
            'modalThanksOpen',
            modalThanks,
            () => modal.destroy(),
            () => (modalThanks.style.display = 'block')
        );

        modal.addFooterBtn('Закрыть', 'close-btn', () => modal.close());

        modal.open();
    }

    showComeback() {
        const modal = createModal(true, 'modalComebackOpen', document.getElementById('js-comeback'),
        function () {}, function () {
            document.getElementById('js-comeback').style.display = 'block';
        });
        modal.addFooterBtn('Закрыть', 'close-btn', function () {
            modal.close();
        });
        modal.open();
    }
}