import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.pop-up__form'); // ? если перенести в конструктор - undefined
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault();
      this._funcSubmit(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._popupForm));
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
