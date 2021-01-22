import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._defaultButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
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

  open(item) {
    this._item = item;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._item);
    });
  }
}
