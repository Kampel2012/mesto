let profile = document.querySelector('.profile');
let popUp = document.querySelector('.pop-up');
let profileEditBtn = profile.querySelector('.profile__btn_type_edit');
let overlayCloseBtn = popUp.querySelector('.pop-up__btn_type_close');
let popUpForm = popUp.querySelector('.pop-up__form');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__subtitle');
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

function createCards(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  let cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  gallery.append(cardElement);
}

initialCards.forEach(item => createCards(item));

function popUpOpenOverlay() {
  popUp.classList.add('pop-up_opened');
  popUp.querySelector('.pop-up__input_type_name').value = profileName.textContent;
  popUp.querySelector('.pop-up__input_type_job').value = profileJob.textContent;
}

profileEditBtn.addEventListener('click', popUpOpenOverlay);

function popUpValueEdit() {
  let valueInputName = popUp.querySelector('.pop-up__input_type_name').value;
  let valueInputJob = popUp.querySelector('.pop-up__input_type_job').value;
  if (valueInputName == '' || valueInputJob == '') {
    alert('Заполните все поля ввода!');
  } else {
    profileName.textContent = valueInputName;
    profileJob.textContent = valueInputJob;
  }
}

function popUpCloseOverlay() {
  popUp.classList.remove('pop-up_opened');
}

overlayCloseBtn.addEventListener('click', popUpCloseOverlay);

popUpForm.addEventListener('submit', e => {
  e.preventDefault();
  popUpValueEdit();
  popUpCloseOverlay();
});
