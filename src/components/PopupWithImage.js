import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageLink = this._popup.querySelector('.popup__image');
        this._popupImageName = this._popup.querySelector('.popup__img-title');
    }

    open(item) {
        this._popupImageLink.src = item.link;
        this._popupImageName.textContent = item.name;
        super.open();
    }
}