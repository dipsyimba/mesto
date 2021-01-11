export default class Card {
    constructor({data, selector, handleCardClick}) {
        this._selector = selector;
        this._name = data.title;
        this._link = data.link;
        this._cardTemplate = document.querySelector(this._selector);
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return this._cardTemplate.content.cloneNode(true);
    }

    _deleteCard(evt) {
        evt.target.closest('.grid-item').remove();
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('grid-item__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.grid-item__like').addEventListener('click', this._handleLikeButton);
        this._element.querySelector('.grid-item__trash').addEventListener('click', this._deleteCard);
        this._imageItem.addEventListener('click', this._handleCardClick);
    }

    createCard() {
        this._element = this._getTemplate();
        this._imageItem = this._element.querySelector('.grid-item__image');
        this._imageItem.alt = this._name;
        this._imageItem.src = this._link;
        this._element.querySelector('.grid-item__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}