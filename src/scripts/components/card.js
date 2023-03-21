export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._createCardElement();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardButtonDelete = this._cardElement.querySelector(
      '.card__btn_type_delete',
    );
    this._cardButtonLike = this._cardElement.querySelector(
      '.card__btn_type_like',
    );
    this._fillCardInfo();
    this._setCardHandling();
  }

  _fillCardInfo() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  getCardElement() {
    return this._cardElement;
  }

  _createCardElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _setCardHandling() {
    this._cardButtonLike.addEventListener('click', () => {
      this._switchLikeActiveIfRequired();
    });
    this._cardButtonDelete.addEventListener('click', () => {
      this._removeCardIfRequired();
    });
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick({ name: this._name, link: this._link }),
    );
  }

  _removeCardIfRequired() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _switchLikeActiveIfRequired() {
    this._cardButtonLike.classList.toggle('card__btn_like_active');
  }
}
