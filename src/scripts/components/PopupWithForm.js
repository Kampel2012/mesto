import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this.funcSubmit = funcSubmit;
    this.popupForm = this.containter.querySelector('.pop-up__form');
  }

  _getInputValues() {
    return this.popupForm.querySelectorAll('input').map(item => item.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this.containter.addEventListener('submit', e => {
      e.preventDefault();
      this.funcSubmit(e);
      this.close();
    });
  }

  close() {
    super.close();
    this.popupForm.reset();
  }
}
