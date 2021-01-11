import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageLink = this._popupForm.querySelector('.popup__image');
        this._popupImageName = this._popupForm.querySelector('.popup__img-title');
    }

    open(item) {
        this._popupImageLink.src = item.src;
        this._popupImageName.textContent = item.textContent;
        super.open();
    }
}