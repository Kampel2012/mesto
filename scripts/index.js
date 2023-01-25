'use strict';

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
const gallery = document.querySelector('.gallery');
let isAllDoneCardAdd = false;
let isAllDoneProfileEdit = false;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

renderCards(); // создать галерею из карточек в объекте

gallery.addEventListener('click', e => {
  const box = e.target.closest('.card__image');
  if (box) {
    exportImageFromCard(box);
    popUpOpenOverlay(popUpImageCard);
  }
});

gallery.addEventListener('click', removeCard);
gallery.addEventListener('click', switchLikeActive);
overlayAddBtn.addEventListener('click', () => popUpOpenOverlay(popUpCardAdd));

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  addNewCard();
  if (isAllDoneCardAdd) {
    closePopUpOverlay(popUpCardAdd);
  }
  clearInput(e.currentTarget);
});

profileEditBtn.addEventListener('click', () => {
  exportPopUpValueToInput(popUpProfileEdit); // переносим нынешние значения в инпут
  popUpOpenOverlay(popUpProfileEdit);
});

popUpFormProfile.addEventListener('submit', e => {
  e.preventDefault();
  editPopUpValue(popUpProfileEdit); // перенести значения инпутов в нужные строки профиля
  if (isAllDoneProfileEdit) {
    closePopUpOverlay(popUpProfileEdit);
  }
});

overlayCloseBtns.forEach(item => {
  item.addEventListener('click', () => {
    const box = item.closest('.pop-up');
    closePopUpOverlay(box);
    if (box === popUpCardAdd) {
      clearInput(box); // очистить инпуты при закрытии у поп-апа с добавлением карточки
    }
  });
});

function renderCards() {
  for (const item of initialCards.reverse()) {
    createCard(item); // вызовать функцию создания карточки у каждого элемента объекта
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
  gallery.prepend(cardElement);
}

function popUpOpenOverlay(popUp) {
  popUp.classList.add('pop-up_opacity');
  popUp.classList.add('pop_up_visibility_visible');
}

function closePopUpOverlay(popUp) {
  popUp.classList.remove('pop-up_opacity');
  setTimeout(() => {
    popUp.classList.remove('pop_up_visibility_visible');
  }, 300);
}

function exportImageFromCard(box) {
  // передать информацию в поп-ап полноэранного просмотра картинки
  const imageItem = document.querySelector('.pop-up__image-card');
  imageItem.src = box.src;
  imageItem.alt = box.alt;
  document.querySelector('.pop-up__subtitle').textContent = box.alt;
}

function addNewCard() {
  // добавить новуб карточку по данным инпутов
  const placeNameInput = document.querySelector('.pop-up__input_type_placeName');
  const placeLinkInput = document.querySelector('.pop-up__input_type_placeLink');
  if (placeNameInput.value === '' || placeLinkInput.value === '') {
    alert('Необходимо заполнить все поля');
    isAllDoneCardAdd = false;
  } else {
    initialCards.push({ name: placeNameInput.value, link: placeLinkInput.value });
    createCard({ name: placeNameInput.value, link: placeLinkInput.value });
    isAllDoneCardAdd = true;
  }
}

function removeCard(e) {
  // удаление карточки
  if (e.target.classList.contains('card__btn_type_delete')) {
    const targetBox = e.target.closest('.card');
    targetBox.remove();
  }
}

function clearInput(box) {
  // очистка инпутов
  box.querySelectorAll('.pop-up__input').forEach(item => (item.value = ''));
}

function switchLikeActive(e) {
  // переключение модификатора актив у кнопки лайка
  const btnLikeTarget = e.target;
  if (btnLikeTarget.closest('.card__btn')) {
    btnLikeTarget.classList.toggle('card__btn_like_active');
  }
}

function exportPopUpValueToInput(popUp) {
  // переносим значения в инпуты из граф профиля
  popUp.querySelector('.pop-up__input_type_name').value = profileName.textContent;
  popUp.querySelector('.pop-up__input_type_job').value = profileJob.textContent;
}

function editPopUpValue(popUp) {
  // переносим значения из инпутов в графы профиля
  const valueInputName = popUp.querySelector('.pop-up__input_type_name').value;
  const valueInputJob = popUp.querySelector('.pop-up__input_type_job').value;
  if (valueInputName == '' || valueInputJob == '') {
    alert('Заполните все поля ввода!');
    isAllDoneProfileEdit = false;
  } else {
    profileName.textContent = valueInputName;
    profileJob.textContent = valueInputJob;
    isAllDoneProfileEdit = true;
  }
}
