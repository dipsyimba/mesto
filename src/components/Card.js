export default class Card {
    constructor({likes, cardId, name, link, owner}, {handleCardClick, handleLikeClick, handleTrashClick}, cardSelector, userId) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link;
        this._cardTemplate = document.querySelector(this._cardSelector);
        this._likes = likes;
        this._cardId = cardId;
        this._ownerId = owner._id;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleTrashClick = handleTrashClick;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector('.grid-item').cloneNode(true);
        return cardElement;
    }

    deleteCard() {
        this._element.remove();
    }

    handleLikeButton() {
        this._likeButton.classList.toggle('grid-item__like_active');
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._trash.addEventListener('click', this._handleTrashClick);
        this._imageItem.addEventListener('click', this._handleCardClick);
    }

    createCard() {
        this._element = this._getTemplate();
        this._imageItem = this._element.querySelector('.grid-item__image');
        this._trash = this._element.querySelector('.grid-item__trash');
        this._likeButton = this._element.querySelector('.grid-item__like');
        this._imageItem.alt = this._name;
        this._imageItem.src = this._link;
        this._element.querySelector('.grid-item__name').textContent = this._name;
        
        if(this._ownerId !== this._userId) {
            this._trash.remove();
        }
        this._likesCounter = this._element.querySelector('.grid-item__count');
        this.renderLikes();
        if (this.isCardLikedThisUser()) this._likeButton.classList.add('grid-item__like_active');
        this._setEventListeners();
        return this._element;
    }

    _isLiked() {
        if(this._likeButton.classList.contains('grid-item__like_active')) return true;
        return false;
    }

    isCardLikedThisUser() {
        return this._likes.some(like => {
            return like._id === this._userId;
        });
    }

    renderLikes() {
        this._likesCounter.textContent = this._likes.length;
    }

    setCountLikes(count) {
        this._likes = count;
    }

    getIdCard() {
        return this._cardId;
    }
}