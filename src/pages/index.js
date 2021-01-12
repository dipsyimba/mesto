import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    initialCards,
    validationConfig,
    btnEditProfile,
    btnAddCard,
    formProfile,
    formAdd,
    nameInput,
    jobInput,
} from '../utils/constants.js';

const profileForm = new FormValidator(validationConfig, formProfile);
const addForm = new FormValidator(validationConfig, formAdd);
const objPopupWithImage = new PopupWithImage('.popup_img');
const profileUserInfo = new UserInfo({
    nameSelector: ".profile__name",
    infoSelector: ".profile__occupation"
});


function createNewCard(el) {
    const card = new Card({
        data: el,
        selector: '#card',
        handleCardClick: (evt) => {
            const imageInfo = {};
            imageInfo.src = evt.target.src;
            imageInfo.textContent = evt.target.closest('.grid-item').querySelector('.grid-item__name').textContent;
            objPopupWithImage.open(imageInfo);
        }});
    return card.createCard();
}

const defaultArrayCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardItem = createNewCard(item);
        defaultArrayCards.addItem(cardItem);
    },
},'.grid-items');

const profilePopupWithForm = new PopupWithForm({
    popupSelector: '.popup_profile',
    formSubmit: (item) => {
        profileUserInfo.setUserInfo(item.name, item.occupation)
    }
});

const createPopupWithForm = new PopupWithForm({
    popupSelector: '.popup_add',
    formSubmit: (item) => {
        const cardItem = createNewCard(item);
        defaultArrayCards.addItem(cardItem);
    },
});

defaultArrayCards.renderItems();

function openEditProfilePopup() {
    const user = profileUserInfo.getUserInfo();
    nameInput.value = user.nameItem;
    jobInput.value = user.infoItem;
    profileForm.cleanInputErrors();
    profilePopupWithForm.open();
}

function openCreateCardPopup() {
    formAdd.reset();
    addForm.cleanInputErrors();
    createPopupWithForm.open();
}

profilePopupWithForm.setEventListeners();
createPopupWithForm.setEventListeners();
objPopupWithImage.setEventListeners();
btnEditProfile.addEventListener("click", openEditProfilePopup);
btnAddCard.addEventListener("click", openCreateCardPopup);
profileForm.enableValidation();
addForm.enableValidation();
