import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(box, imageItem, popUpDescription) {
    this._fillPopupImageFromCard(box, imageItem, popUpDescription);
    this.containter.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  _fillPopupImageFromCard(box, imageItem, popUpDescription) {
    imageItem.src = box.src;
    imageItem.alt = box.alt;
    popUpDescription.textContent = box.alt;
  }
}
