export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupForm = document.querySelector(this._popupSelector);
        this._closeButton = this._popupForm.querySelector('.popup__btn-close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners();
    }

    open() {
        this._popupForm.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupForm.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popupForm.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains('popup')) {
            this.close();
        }
        });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}