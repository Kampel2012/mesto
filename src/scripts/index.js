import '../pages/index.css';

import { Card } from './components/card.js';
import {
  createInitialCardsArr,
  createValidationConfig,
} from './utils/constants.js';
import { FormValidator } from './components/validate.js';
import Section from './components/section.js';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from './components/UserInfo';

import {
  profileEditBtn,
  overlayAddBtn,
  popUpFormCards,
  popUpProfileEdit,
  popUpFormProfile,
  profileInputName,
  profileInputJob,
  placeNameInput,
  placeLinkInput,
  imageItem,
  popUpDescription,
} from './utils/constants.js';

const initialCards = createInitialCardsArr();

const popupFullCard = new PopupWithImage('.pop-up_data_image-card');
const popupCards = new PopupWithForm('.pop-up_data_cards', addNewCardInGallery);
const popupProfile = new PopupWithForm(
  '.pop-up_data_profile',
  importPopUpEditProfileValuesFromInputs,
);

const profileUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorJob: '.profile__subtitle',
});

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
  exportPopUpEditProfileValuesToInputs(popUpProfileEdit); // переносим нынешние значения в инпут
  validationFormPopupProfile.disableSubmitBtn();
  validationFormPopupProfile.removeValidationErrors();
  popupProfile.open();
});
