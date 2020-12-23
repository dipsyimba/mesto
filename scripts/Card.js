const imagePopup = document.querySelector('.popup_img');
const closeButton = document.querySelector('#close-img');

export default class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = document.querySelector(this._selector);
    }

    _getTemplate = () => {
        return this._cardTemplate.content.cloneNode(true);
    }

    _deleteCard = (evt) => {
        evt.target.closest('.grid-item').remove();
    }

    _handleLikeButton = (evt) => {
        evt.target.classList.toggle('grid-item__like_active');
    }

    _handleClose = () => {
        imagePopup.classList.remove('popup_opened');
        closeButton.removeEventListener('click', this._handleClose);
        imagePopup.removeEventListener('click', this._handleCloseOverlay);
        document.removeEventListener('keydown', this._handleCloseEsc);
    }

    _handleCloseEsc = (evt) => {
        if(evt.key === 'Escape') {
            imagePopup.classList.remove('popup_opened');
            closeButton.removeEventListener('click', this._handleClose);
            imagePopup.removeEventListener('click', this._handleCloseOverlay);
            document.removeEventListener('keydown', this._handleCloseEsc);
        }
    }

    _handleCloseOverlay = (evt) => {
        if(evt.target.classList.contains('popup')) {
            imagePopup.classList.remove('popup_opened');
            closeButton.removeEventListener('click', this._handleClose);
            imagePopup.removeEventListener('click', this._handleCloseOverlay);
            document.removeEventListener('keydown', this._handleCloseEsc);
        }
    }

    _handleOpen = () => {
        const photoItem = imagePopup.querySelector('.popup__image');
        photoItem.src = this._link;
        photoItem.alt = this._name;
        const imagePopupTitle = imagePopup.querySelector('.popup__img-title');
        imagePopupTitle.textContent = this._name;
        imagePopup.classList.add('popup_opened');
        closeButton.addEventListener('click', this._handleClose);
        imagePopup.addEventListener('click', this._handleCloseOverlay);
        document.addEventListener('keydown', this._handleCloseEsc);
    }

    _setEventListeners = () => {
        this._element.querySelector('.grid-item__like').addEventListener('click', this._handleLikeButton);
        this._element.querySelector('.grid-item__trash').addEventListener('click', this._deleteCard);
        this._element.querySelector('.grid-item__image').addEventListener('click', () => {
            this._handleOpen();
        });
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._element.querySelector('.grid-item__image').alt = this._name;
        this._element.querySelector('.grid-item__image').src = this._link;
        this._element.querySelector('.grid-item__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}