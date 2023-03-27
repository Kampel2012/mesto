import { profileUserInfo } from '../../pages';
import { api } from './Api';

export class Card {
  constructor(
    { name, link, likes = [], _id },
    templateSelector,
    handleCardClick,
    handleConfirmDel,
  ) {
    this._id = _id;
    this._handleConfirmDel = handleConfirmDel;
    this._name = name;
    this._link = link;
    this.likesOriginal = likes; // TODO переименовать
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
    if (this._checkIsLike(this.likesOriginal)) {
      this._switchLikeActiveIfRequired();
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

  _createCardElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _checkIsLike(arr) {
    return [...arr].some(
      item =>
        item.name === profileUserInfo.name.textContent &&
        item.about === profileUserInfo.job.textContent,
    );
  }

  _addCardtoServer() {
    api
      .switchStateLike(this._id, 'DELETE')
      .then(
        res => (
          (this.likesOriginal = res.likes),
          this._likes--,
          (this._cardCounterContainer.textContent = this._likes)
        ),
      )
      .then(() => this._switchLikeActiveIfRequired());
  }

  _deleteCardFromServer() {
    api
      .switchStateLike(this._id, 'PUT')
      .then(
        res => (
          (this.likesOriginal = res.likes),
          +this._likes++,
          (this._cardCounterContainer.textContent = this._likes)
        ),
      )
      .then(() => this._switchLikeActiveIfRequired());
  }

  _setCardHandling() {
    this._cardButtonLike.addEventListener('click', () => {
      if (this._checkIsLike(this.likesOriginal)) {
        this._addCardtoServer();
      } else {
        this._deleteCardFromServer();
      }
    });
    if (this._cardButtonDelete)
      this._cardButtonDelete.addEventListener('click', () => {
        this._handleConfirmDel(this._id); // открытие поп-апа с подтверждением
        /*       this._removeCardIfRequired(); */
      });
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
        likes: this._likes,
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
