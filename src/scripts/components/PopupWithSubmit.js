import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
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
      this._funcSubmit()
        .then(() => this._toggleBtnContent())
        .then(() => this.close())
        .catch(err => {
          console.log(err);
        });
    });
  }

  _toggleBtnContent() {
    let content = this._btnSubmit.innerText;
    if (content === 'Да') {
      this._btnSubmit.innerText = 'Удаление...';
    }
    if (content === 'Удаление...') {
      this._btnSubmit.innerText = 'Да';
    }
  }
}
