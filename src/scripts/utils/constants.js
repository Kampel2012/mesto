import { api } from '../components/Api';

const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__btn_type_edit');
const overlayAddBtn = profile.querySelector('.profile__btn_type_add');
const popUpCardAdd = document.querySelector('.pop-up_data_cards');
const popUpFormCards = popUpCardAdd.querySelector('.pop-up__form_data_cards');
const popUpProfileEdit = document.querySelector('.pop-up_data_profile');
const popUpFormProfile = popUpProfileEdit.querySelector(
  '.pop-up__form_data_profile',
);
const profileInputName = popUpProfileEdit.querySelector(
  '.pop-up__input_type_name',
);
const profileInputJob = popUpProfileEdit.querySelector(
  '.pop-up__input_type_job',
);

export {
  profileEditBtn,
  overlayAddBtn,
  popUpFormCards,
  popUpFormProfile,
  profileInputName,
  profileInputJob,
};

export function createValidationConfig() {
  return {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__btn_type_submit',
    fiedSetSelector: '.pop-up__set',
    inactiveButtonClass: 'pop-up__btn_inActive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_visible',
  };
}

export function createInitialCardsArr() {
  const result = [];
  api.getInitialCards().then(items => {
    items.forEach(elem => {
      result.push(elem);
    });
  });
  console.log(result);
  return result;
}
