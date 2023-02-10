const objForValidate = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__btn_type_submit',
  fiedSetSelector: '.pop-up__set',
  inactiveButtonClass: 'pop-up__btn_inActive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_visible',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objForValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objForValidate.errorClass);
};

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objForValidate.inputErrorClass);
  errorElement.classList.remove(objForValidate.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll(objForValidate.inputSelector));
  const buttonElement = formElement.querySelector(objForValidate.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement =>
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    }),
  );
};

const hasInvalidInput = inputList => {
  return inputList.some(item => !item.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objForValidate.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(objForValidate.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = objForValidate => {
  const formList = Array.from(document.querySelectorAll(objForValidate.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(objForValidate.fiedSetSelector));
    fieldsetList.forEach(function (fieldset) {
      setEventListeners(fieldset);
    });
  });
};

enableValidation(objForValidate);
