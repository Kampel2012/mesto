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
const popUpFullImgCard = document.querySelector('.pop-up_data_image-card');
const overlayCloseBtns = document.querySelectorAll('.pop-up__btn_type_close');
const profileInputName = popUpProfileEdit.querySelector('.pop-up__input_type_name');
const profileInputJob = popUpProfileEdit.querySelector('.pop-up__input_type_job');
const placeNameInput = document.querySelector('.pop-up__input_type_placeName');
const placeLinkInput = document.querySelector('.pop-up__input_type_placeLink');
const gallery = document.querySelector('.gallery');

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
