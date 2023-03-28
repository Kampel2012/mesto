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
  .then(
    api
      .getInitialCards()
      .catch(err => console.log(err))
      .then(data => gallerySection.renderItems(data)),
  )
  .catch(err => console.log(err));

const popupFullCard = new PopupWithImage('.pop-up_data_image-card');
const popupAvatar = new PopupWithForm(
  '.pop-up_data_avatar',
  handleAvatarSubmit,
);
const popupCards = new PopupWithForm('.pop-up_data_cards', addNewCardInGallery);
const popupProfile = new PopupWithForm(
  '.pop-up_data_profile',
  handleSubmitProfile,
);
const popupConfirm = new PopupWithSubmit(
  '.pop-up_confirm',
  handleSubmitConfirm,
);

function handleAvatarSubmit(link) {
  api
    .editProfileAvatar(link)
    .then(res => profileUserInfo.setUserInfo(res))
    .catch(err => console.log(err))
    .then(() => this.close())
    .catch(err => console.log(err))
    .finally(() => this.toggleBtnContent());
}

function handleConfirmDel(card) {
  popupConfirm.open(card);
}

function handleSubmitConfirm(card) {
  return api
    .deleteCard(card.getCardId())
    .then(card.removeCard())
    .catch(err => console.log(err))
    .then(() => this.close())
    .catch(err => console.log(err))
    .finally(() => this.toggleBtnContent());
}

function createCard(item) {
  return new Card(
    item,
    '#card-template',
    handleCardClick,
    handleConfirmDel,
    profileUserInfo.getUserId(),
    hendleForLikeBtn,
  ).getCardElement();
}

function hendleForLikeBtn(requestType) {
  return api
    .switchStateLike(this._id, requestType)
    .then(
      res => (
        (this._likesData = res.likes),
        (this._cardCounterContainer.textContent = res.likes.length)
      ),
    )
    .then(() => this.switchLikeActiveIfRequired())
    .catch(err => console.log(err));
}

function exportPopUpEditProfileValuesToInputs() {
  const data = profileUserInfo.getUserInfo();
  profileInputName.value = data.name;
  profileInputJob.value = data.job;
}

function handleSubmitProfile(formInputs) {
  return api
    .editProfile(formInputs)
    .then(profileUserInfo.setUserInfo(formInputs))
    .catch(err => console.log(err))
    .then(this.close())
    .catch(err => console.log(err))
    .finally(() => this.toggleBtnContent());
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

function addNewCardInGallery(formInputs) {
  return api
    .addNewCard(formInputs)
    .then(res => createCard(res))
    .then(card => gallerySection.addItem(card))
    .then(this.close())
    .catch(err => console.log(err))
    .finally(() => this.toggleBtnContent());
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
