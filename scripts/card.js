export class Card {
  constructor(item, templateSelector) {
    // item это обьект с полями name и link со значениями инпутов
    this._templateSelector = templateSelector;
    this._cardElement = this._createCardElement();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = item.link;
    this._cardImage.alt = item.name;
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardTitle.textContent = item.name;
    this._setCardHandling();
    return this._cardElement;
  }

  _createCardElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _setCardHandling() {
    this._cardElement.addEventListener('click', e => {
      this._removeCardIfRequired(e);
      this._switchLikeActiveIfRequired(e);
    });
  }

  _removeCardIfRequired(e) {
    if (e.target.classList.contains('card__btn_type_delete')) {
      this._cardElement.remove();
    }
  }

  _switchLikeActiveIfRequired(e) {
    const btnLikeTarget = e.target;
    if (btnLikeTarget.classList.contains('card__btn')) {
      btnLikeTarget.classList.toggle('card__btn_like_active');
    }
  }
}
