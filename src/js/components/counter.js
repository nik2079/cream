export default class Counter {
    constructor(selector) {
        this.counter = document.querySelector(selector);
        this.input = this.counter.querySelector('.js-counter-value');
        this.buttonUp = this.counter.querySelector('.js-counter-ctrl-up');
        this.buttonDown = this.counter.querySelector('.js-counter-ctrl-down');
        this.maxValue = parseInt(this.counter.getAttribute('data-max-value'));
        this.currentValue = 0;
        this.input.value = 1;

        this.buttonUp.addEventListener('click', () => this.buttonInc());
        this.buttonDown.addEventListener('click', () => this.buttonDec());
    }

    buttonInc() {
        if (this.currentValue + 1 <= this.maxValue) {
            this.setInputValue(this.currentValue += 1);

            if (this.buttonDown.classList.contains('disabled')) {
                this.buttonDown.classList.remove('disabled');
            }

            if (this.currentValue + 1 === this.maxValue) {
                this.buttonUp.classList.add('disabled');
            }
        }
    }

    buttonDec() {
        if (this.currentValue - 1 > 0) {
            this.setInputValue(this.currentValue -= 1);

            if (this.buttonUp.classList.contains('disabled')) {
                this.buttonUp.classList.remove('disabled');
            }

            if (this.currentValue - 1 === 0) {
                this.buttonDown.classList.add('disabled');
            }
        }
    }

    setInputValue(value) {
        this.input.value = value;
    }
}