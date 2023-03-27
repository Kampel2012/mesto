import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.pop-up__form');
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault();
      this._funcSubmit();
      this.close();
    });
  }
}
