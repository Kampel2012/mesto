import '../pages/index.css';

import { Card } from './components/card.js';
import {
  createInitialCardsArr,
  createValidationConfig,
} from './utils/constants.js';
import { FormValidator } from './components/validate.js';
import Section from './components/section.js';
import Popup from './components/Popup';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';

const initialCards = createInitialCardsArr();
const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__btn_type_edit');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__subtitle');
const overlayAddBtn = profile.querySelector('.profile__btn_type_add');
const popUpCardAdd = document.querySelector('.pop-up_data_cards');
const popUpFormCards = popUpCardAdd.querySelector('.pop-up__form_data_cards');
const popUpProfileEdit = document.querySelector('.pop-up_data_profile');
const popUpFormProfile = popUpProfileEdit.querySelector(
  '.pop-up__form_data_profile',
);
const profileInputName = popUpProfileEdit.querySelector(
  '.pop-up__input_type_name',
);
const profileInputJob = popUpProfileEdit.querySelector(
  '.pop-up__input_type_job',
);
const placeNameInput = document.querySelector('.pop-up__input_type_placeName');
const placeLinkInput = document.querySelector('.pop-up__input_type_placeLink');
const imageItem = document.querySelector('.pop-up__image-card');
const popUpDescription = document.querySelector('.pop-up__subtitle');

const popupFullCard = new PopupWithImage('.pop-up_data_image-card');
const popupCards = new PopupWithForm('.pop-up_data_cards', addNewCardInGallery);
const popupProfile = new PopupWithForm(
  '.pop-up_data_profile',
  importPopUpEditProfileValuesFromInputs,
);

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

const validationFormPopupProfile = new FormValidator(
  createValidationConfig(),
  popUpFormProfile,
);
const validationFormPopupCards = new FormValidator(
  createValidationConfig(),
  popUpFormCards,
);
validationFormPopupProfile.enableValidation();
validationFormPopupCards.enableValidation();

// TODO TEST ZONA ////////////////////////////////////////////

let gallerySection = new Section(
  {
    items: initialCards.reverse(),
    renderer: item =>
      new Card(item, '#card-template', handleCardClick).getCardElement(),
  },
  '.gallery',
);

gallerySection.renderItems();

function addNewCardInGallery() {
  gallerySection.addItem(
    new Card(
      { name: placeNameInput.value, link: placeLinkInput.value },
      '#card-template',
      handleCardClick,
    ).getCardElement(),
  );
}

function handleCardClick(e) {
  popupFullCard.open(e.target, imageItem, popUpDescription);
}

// TODO TEST ZONA END ////////////////////////////////////////////

overlayAddBtn.addEventListener('click', () => {
  popupCards.open();
  validationFormPopupCards.disableSubmitBtn();
  validationFormPopupCards.removeValidationErrors();
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpEditProfileValuesToInputs(popUpProfileEdit); // переносим нынешние значения в инпут
  validationFormPopupProfile.disableSubmitBtn();
  validationFormPopupProfile.removeValidationErrors();
  popupProfile.open();
});
