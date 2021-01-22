import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formData = {};
    this._inputList.forEach((input) => {
      this._formData[input.name] = input.value;
    });

    return this._formData;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  getBtnText() {
    return this._submitButton.textContent;
  }

  setBtnText(text) {
    this._submitButton.textContent = text;
  }

  setDefaultBtnText() {
    this._submitButton.textContent = this._defaultButtonText;
  }
}
