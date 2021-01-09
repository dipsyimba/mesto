import Card from './Card.js';
import FormValidator from './FormValidator.js';

const btnEditProfile = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__btn-close');
const nameInput = document.querySelector(".popup__input_profile_name");
const jobInput = document.querySelector(".popup__input_profile_occupation");
const name = document.querySelector(".profile__name");
const occupation = document.querySelector(".profile__occupation");
const formProfile = document.querySelector(".popup__form_type_profile");
const formAdd = document.querySelector(".popup__form_type_create");
const profilePopup = document.querySelector('.popup_profile');
const btnAddCard = document.querySelector('.profile__add-button');
const createCardPopup = document.querySelector('.popup_add');
const addName = document.querySelector('.popup__input_add_name');
const addLink = document.querySelector('.popup__input_add_link');
const imagePopup = document.querySelector('.popup_img');
const imageLink = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__img-title');
const container = document.querySelector('.grid-items');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};
const profileForm = new FormValidator(validationConfig, formProfile);
const addForm = new FormValidator(validationConfig, formAdd);

function createNewCard(el) {

    const card = new Card(el, '#card', openPopupImage);
    const cardElement = card.createCard();
    container.prepend(cardElement);
}

function openPopup(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', keyEsc);
    elem.addEventListener('mousedown', popupMousedown);
}

function openPopupImage(name, link) {
    imageLink.src = link;
    imageName.textContent = name;
    openPopup(imagePopup);
}

function popupMousedown(evt) {
    if(evt.target.classList.contains('popup')) {
        const clickPopup = evt.target.closest('.popup');
        removeListenersPopup(clickPopup);
    }
}

function keyEsc(evt) {
    if(evt.key === 'Escape') {
        closeActivePopup();
    }
}

function closeActivePopup() {
    const activePopup = document.querySelector('.popup_opened');
    if(activePopup) {
        removeListenersPopup(activePopup);
    }
}

function removeListenersPopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyEsc);
    elem.removeEventListener('mousedown', popupMousedown);
}

function openEditProfile() {
    nameInput.value = name.textContent;
    jobInput.value = occupation.textContent;
    
    openPopup(profilePopup);
}

function formCreate(evt) {
    evt.preventDefault();
    const element = {
            name: `${addName.value}`,
            link: `${addLink.value}`
        };
    createNewCard(element);
    removeListenersPopup(createCardPopup);
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    removeListenersPopup(profilePopup);
}

function initialize() {
    btnEditProfile.addEventListener("click", () => {
        openEditProfile();
        profileForm.cleanInputErrors();
    });

    btnAddCard.addEventListener("click", () => {
        formAdd.reset();
        openPopup(createCardPopup);
        addForm.cleanInputErrors();
    });

    formProfile.addEventListener('submit', formSubmitHandler);
    formAdd.addEventListener('submit', formCreate);
    closeButtons.forEach(element => {
        element.addEventListener("click", (evt) => {
            const popup = evt.target.closest(".popup");
            removeListenersPopup(popup);
        });
    });
    initialCards.forEach(element => {
        createNewCard(element);
    });

    profileForm.enableValidation();
    addForm.enableValidation();
}

initialize();
