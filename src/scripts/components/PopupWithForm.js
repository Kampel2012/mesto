import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
    this._btnSubmit = this._popup.querySelector('.pop-up__btn_type_submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.pop-up__form');
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault();
      this._toggleBtnContent();
      this._funcSubmit(this._getInputValues()).then(() =>
        this._toggleBtnContent(),
      );
      this.close();
    });
  }

  _toggleBtnContent() {
    let content = this._btnSubmit.innerText;
    if (content === 'Сохранить') {
      this._btnSubmit.innerText = 'Сохранение...';
    }
    if (content === 'Сохранение...') {
      this._btnSubmit.innerText = 'Сохранить';
    }
    if (content === 'Создать') {
      this._btnSubmit.innerText = 'Создание...';
    }
    if (content === 'Создание...') {
      this._btnSubmit.innerText = 'Создать';
    }
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._popupForm));
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
