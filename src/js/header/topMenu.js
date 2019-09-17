import createModal from '../components/modals';

export default class TopMenuController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;

        this.bind();
    }

    bind() {
        this.container.querySelector('.js-selectCity').addEventListener('click', e => this.selectCityPopup(e));
        document.querySelector('#js-citySearch').addEventListener('input', e => this.citySearch(e));
    }

    selectCityPopup() {
        document.querySelector('.mobileMenu').style.display = 'none';

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

    citySearch(e) {
        if (e.currentTarget.value.length >= 3) {
            document.getElementById('js-foundCities').style.display = 'block';
        } else {
            document.getElementById('js-foundCities').style.display = 'none';
        }
    }
}