export default class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._config = config;
        this._inputsList = Array.from(form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    }

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputErrorClass);
    }

    _checkInputValidity(input) {
            if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _setButtonState(isActive) {
        if (isActive) {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(this._form.checkValidity());
            });
        });
    }

    cleanInputErrors() {
        this._inputsList.forEach((input) => {
            this._hideError(input);
        });
        
        this._setButtonState(this._form.checkValidity());
    }

    enableValidation() {
        this._setEventListeners(this._form);
        this._inputsList.forEach((input) => {
            this._hideError(input);
        });
        this._setButtonState(this._form.checkValidity());
    }

}


