export default class Roller {
  constructor(rollSelectorId) {
    this.rollContainer = document.querySelector(rollSelectorId);
    this.rollToggleButton = this.rollContainer.querySelector('.js-roll-list-button');
    this.rollBody = this.rollContainer.querySelector('.js-roll-list-body');
    this.init();
  }

  setHeight(isUp) {
    this.rollBody.style.height = `${this.rollBody.scrollHeight}px`;

    if (isUp) {
      this.rollBody.removeAttribute('style');
    } else {
      this.rollBody.style.height = 'auto';
    }
  }

  hide() {
    this.rollToggleButton.classList.remove('active');
    this.rollBody.classList.remove('active');
    this.setHeight(true);
  }

  show() {
    this.rollToggleButton.classList.add('active');
    this.rollBody.classList.add('active');
    this.setHeight(false);
  }

  init() {
    this.rollToggleButton.addEventListener('click', (e) => {
      if (e.target.classList.contains('active')) {
        this.hide();
      } else {
        this.show();
      }
    });
  }
}