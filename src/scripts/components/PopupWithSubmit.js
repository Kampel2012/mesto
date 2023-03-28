import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
    this._btnSubmit = this._popup.querySelector('.pop-up__btn_type_submit');
    this._card = null;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.pop-up__form');
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault();
      this.toggleBtnContent();
      this._funcSubmit(this._card);
    });
  }

  toggleBtnContent() {
    const content = this._btnSubmit.innerText;
    if (content === 'Да') {
      this._btnSubmit.innerText = 'Удаление...';
    }
    if (content === 'Удаление...') {
      this._btnSubmit.innerText = 'Да';
    }
  }
}
