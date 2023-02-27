import { Card } from './card.js';
import { createInitialCardsArr } from './cards.js';
import { validationConfig, FormValidator } from './validate.js';

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

const validationFormPopupProfile = new FormValidator(validationConfig, popUpFormProfile);
const validationFormPopupCards = new FormValidator(validationConfig, popUpFormCards);
validationFormPopupProfile.enableValidation();
validationFormPopupCards.enableValidation();

renderInitialCards();

gallery.addEventListener('click', e => {
  const box = e.target.closest('.card__image');
  if (box) {
    fillPopupImageFromCard(box);
    openPopup(popUpImageCard);
  }
});

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  addNewCard();
  closePopup(popUpCardAdd);
});

overlayAddBtn.addEventListener('click', e => {
  openPopup(popUpCardAdd);
  validationFormPopupCards.disableSubmitBtn();
  validationFormPopupCards.removeValidationErrors();
  popUpFormCards.reset();
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpEditProfileValuesToInputs(popUpProfileEdit); // переносим нынешние значения в инпут
  validationFormPopupProfile.disableSubmitBtn();
  validationFormPopupProfile.removeValidationErrors();
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

function renderCard(cardElement) {
  gallery.prepend(cardElement);
}

function renderInitialCards() {
  for (const item of initialCards.reverse()) {
    // вызовать функцию создания карточки у каждого элемента объекта
    renderCard(new Card(item, cardTemplate));
  }
}

function fillPopupImageFromCard(box) {
  // передать информацию в поп-ап полноэранного просмотра картинки
  imageItem.src = box.src;
  imageItem.alt = box.alt;
  popUpDescription.textContent = box.alt;
}

function addNewCard() {
  // добавить новую карточку по данным инпутов
  renderCard(new Card({ name: placeNameInput.value, link: placeLinkInput.value }, cardTemplate));
}

function openPopup(popUp) {
  popUp.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopUpWhenEscIsDown);
}

function closePopup(popUp) {
  popUp.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closePopUpWhenEscIsDown);
}

// ? Закрытие по клику вне поп-апа
popUps.forEach(function (popUp) {
  popUp.addEventListener('mousedown', function (evt) {
    // не клик, потому что выделяя текст из инпута мышка часто выходит за пределы и поп ап закрывается
    if (evt.target === evt.currentTarget) {
      closePopup(popUp);
    }
  });
});

// ? Закрытие по кнопке ESC
function closePopUpWhenEscIsDown(evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.pop-up_opened');
    if (openedPopUp) {
      closePopup(openedPopUp);
    }
  }
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
