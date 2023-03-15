import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
    this._popupForm = this.containter.querySelector('.pop-up__form');
    this.info = {};
  }

  _getInputValues() {
    const inputsValue = Array.from(
      this._popupForm.querySelectorAll('input'),
    ).map(item => item.value);
    return { name: inputsValue[0], job: inputsValue[1] };
  }

  setEventListeners() {
    super.setEventListeners();
    this.containter.addEventListener('submit', e => {
      e.preventDefault();
      this.info = this._getInputValues();
      this._funcSubmit(e);
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
