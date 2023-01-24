let profile = document.querySelector('.profile');
let profileEditBtn = profile.querySelector('.profile__btn_type_edit');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__subtitle');
let overlayAddBtn = profile.querySelector('.profile__btn_type_add');
let popUpImageCard = document.querySelector('.pop-up_data_image-card');
let popUpCardAdd = document.querySelector('.pop-up_data_cards');
let popUpFormCards = popUpCardAdd.querySelector('.pop-up__form_data_cards');
let popUpProfileEdit = document.querySelector('.pop-up_data_profile');
let popUpFormProfile = popUpProfileEdit.querySelector('.pop-up__form_data_profile');
let popUpFullImgCard = document.querySelector('.pop-up_data_image-card');
let overlayCloseBtns = document.querySelectorAll('.pop-up__btn_type_close');
let gallery = document.querySelector('.gallery');

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

/* for test */

/* for test END */
renderCards(); // создать галерею из карточек в объекте

gallery.addEventListener('click', e => {
  let box = e.target.closest('.card__image');
  if (box) {
    exportImageFromCard(box);
    popUpOpenOverlay(popUpImageCard);
  }
});

gallery.addEventListener('click', cardRemove);
gallery.addEventListener('click', switchLikeActive);
overlayAddBtn.addEventListener('click', () => popUpOpenOverlay(popUpCardAdd));

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  addNewCard();
  popUpCloseOverlay(popUpCardAdd);
  clearInput(e.currentTarget);
});

profileEditBtn.addEventListener('click', () => {
  popUpExportValueToInput(popUpProfileEdit); // переносим нынешние значения в инпут
  popUpOpenOverlay(popUpProfileEdit);
});

popUpFormProfile.addEventListener('submit', e => {
  e.preventDefault();
  popUpValueEdit(popUpProfileEdit); // перенести значения инпутов в нужные строки профиля
  popUpCloseOverlay(popUpProfileEdit);
});

overlayCloseBtns.forEach(item => {
  item.addEventListener('click', () => {
    let box = item.closest('.pop-up');
    popUpCloseOverlay(box);
    if (box === popUpCardAdd) {
      clearInput(box); // очистить инпуты при закрытии у поп-апа с добавлением карточки
    }
  });
});

function renderCards() {
  for (item of initialCards.reverse()) {
    createCard(item); // вызовать функцию создания карточки у каждого элемента объекта
  }
}

function createCard(item) {
  // создать карточку
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  let cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  gallery.prepend(cardElement);
}

function popUpOpenOverlay(popUp) {
  popUp.classList.add('pop-up_opened');
}

function popUpCloseOverlay(popUp) {
  popUp.classList.remove('pop-up_opened');
}

function exportImageFromCard(box) {
  // передать информацию в поп-ап полноэранного просмотра картинки
  let imageItem = document.querySelector('.pop-up__image-card');
  imageItem.src = box.src;
  imageItem.alt = box.alt;
  document.querySelector('.pop-up__subtitle').textContent = box.alt;
}

function addNewCard() {
  // добавить новуб карточку по данным инпутов
  let placeNameInput = document.querySelector('.pop-up__input_type_placeName');
  let placeLinkInput = document.querySelector('.pop-up__input_type_placeLink');
  if (placeNameInput.value === '' || placeLinkInput.value === '') {
    alert('Необходимо заполнить все поля');
  } else {
    initialCards.push({ name: placeNameInput.value, link: placeLinkInput.value });
    createCard({ name: placeNameInput.value, link: placeLinkInput.value });
  }
}

function cardRemove(e) {
  // удаление карточки
  if (e.target.classList.contains('card__btn_type_delete')) {
    let targetBox = e.target.closest('.card');
    targetBox.remove();
  }
}

function clearInput(box) {
  // очистка инпутов
  box.querySelectorAll('.pop-up__input').forEach(item => (item.value = ''));
}

function switchLikeActive(e) {
  // переключение модификатора актив у кнопки лайка
  let btnLikeTarget = e.target;
  if (btnLikeTarget.closest('.card__btn')) {
    btnLikeTarget.classList.toggle('card__btn_like_active');
  }
}

function popUpExportValueToInput(popUp) {
  // переносим значения в инпуты из граф профиля
  popUp.querySelector('.pop-up__input_type_name').value = profileName.textContent;
  popUp.querySelector('.pop-up__input_type_job').value = profileJob.textContent;
}

function popUpValueEdit(popUp) {
  // переносим значения из инпутов в графы профиля
  let valueInputName = popUp.querySelector('.pop-up__input_type_name').value;
  let valueInputJob = popUp.querySelector('.pop-up__input_type_job').value;
  if (valueInputName == '' || valueInputJob == '') {
    alert('Заполните все поля ввода!');
  } else {
    profileName.textContent = valueInputName;
    profileJob.textContent = valueInputJob;
  }
}
