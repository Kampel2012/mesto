export const validationConfig = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__btn_type_submit',
  fiedSetSelector: '.pop-up__set',
  inactiveButtonClass: 'pop-up__btn_inActive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_visible',
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function makeListInputs(formElement, config) {
  return Array.from(formElement.querySelectorAll(config.inputSelector));
}

const setEventListeners = (formElement, config) => {
  const inputList = makeListInputs(formElement, config);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(inputElement =>
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    }),
  );
};

const hasInvalidInput = inputList => {
  return inputList.some(item => !item.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(config.fiedSetSelector));
    fieldsetList.forEach(function (fieldset) {
      setEventListeners(fieldset, config);
    });
  });
};

enableValidation(validationConfig);

export function disableSubmitBtn(popUp) {
  const buttonElement = popUp.querySelector(validationConfig.submitButtonSelector);
  buttonElement.disabled = true;
}

export function removeValidationErrors(popUp, config) {
  const listInputs = makeListInputs(popUp, config);
  listInputs.forEach(item => {
    hideInputError(popUp, item, config);
  });
}
