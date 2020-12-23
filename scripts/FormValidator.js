export default class FormValidator {
    constructor(config, form) {
        this._name = name;
        this._form = form;
        this._config = config;
        this._inputsList = form.querySelectorAll(this._config.inputSelector);
    }

    _showError = (input) => {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError = (input) => {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputErrorClass);
    }

    _checkInputValidity = (input) => {
            if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _setButtonState = (button, isActive) => {
        if (isActive) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListeners = (form) => {
        
        const submitButton = form.querySelector(this._config.submitButtonSelector);

        this._inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(submitButton, this._form.checkValidity());
            });
        });
    }

    enableValidation = () => {
        this._setEventListeners(this._form);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._inputsList.forEach((input) => {
            this._hideError(input);
        });
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._setButtonState(submitButton, this._form.checkValidity());
    }

}


