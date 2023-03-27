export class Card {
  constructor(
    { name, link, likes = [], _id = Date.now() },
    templateSelector,
    handleCardClick,
    handleConfirmDel,
  ) {
    this.id = _id;
    this._handleConfirmDel = handleConfirmDel;
    this._name = name;
    this._link = link;
    this._likes = [...likes].length;
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
    this._cardCounterContainer =
      this._cardElement.querySelector('.card__counter');
    this._fillCardInfo();
    this._setCardHandling();
  }

  _fillCardInfo() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardCounterContainer.textContent = this._likes;
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
    if (this._cardButtonDelete)
      this._cardButtonDelete.addEventListener('click', () => {
        this._handleConfirmDel(this.id); // открытие поп-апа с подтверждением
        /*       this._removeCardIfRequired(); */
      });
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
        likes: this._likes, // ??? подумать еще стоит и протестить
      }),
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
