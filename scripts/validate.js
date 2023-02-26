export const validationConfig = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__btn_type_submit',
  fiedSetSelector: '.pop-up__set',
  inactiveButtonClass: 'pop-up__btn_inActive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_visible',
};

export class FormValidator {
  constructor(config, elemForValid) {
    this._config = config;
    this._elemForValid = elemForValid;
    this._inputList = this._makeListInputs(); // TODO это работает?
    this._buttonElement = this._elemForValid.querySelector(this._config.submitButtonSelector);
  }

  _makeListInputs() {
    return Array.from(this._elemForValid.querySelectorAll(this._config.inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some(item => !item.validity.valid);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._elemForValid.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._elemForValid.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement =>
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      }),
    );
  }

  disableSubmitBtn() {
    this._buttonElement.disabled = true;
  }

  removeValidationErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._elemForValid.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      this._elemForValid.querySelectorAll(this._config.fiedSetSelector),
    );
    fieldsetList.forEach(fieldset => {
      this._setEventListeners(fieldset);
    });
  }
}
