export default class Card {
    constructor(data, selector, openPopupImage) {
        this._selector = selector;
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = document.querySelector(this._selector);
        this._openPopupImage = openPopupImage;
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

    _setEventListeners = () => {
        this._element.querySelector('.grid-item__like').addEventListener('click', this._handleLikeButton);
        this._element.querySelector('.grid-item__trash').addEventListener('click', this._deleteCard);
        this._element.querySelector('.grid-item__image').addEventListener('click', () => {
            this._openPopupImage(this._name, this._link);
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