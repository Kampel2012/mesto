import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageItem = this._popup.querySelector('.pop-up__image-card');
    this._popUpDescription = this._popup.querySelector('.pop-up__subtitle');
  }

  open({ name, link }) {
    this._imageItem.src = link;
    this._imageItem.alt = name;
    this._popUpDescription.textContent = name;
    super.open();
  }
}
