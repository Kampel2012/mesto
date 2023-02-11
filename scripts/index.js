import { createInitialCardsArr } from './cards.js';
import { removeValidationErrors } from './validate.js';

const initialCards = createInitialCardsArr();
const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__btn_type_edit');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__subtitle');
const overlayAddBtn = profile.querySelector('.profile__btn_type_add');
const popUpImageCard = document.querySelector('.pop-up_data_image-card');
const popUpCardAdd = document.querySelector('.pop-up_data_cards');
const popUpFormCards = popUpCardAdd.querySelector('.pop-up__form_data_cards');
const popUpProfileEdit = document.querySelector('.pop-up_data_profile');
const popUpFormProfile = popUpProfileEdit.querySelector('.pop-up__form_data_profile');
const overlayCloseBtns = document.querySelectorAll('.pop-up__btn_type_close');
const profileInputName = popUpProfileEdit.querySelector('.pop-up__input_type_name');
const profileInputJob = popUpProfileEdit.querySelector('.pop-up__input_type_job');
const placeNameInput = document.querySelector('.pop-up__input_type_placeName');
const placeLinkInput = document.querySelector('.pop-up__input_type_placeLink');
const gallery = document.querySelector('.gallery');
const popUps = Array.from(document.querySelectorAll('.pop-up'));
const imageItem = document.querySelector('.pop-up__image-card');
const popUpDescription = document.querySelector('.pop-up__subtitle');
const cardTemplate = document.querySelector('#card-template').content;

function openPopup(popUp) {
  popUp.classList.add('pop-up_opened');
  removeValidationErrors(popUp);
  document.addEventListener('keydown', closePopUpWhenEscIsDown);
}

renderInitialCards();

overlayAddBtn.addEventListener('click', e => {
  openPopup(popUpCardAdd);
  popUpFormCards.reset();
});

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  addNewCard();
  closePopup(popUpCardAdd);
});

// ? Закрытие по клику вне поп-апа
popUps.forEach(function (popUp) {
  popUp.addEventListener('mousedown', function (evt) {
    // не клик, потому что выделяя текст из инпута мышка часто выходит за пределы и поп ап закрывается
    if (evt.target === evt.currentTarget) {
      closePopup(popUp);
    }
  });
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpEditProfileValuesToInputs(popUpProfileEdit); // переносим нынешние значения в инпут
  openPopup(popUpProfileEdit);
});

popUpFormProfile.addEventListener('submit', e => {
  e.preventDefault();
  importPopUpEditProfileValuesFromInputs(popUpProfileEdit); // перенести значения инпутов в нужные строки профиля
  closePopup(popUpProfileEdit);
});

overlayCloseBtns.forEach(item => {
  item.addEventListener('click', () => {
    const box = item.closest('.pop-up');
    closePopup(box);
  });
});

function setCardHandling(cardElement) {
  cardElement.addEventListener('click', e => {
    openPopUpIfRequired(e);
    removeCardIfRequired(e);
    switchLikeActiveIfRequired(e);
  });
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  setCardHandling(cardElement);
  return cardElement;
}

function openPopUpIfRequired(e) {
  if (e.target.classList.contains('card__image')) {
    fillPopupImageFromCard(e);
    openPopup(popUpImageCard);
  }
}

function removeCardIfRequired(e) {
  // удаление карточки
  if (e.target.classList.contains('card__btn_type_delete')) {
    const targetBox = e.target.closest('.card');
    targetBox.remove();
  }
}

function switchLikeActiveIfRequired(e) {
  // переключение модификатора актив у кнопки лайка
  const btnLikeTarget = e.target;
  if (btnLikeTarget.classList.contains('card__btn')) {
    btnLikeTarget.classList.toggle('card__btn_like_active');
  }
}

// ? Закрытие по кнопке ESC
function closePopUpWhenEscIsDown(evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.pop-up_opened');
    if (openedPopUp) {
      closePopup(openedPopUp);
    }
  }
}

function renderInitialCards() {
  for (const item of initialCards.reverse()) {
    // вызовать функцию создания карточки у каждого элемента объекта
    renderCard(createCard(item));
  }
}

function renderCard(cardElement) {
  gallery.prepend(cardElement);
}

function closePopup(popUp) {
  popUp.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closePopUpWhenEscIsDown);
}

function fillPopupImageFromCard(e) {
  // передать информацию в поп-ап полноэранного просмотра картинки
  const box = e.target.closest('.card__image');
  imageItem.src = box.src;
  imageItem.alt = box.alt;
  popUpDescription.textContent = box.alt;
}

function addNewCard() {
  // добавить новую карточку по данным инпутов
  renderCard(createCard({ name: placeNameInput.value, link: placeLinkInput.value }));
}

function exportPopUpEditProfileValuesToInputs() {
  // переносим значения в инпуты из граф профиля
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
}

function importPopUpEditProfileValuesFromInputs() {
  // переносим значения из инпутов в графы профиля
  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;
}
