export const btnEditProfile = document.querySelector('.profile__edit-button');
export const closeButtons = document.querySelectorAll('.popup__btn-close');
export const nameInput = document.querySelector(".popup__input_profile_name");
export const jobInput = document.querySelector(".popup__input_profile_occupation");
export const name = document.querySelector(".profile__name");
export const occupation = document.querySelector(".profile__occupation");
export const formProfile = document.querySelector(".popup__form_type_profile");
export const formAdd = document.querySelector(".popup__form_type_create");
export const profilePopup = document.querySelector('.popup_profile');
export const btnAddCard = document.querySelector('.profile__add-button');
export const createCardPopup = document.querySelector('.popup_add');
export const addName = document.querySelector('.popup__input_add_name');
export const addLink = document.querySelector('.popup__input_add_link');
export const imagePopup = document.querySelector('.popup_img');
export const imageLink = document.querySelector('.popup__image');
export const imageName = document.querySelector('.popup__img-title');
export const container = document.querySelector('.grid-items');


export const initialCards = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};