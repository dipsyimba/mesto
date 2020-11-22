const btnEditProfile = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__btn-close');
const nameInput = document.querySelector(".popup__input_profile_name");
const jobInput = document.querySelector(".popup__input_profile_occupation");
const name = document.querySelector(".profile__name");
const occupation = document.querySelector(".profile__occupation");
const formElement = document.querySelector(".popup__form_type_profile");
const formAdd = document.querySelector(".popup__form_type_create");
const profilePopup = document.querySelector('.popup_profile');
const templateCard = document.querySelector('#card').content;
const imagePopup = document.querySelector('.popup_img');
const btnAddCard = document.querySelector('.profile__add-button');
const btnCreateCard = document.querySelector('.popup__btn-create');
const createCardPopup = document.querySelector('.popup_add');
const addName = document.querySelector('.popup__input_add_name');
const addLink = document.querySelector('.popup__input_add_link');
const container = document.querySelector('.grid-items');
const popupImg = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__img-title');


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

function createCard(title, link) {
    const newCard = templateCard.cloneNode(true);
    const cardImage = newCard.querySelector('.grid-item__image');

    cardImage.src = link;
    cardImage.alt = title;
    newCard.querySelector('.grid-item__name').textContent = title;
    newCard.querySelector('.grid-item__trash').addEventListener("click", deleteCard);
    cardImage.addEventListener("click", () => showImage(title, link));
    newCard.querySelector('.grid-item__like').addEventListener("click", like)
    return newCard;    
}


function deleteCard(evt) {
    evt.target.closest('.grid-item').remove();
}


function openPopup(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', keyEsc);
    elem.addEventListener('mousedown', popupMousedown);
}

function popupMousedown(evt) {
    const clickPopup = evt.target.closest('.popup');
    if(evt.target.classList.contains('popup')) {
        closePopup(clickPopup);
    }
}

function keyEsc(evt) {
    if(evt.key === 'Escape') {
        isActivePopup();
    }
}

function isActivePopup(evt) {
    const activePopup = document.querySelector('.popup_opened');
    if(activePopup) {
        closePopup(activePopup);
    }
}

function closePopup(elem) {
    const inputs = elem.querySelectorAll('.popup__input');
    elem.classList.remove('popup_opened');
    addName.value = '';
    addLink.value = '';
    inputs.forEach((input) => {
        hideError(input, validationConfig);
    });
    document.removeEventListener('keydown', keyEsc);
    elem.removeEventListener('mousedown', popupMousedown);
}

function openEditProfile() {
    nameInput.value = name.textContent;
    jobInput.value = occupation.textContent;

    enableValidation(validationConfig);
    openPopup(profilePopup);
}

function like(evt) {
    evt.target.classList.toggle('grid-item__like_active');
}

function showImage(title, link) {
    popupImg.src = link; 
    popupName.textContent = title;
    openPopup(imagePopup);
}

function formCreate(evt) {
    evt.preventDefault();

    addNewCard(createCard(addName.value, addLink.value));
    closePopup(createCardPopup);
    addName.value = '';
    addLink.value = '';
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    closePopup(profilePopup);
}

function addNewCard(newCard) {
    container.prepend(newCard);
}

initialCards.forEach(el => addNewCard(createCard(el.name, el.link)));

btnEditProfile.addEventListener("click", openEditProfile);
btnAddCard.addEventListener("click", (evt) => {
    openPopup(createCardPopup);
    enableValidation(validationConfig);
});
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formCreate);
closeButtons.forEach(element => {
    element.addEventListener("click", (evt) => {
        closePopup(evt.target.closest(".popup"));
    });
});






