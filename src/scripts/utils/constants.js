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
const popUpFormAvatar = document.querySelector('.pop-up__form_data_avatar');
const openPopupAvatarBtn = document.querySelector('.profile__btn_type_avatar');
/* const popUpConfirm = document.querySelector('.pop-up_confirm'); */

export {
  profileEditBtn,
  overlayAddBtn,
  popUpFormCards,
  popUpFormProfile,
  profileInputName,
  profileInputJob,
  popUpFormAvatar,
  openPopupAvatarBtn,
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
