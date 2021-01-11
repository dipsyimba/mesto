import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._element = this._popupForm.querySelector('.popup__form');
        this._setEventListeners();
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formData = {};
        this._inputList.forEach(input => {
            this._formData[input.name] = input.value;
        });

        return this._formData;
    }

    close() {
        this._element.reset();
        super.close();
    }

    _setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }
}