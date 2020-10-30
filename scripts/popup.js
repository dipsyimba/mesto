
let btnEditProfile = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup');
let btnClose = document.querySelector('.popup__btn-close');
let nameInput = document.querySelector(".popup__input_profile_name");
let jobInput = document.querySelector(".popup__input_profile_occupation");
let name = document.querySelector(".profile__name");
let occupation = document.querySelector(".profile__occupation");
let formElement = document.querySelector(".popup__form");


function openEditProfile() {
    popupEditProfile.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = occupation.textContent;
}


function closeEditProfile() {
    popupEditProfile.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    popupEditProfile.classList.remove("popup_opened");
}


btnEditProfile.addEventListener("click", openEditProfile);
btnClose.addEventListener("click", closeEditProfile);
formElement.addEventListener('submit', formSubmitHandler);


