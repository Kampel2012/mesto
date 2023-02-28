export class FormValidator {
  constructor(config, elemForValid) {
    this._config = config;
    this._elemForValid = elemForValid;
    this._inputList = this._makeListInputs();
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
      this.disableSubmitBtn();
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
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  removeValidationErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    /*     this._elemForValid.addEventListener('submit', function (evt) {
      evt.preventDefault();
    }); */ // ?
    this._setEventListeners();
  }
}
