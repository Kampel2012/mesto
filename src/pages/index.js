import '../pages/index.css';

import { Card } from '../scripts/components/Card.js';
import {
  createInitialCardsArr,
  createValidationConfig,
} from '../scripts/utils/constants.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage';
import PopupWithForm from '../scripts/components/PopupWithForm';
import UserInfo from '../scripts/components/UserInfo';

import {
  profileEditBtn,
  overlayAddBtn,
  popUpFormCards,
  popUpFormProfile,
  profileInputName,
  profileInputJob,
  placeNameInput,
  placeLinkInput,
  imageItem,
  popUpDescription,
} from '../scripts/utils/constants.js';

const initialCards = createInitialCardsArr();

const profileUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorJob: '.profile__subtitle',
});

const popupFullCard = new PopupWithImage('.pop-up_data_image-card');
const popupCards = new PopupWithForm('.pop-up_data_cards', addNewCardInGallery);
const popupProfile = new PopupWithForm(
  '.pop-up_data_profile',
  importPopUpEditProfileValuesFromInputs,
);

function exportPopUpEditProfileValuesToInputs() {
  profileInputName.value = profileUserInfo.getUserInfo().name;
  profileInputJob.value = profileUserInfo.getUserInfo().job;
  // переносим значения в инпуты из граф профиля
}

function importPopUpEditProfileValuesFromInputs() {
  profileUserInfo.setUserInfo(popupProfile.info);
  // переносим значения из инпутов в графы профиля
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

const gallerySection = new Section(
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

overlayAddBtn.addEventListener('click', () => {
  popupCards.open();
  validationFormPopupCards.disableSubmitBtn();
  validationFormPopupCards.removeValidationErrors();
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpEditProfileValuesToInputs(); // переносим нынешние значения в инпут
  validationFormPopupProfile.disableSubmitBtn();
  validationFormPopupProfile.removeValidationErrors();
  popupProfile.open();
});
