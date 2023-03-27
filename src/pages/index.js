import '../pages/index.css';

import { Card } from '../scripts/components/Card.js';
import { createValidationConfig } from '../scripts/utils/constants.js';
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
} from '../scripts/utils/constants.js';

// TODO TEST ZONE

const profileUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorJob: '.profile__subtitle',
  selectorAvatar: '.profile__avatar',
});

export const gallerySection = new Section(
  {
    renderer: item => createCard(item),
  },
  '.gallery',
);

import { api } from '../scripts/components/Api';
api.getUserInfoData().then(data => {
  profileUserInfo.setUserInfo({
    name: data.name,
    job: data.about,
    avatar: data.avatar,
  });
});
api.getInitialCards().then(data => gallerySection.renderItems(data));
/* api.addNewCard().then(res => createCard(res)); */
/* gallerySection.renderItems(); */
// TODO TEST OVER

const popupFullCard = new PopupWithImage('.pop-up_data_image-card');
const popupCards = new PopupWithForm('.pop-up_data_cards', addNewCardInGallery);
const popupProfile = new PopupWithForm(
  '.pop-up_data_profile',
  importPopUpEditProfileValuesFromInputs,
);

function exportPopUpEditProfileValuesToInputs() {
  const data = profileUserInfo.getUserInfo();
  profileInputName.value = data.name;
  profileInputJob.value = data.job;
  // переносим значения в инпуты из граф профиля
}

function importPopUpEditProfileValuesFromInputs(formInputs) {
  api.editProfile(formInputs);
  profileUserInfo.setUserInfo(formInputs);
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

function createCard(item) {
  return new Card(item, '#card-template', handleCardClick).getCardElement();
}

function addNewCardInGallery(formInputs) {
  api.addNewCard(formInputs).then(res => createCard(res));
  gallerySection.addItem(createCard(formInputs));
}

function handleCardClick(data) {
  popupFullCard.open(data);
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
