import 'simplebar';
//import createModal from './components/modals';
import TopMenuController from './header/topMenu';
import MobileMenuController from './header/mobileMenu';
import HeaderController from './header/header';
import FooterController from './footer';

class ProfileController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;

        this.init();
        this.bind();
    }

    bind() {
        this.container.querySelectorAll('.js-profile-nav')
            .forEach(item => item.addEventListener('click', e => this.toggleMenu(e)));
    }

    init() {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TopMenuController(document.querySelector('.topMenu'));
    new MobileMenuController(document.querySelector('#js-mobileMenu'));
    new HeaderController(document.querySelector('.header'));
    new FooterController(document.querySelector('.footer'));

    if (document.querySelector('.js-profile-container')) {
        new ProfileController(document.querySelector('.js-profile-container'));
    }
});