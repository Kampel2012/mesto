let profile = document.querySelector('.profile');
let profileEditBtn = profile.querySelector('.profile__btn_type_edit');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__subtitle');
let overlayAddBtn = profile.querySelector('.profile__btn_type_add');

let popUpCardAdd = document.querySelector('.pop-up_data_cards');
let popUpFormCards = popUpCardAdd.querySelector('.pop-up__form_data_cards');
let popUpProfileEdit = document.querySelector('.pop-up_data_profile');
let popUpFormProfile = popUpProfileEdit.querySelector('.pop-up__form_data_profile');

let overlayCloseBtn = document.querySelectorAll('.pop-up__btn_type_close');
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


overlayCloseBtn.forEach(item => {
  item.addEventListener('click', () => popUpCloseOverlay(popUpProfileEdit))
  item.addEventListener('click', () => popUpCloseOverlay(popUpCardAdd))
})


function popUpCloseOverlay(popUp) {
  popUp.classList.remove('pop-up_opened');
}

popUpFormCards.addEventListener('submit', e => {
  e.preventDefault();
  popUpCloseOverlay(popUpCardAdd);
});

overlayAddBtn.addEventListener('click', () => popUpOpenOverlay(popUpCardAdd));

function createCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  let cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  gallery.append(cardElement);
}

initialCards.forEach(item => createCard(item));

profileEditBtn.addEventListener('click', () => {
  popUpExportValueToInput(popUpProfileEdit);
  popUpOpenOverlay(popUpProfileEdit);
});

popUpFormProfile.addEventListener('submit', e => {
  e.preventDefault();
  popUpValueEdit(popUpProfileEdit);
  popUpCloseOverlay(popUpProfileEdit);
});

function popUpOpenOverlay(popUp) {
  popUp.classList.add('pop-up_opened');
}

function popUpExportValueToInput(popUp) {
  popUp.querySelector('.pop-up__input_type_name').value = profileName.textContent;
  popUp.querySelector('.pop-up__input_type_job').value = profileJob.textContent;
}

function popUpValueEdit(popUp) {
  let valueInputName = popUp.querySelector('.pop-up__input_type_name').value;
  let valueInputJob = popUp.querySelector('.pop-up__input_type_job').value;
  if (valueInputName == '' || valueInputJob == '') {
    alert('Заполните все поля ввода!');
  } else {
    profileName.textContent = valueInputName;
    profileJob.textContent = valueInputJob;
  }
}
