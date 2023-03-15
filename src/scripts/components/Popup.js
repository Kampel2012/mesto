export default class Popup {
  constructor(selector) {
    this.containter = document.querySelector(selector);
    this.closeButton = this.containter.querySelector('.pop-up__btn_type_close');
    this.setEventListeners();
  }

  open() {
    this.containter.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.containter.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // ? Закрытие по кнопке ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOutClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this.containter.addEventListener('mousedown', evt =>
      this._handleClickOutClose(evt),
    );
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
    this.closeButton.addEventListener('click', () => this.close());
  }
}
