
let btnEditProfile = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup_opened');
let btnClose = document.querySelector('.popup__btn-close');
let nameInput = document.querySelector(".popup__input_profile_name");
let jobInput = document.querySelector(".popup__input_profile_occupation");
let name = document.querySelector(".profile__name");
let occupation = document.querySelector(".profile__occupation");
let formElement = document.querySelector(".popup__form");

//отслеживаем клик по кнопкам редактировать и закрыть
btnEditProfile.addEventListener("click", openEditProfile);
btnClose.addEventListener("click", closeEditProfile);

//меняем значение display 'none' на 'flex' для открытия popup
function openEditProfile() {
    popupEditProfile.style.display = 'flex';
    nameInput.value = name.textContent;
    jobInput.value = occupation.textContent;
}

//тоже самое для закрытия popup
function closeEditProfile() {
    popupEditProfile.style.display = 'none';
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    popupEditProfile.style.display = 'none';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


