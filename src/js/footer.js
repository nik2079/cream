import createModal from './components/modals';

export default class FooterController {
    constructor(containerHTMLElement) {
        this.container = containerHTMLElement;

        this.bind();
    }

    bind() {
        this.container.querySelector('#js-callMe').addEventListener('click', () => this.showCallLater());
        this.container.querySelectorAll('.footer-opacityFooter-shevron__down').forEach((item) => {
            item.addEventListener('click', e => this.footerShevfronDown(e));
        });
    }

    showCallLater() {
        const modal = createModal(true, 'modalCallMe', document.getElementById('js-callLater'),
        function () {}, function () {
            document.getElementById('js-callLater').style.display = 'block';
        });
        modal.addFooterBtn('Отправить', 'close-btn', function () {
        });
        modal.open();
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
}