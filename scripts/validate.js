const validationConfig = {
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
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function makeListInputs(formElement) {
  return Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
}

const setEventListeners = formElement => {
  const inputList = makeListInputs(formElement);
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
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
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = validationConfig => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.fiedSetSelector));
    fieldsetList.forEach(function (fieldset) {
      setEventListeners(fieldset);
    });
  });
};

enableValidation(validationConfig);

export function removeValidationErrors(popUp) {
  const listInputs = makeListInputs(popUp);
  listInputs.forEach(item => {
    hideInputError(popUp, item);
  });
}
