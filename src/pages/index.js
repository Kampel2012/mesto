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
  popUpFormAvatar,
  openPopupAvatarBtn,
} from '../scripts/utils/constants.js';

export const profileUserInfo = new UserInfo({
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
import PopupWithSubmit from '../scripts/components/PopupWithSubmit';
api
  .getUserInfoData()
  .then(data => {
    profileUserInfo.setUserInfo({
      name: data.name,
      job: data.about,
      avatar: data.avatar,
      _id: data._id,
    });
  })
  .then(api.getInitialCards().then(data => gallerySection.renderItems(data)))
  .catch(err => console.log(err));

const popupFullCard = new PopupWithImage('.pop-up_data_image-card');
const popupAvatar = new PopupWithForm(
  '.pop-up_data_avatar',
  handleAvatarSubmit,
);
const popupCards = new PopupWithForm('.pop-up_data_cards', addNewCardInGallery);
const popupProfile = new PopupWithForm(
  '.pop-up_data_profile',
  importPopUpEditProfileValuesFromInputs,
);
const popupConfirm = new PopupWithSubmit(
  '.pop-up_confirm',
  handleSubmitConfirm,
);

let currentCardId = 0;
let cardToDelete = '';

function handleAvatarSubmit(link) {
  api.editProfileAvatar(link).then(res => profileUserInfo.setUserInfo(res));
}

function handleConfirmDel(id, card) {
  popupConfirm.open();
  currentCardId = id;
  cardToDelete = card;
}

function handleSubmitConfirm() {
  return api
    .deleteCard(currentCardId)
    .then(() => cardToDelete.remove())
    .then(() => (cardToDelete = null))
    .catch(err => console.log(err));
}

function exportPopUpEditProfileValuesToInputs() {
  const data = profileUserInfo.getUserInfo();
  profileInputName.value = data.name;
  profileInputJob.value = data.job;
  // переносим значения в инпуты из граф профиля
}

function importPopUpEditProfileValuesFromInputs(formInputs) {
  return api
    .editProfile(formInputs)
    .then(profileUserInfo.setUserInfo(formInputs));
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
const validationFormPopupAvatar = new FormValidator(
  createValidationConfig(),
  popUpFormAvatar,
);

validationFormPopupProfile.enableValidation();
validationFormPopupCards.enableValidation();
validationFormPopupAvatar.enableValidation();

function createCard(item) {
  let card = new Card(
    item,
    '#card-template',
    handleCardClick,
    handleConfirmDel,
  ).getCardElement();
  if (item.owner._id !== profileUserInfo._id) {
    card.querySelector('.card__btn_type_delete').remove();
  }
  return card;
}

function addNewCardInGallery(formInputs) {
  return api
    .addNewCard(formInputs)
    .then(res => createCard(res))
    .then(card => gallerySection.addItem(card))
    .catch(err => console.log(err));
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

openPopupAvatarBtn.addEventListener('click', () => {
  popupAvatar.open();
  validationFormPopupAvatar.disableSubmitBtn();
  validationFormPopupAvatar.removeValidationErrors();
});
