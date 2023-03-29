export class Card {
  constructor(
    { name, link, likes = [], _id, owner },
    templateSelector,
    handleCardClick,
    handleConfirmDel,
    userId,
    hendleForLikeBtn,
  ) {
    this.hendleForLikeBtn = hendleForLikeBtn;
    this._id = _id;
    this._userId = userId;
    this.owner = owner;
    this._handleConfirmDel = handleConfirmDel;
    this._name = name;
    this._link = link;
    this._likesData = likes;
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
    this.removeBtnDeleteIfdontNeed();
    this._setCardHandling();
    if (this._checkIsLike(this._likesData)) {
      this.switchLikeActiveIfRequired();
    }
  }

  removeBtnDeleteIfdontNeed() {
    if (this.owner._id !== this._userId) {
      this._cardButtonDelete.remove();
    }
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

  getCardId() {
    return this._id;
  }

  _createCardElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _checkIsLike(arr) {
    return [...arr].some(item => item._id === this._userId);
  }

  _setCardHandling() {
    this._cardButtonLike.addEventListener('click', () => {
      if (this._checkIsLike(this._likesData)) {
        this.hendleForLikeBtn('DELETE');
      } else {
        this.hendleForLikeBtn('PUT');
      }
    });
    if (this._cardButtonDelete)
      this._cardButtonDelete.addEventListener('click', () => {
        this._handleConfirmDel(this); // открытие поп-апа с подтверждением и передачей туда карточки
      });
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
        likes: this._likes,
      }),
    );
  }

  updateLikeStatus(likes) {
    this._likesData = likes;
    this._cardCounterContainer.textContent = this._likesData.length;
    this.switchLikeActiveIfRequired();
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  switchLikeActiveIfRequired() {
    this._cardButtonLike.classList.toggle('card__btn_like_active');
  }
}
