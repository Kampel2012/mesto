import '../pages/index.css';

import { Card } from './components/card.js';
import {
  createInitialCardsArr,
  createValidationConfig,
} from './utils/constants.js';
import { FormValidator } from './components/validate.js';
import Section from './components/section.js';
import Popup from './components/Popup';

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

const popupProfile = new Popup('.pop-up_data_profile');
const popupCards = new Popup('.pop-up_data_cards');
const popupFullCard = new Popup('.pop-up_data_image-card');

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
    renderer: item => new Card(item, '#card-template').getCardElement(),
  },
  '.gallery',
);

gallerySection.renderItems();

function addNewCardInGallery() {
  gallerySection.addItem(
    new Card(
      { name: placeNameInput.value, link: placeLinkInput.value },
      '#card-template',
    ).getCardElement(),
  );
}

gallerySection.container.addEventListener('click', e => {
  if (e.target.classList.contains('card__image')) {
    fillPopupImageFromCard(e.target);
    popupFullCard.open();
  }
});

// TODO TEST ZONA END ////////////////////////////////////////////

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  addNewCardInGallery();
  popupCards.close();
});

overlayAddBtn.addEventListener('click', e => {
  popupCards.open();
  validationFormPopupCards.disableSubmitBtn();
  validationFormPopupCards.removeValidationErrors();
  popUpFormCards.reset();
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpEditProfileValuesToInputs(popUpProfileEdit); // переносим нынешние значения в инпут
  validationFormPopupProfile.disableSubmitBtn();
  validationFormPopupProfile.removeValidationErrors();
  popupProfile.open();
});

popUpFormProfile.addEventListener('submit', e => {
  e.preventDefault();
  importPopUpEditProfileValuesFromInputs(popUpProfileEdit);
  popupProfile.close();
});

function fillPopupImageFromCard(box) {
  // передать информацию в поп-ап полноэранного просмотра картинки
  imageItem.src = box.src;
  imageItem.alt = box.alt;
  popUpDescription.textContent = box.alt;
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
