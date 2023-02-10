import { createInitialCardsArr } from '../modules/cards.js';
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

const objForValidate = {
  formSelector: '.pop-up__form',
  inputSelector: 'pop-up__input',
  submitButtonSelector: 'pop-up__btn_type_submit',
  inactiveButtonClass: 'pop-up__btn_inActive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

// ? Включение валидации путем перебора всех форм + выключение сабмита
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.pop-up__form'));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach(fieldset => setEventListeners(fieldset));
  });
}
enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some(item => !item.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('pop-up__btn_inActive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('pop-up__btn_inActive');
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.pop-up__input'));
  const buttonElement = formElement.querySelector('.pop-up__btn_type_submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement =>
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    }),
  );
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__error_visible');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__error_visible');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// TODO TEST ZONE

// TODO old test zone
// ? Закрытие по клику вне поп-апа
const popUps = [popUpProfileEdit, popUpCardAdd, popUpImageCard];
popUps.forEach(function (popUp) {
  popUp.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopUpOverlay(popUp);
    }
  });
});

// ? Закрытие по кнопке ESC
function closePopUpWhenEscIsDown(evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.pop-up_opened');
    if (openedPopUp) {
      closePopUpOverlay(openedPopUp);
    }
  }
}
document.addEventListener('keydown', closePopUpWhenEscIsDown);

// TODO end test zone

renderInitialCards(); // создать галерею из карточек в объекте

gallery.addEventListener('click', e => {
  openPopUpIfRequired(e);
  removeCardIfRequired(e);
  switchLikeActiveIfRequired(e);
});

function openPopUpIfRequired(e) {
  if (e.target.classList.contains('card__image')) {
    fillPopupImageFromCard(e);
    openPopUpOverlay(popUpImageCard);
  }
}

overlayAddBtn.addEventListener('click', e => {
  openPopUpOverlay(popUpCardAdd);
  popUpFormCards.reset();
});

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  addNewCard();
  closePopUpOverlay(popUpCardAdd);
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpEditProfileValuesToInputs(popUpProfileEdit); // переносим нынешние значения в инпут
  openPopUpOverlay(popUpProfileEdit);
});

popUpFormProfile.addEventListener('submit', e => {
  e.preventDefault();
  importPopUpEditProfileValuesFromInputs(popUpProfileEdit); // перенести значения инпутов в нужные строки профиля
  closePopUpOverlay(popUpProfileEdit);
});

overlayCloseBtns.forEach(item => {
  item.addEventListener('click', () => {
    const box = item.closest('.pop-up');
    closePopUpOverlay(box);
  });
});

function renderInitialCards() {
  for (const item of initialCards.reverse()) {
    // вызовать функцию создания карточки у каждого элемента объекта
    renderCard(createCard(item));
  }
}

function createCard(item) {
  // создать карточку
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  return cardElement;
}

function renderCard(cardElement) {
  gallery.prepend(cardElement);
}

function openPopUpOverlay(popUp) {
  popUp.classList.add('pop-up_opened');
  popUp.querySelectorAll('.pop-up__input-error').forEach(item => (item.textContent = ''));
  popUp
    .querySelectorAll('.pop-up__input')
    .forEach(item => item.classList.remove('form__input_type_error'));
}

function closePopUpOverlay(popUp) {
  popUp.classList.remove('pop-up_opened');
}

function fillPopupImageFromCard(e) {
  // передать информацию в поп-ап полноэранного просмотра картинки
  const box = e.target.closest('.card__image');
  const imageItem = document.querySelector('.pop-up__image-card');
  imageItem.src = box.src;
  imageItem.alt = box.alt;
  document.querySelector('.pop-up__subtitle').textContent = box.alt;
}

function addNewCard() {
  // добавить новую карточку по данным инпутов
  renderCard(createCard({ name: placeNameInput.value, link: placeLinkInput.value }));
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
