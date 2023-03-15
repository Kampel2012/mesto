export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._createCardElement();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardTitle.textContent = name;
    this._setCardHandling();
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
    this._cardElement.addEventListener('click', e => {
      this._removeCardIfRequired(e);
      this._switchLikeActiveIfRequired(e);
    });
    this._cardImage.addEventListener('click', e => this._handleCardClick(e));
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
