
const btnEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_opened');
const btnClose = document.querySelector('.popup__btn-close');
const nameInput = document.querySelector(".popup__input_profile_name");
const jobInput = document.querySelector(".popup__input_profile_occupation");
const name = document.querySelector(".profile__name");
const occupation = document.querySelector(".profile__occupation");
const formElement = document.querySelector(".popup__form");


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


