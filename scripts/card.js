export class Card {
  constructor(item, cardTemplate) {
    //TODO item это обьект из name и link со значениями инпутов
    this._cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = item.link;
    this._cardImage.alt = item.name;
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardTitle.textContent = item.name;
    this._setCardHandling();
    return this._cardElement;
  }

  _setCardHandling() {
    this._cardElement.addEventListener('click', e => {
      this._removeCardIfRequired(e);
      this._switchLikeActiveIfRequired(e);
    });
  }

  _removeCardIfRequired(e) {
    // удаление карточки
    if (e.target.classList.contains('card__btn_type_delete')) {
      const targetBox = e.target.closest('.card');
      targetBox.remove();
    }
  }

  _switchLikeActiveIfRequired(e) {
    // переключение модификатора актив у кнопки лайка
    const btnLikeTarget = e.target;
    if (btnLikeTarget.classList.contains('card__btn')) {
      btnLikeTarget.classList.toggle('card__btn_like_active');
    }
  }
}
