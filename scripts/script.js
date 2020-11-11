
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnClose = document.querySelectorAll('.popup__btn-close');
const nameInput = document.querySelector(".popup__input_profile_name");
const jobInput = document.querySelector(".popup__input_profile_occupation");
const name = document.querySelector(".profile__name");
const occupation = document.querySelector(".profile__occupation");
const formElement = document.querySelector(".popup__form_type_profile");
const formAdd = document.querySelector(".popup__form_type_create");
const popupProfile = document.querySelector('.popup_profile');
const templateCard = document.querySelector('#card').content;
const image = document.querySelector('.grid-item__image');
const popupImage = document.querySelector('.popup_img');
const trash = document.querySelectorAll('.grid-item__trash');
const btnAddCard = document.querySelector('.profile__add-button');
const btnCreateCard = document.querySelector('.popup__btn-create');
const popupCreateCard = document.querySelector('.popup_add');
const addName = document.querySelector('.popup__input_add_name');
const addLink = document.querySelector('.popup__input_add_link');
const btnLike = document.querySelector('.grid-item__like');

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

    newCard.querySelector('.grid-item__image').src = link;
    newCard.querySelector('.grid-item__name').textContent = title;
    newCard.querySelector('.grid-item__trash').addEventListener("click", deleteCard);
    newCard.querySelector('.grid-item__image').addEventListener("click", showImage);
    newCard.querySelector('.grid-item__like').addEventListener("click", like)
    document.querySelector('.grid-items').prepend(newCard);
    
}


function deleteCard(evt) {
    evt.target.closest('.grid-item').remove();
}


function openPopup(elem) {
    elem.classList.add('popup_opened');
}

function closePopup(elem) {
    elem.classList.remove('popup_opened');
}

function openEditProfile() {
    nameInput.value = name.textContent;
    jobInput.value = occupation.textContent;
    openPopup(popupProfile);
}

function like(evt) {
    if(evt.target.classList.contains('grid-item__like_active')){
        evt.target.classList.remove('grid-item__like_active')
    } else{
        evt.target.classList.add('grid-item__like_active');
    }
}


function showImage(evt) {
    const image = evt.target.closest('.grid-item__image');
    const name = evt.target.closest('.grid-item');
    const popupImg = document.querySelector('.popup__image');
    const popupName = document.querySelector('.popup__img-title');
    popupImg.src = image.src; 
    popupName.textContent = name.querySelector('.grid-item__name').textContent;
    openPopup(popupImage);
}

function closeEditProfile() {
    closePopup(popupProfile);
}

function formCreate(evt) {
    evt.preventDefault();

    createCard(addName.value, addLink.value);
    closePopup(popupCreateCard);
    addName.value = '';
    addLink.value = '';
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    closePopup(popupProfile);
}


initialCards.forEach(el => createCard(el.name, el.link));

trash.forEach(element => {
    element.addEventListener("click", (evt) => {
        evt.target.closest('.grid-item').remove;
    })
})


btnEditProfile.addEventListener("click", openEditProfile);
btnAddCard.addEventListener("click", (evt) => openPopup(popupCreateCard));
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formCreate);
btnClose.forEach(element => {
    element.addEventListener("click", (evt) => {
        closePopup(evt.target.closest(".popup"));
    })
});



