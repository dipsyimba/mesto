import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js';
import {
  validationConfig,
  btnEditProfile,
  btnAddCard,
  formProfile,
  formAdd,
  nameInput,
  jobInput,
  name,
  occupation,
  avatar,
  profileSelectors,
  imagePopupSelector,
  userId,
  templateCardSelector,
  container,
  inputAvatarLink,
  addCardLink,
  addCardName,
  popupEditAvatarButton,
  formAvatar,
} from '../utils/constants.js';

const profileForm = new FormValidator(validationConfig, formProfile);
const addForm = new FormValidator(validationConfig, formAdd);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
const profileUserInfo = new UserInfo(profileSelectors);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/',
  headers: {
    authorization: 'a19e97f8-e3c3-444b-acd8-2259e79e6607',
    'Content-Type': 'application/json',
  },
});

//для прогрузки страницы без лишних "дерганий"
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    name.textContent = user.name;
    occupation.textContent = user.about;
    avatar.src = user.avatar;
    arrayCards.renderItems(cards);
  })
  .catch((err) => console.log(err));

//функция создания карточки
function createNewCard(el) {
  const card = new Card(
    {
      likes: el.likes,
      cardId: el._id,
      name: el.name,
      link: el.link,
      owner: el.owner,
    },
    {
      handleCardClick: () => {
        objPopupWithImage.open(el);
      },
      handleLikeClick: () => {
        const resApi = card.isCardLikedThisUser()
          ? api.deleteLike(card.getIdCard())
          : api.likeCard(card.getIdCard());
        resApi
          .then((data) => {
            card.setCountLikes(data.likes);
            card.renderLikes();
            card.handleLikeButton();
          })
          .catch((err) => console.log(err));
      },
      handleTrashClick: () => {
        confirmPopup.open(card);
      },
    },
    templateCardSelector,
    userId
  );
  return card.createCard();
}

const arrayCards = new Section(
  {
    renderer: (item) => {
      const cardItem = createNewCard(item);
      arrayCards.addItem(cardItem);
    },
  },
  container
);

//попап с картинкой
const objPopupWithImage = new PopupWithImage(imagePopupSelector);

//обработчик формы удаления карточки
const deleteFormSubmit = (card) => {
  confirmPopup.setBtnText('Удаление...');
  api
    .removeCard(card.getIdCard())
    .then((res) => {
      card.deleteCard();
      confirmPopup.close();
    })
    .finally(() => {
      //чтобы избежать раннего появления начального текста кнопки
      //ибо попап закрывается плавно
      setTimeout(() => {
        confirmPopup.setDefaultBtnText();
      }, 500);
    });
};

//попап подтверждения удаления карточки
const confirmPopup = new PopupConfirm('.popup_delete', (card) => {
  deleteFormSubmit(card);
});

//обработчик формы редактирования профиля
const profileFormSubmit = () => {
  const userInfo = {
    name: nameInput.value,
    occupation: jobInput.value,
  };
  profilePopupWithForm.setBtnText('Сохранение...');
  api
    .setUserInfo(userInfo.name, userInfo.occupation)
    .then((res) => {
      profileUserInfo.setUserInfo(res.name, res.about);
      profilePopupWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        profilePopupWithForm.setDefaultBtnText();
      }, 500);
    });
};

//попап редактирования профиля
const profilePopupWithForm = new PopupWithForm(
  '.popup_profile',
  profileFormSubmit
);

//обработчик формы редактирования аватара
const avatarFormSubmit = () => {
  avatarPopupWithForm.setBtnText('Сохранение...');
  api
    .setAvatar(inputAvatarLink.value)
    .then((res) => {
      profileUserInfo.setAvatar(res.avatar);
      avatarPopupWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        avatarPopupWithForm.setDefaultBtnText();
      }, 500);
    });
};

//попап редактирования аватара
const avatarPopupWithForm = new PopupWithForm(
  '.popup_avatar',
  avatarFormSubmit
);

//обработчик формы создания карточки
const createFormSubmit = () => {
  createPopupWithForm.setBtnText('Создание...');
  api
    .setNewCard(addCardName, addCardLink)
    .then((res) => {
      const cardElement = createNewCard(res);
      arrayCards.addItem(cardElement, true);
      createPopupWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        createPopupWithForm.setDefaultBtnText();
      }, 500);
    });
};

//попап создания новой карточки
const createPopupWithForm = new PopupWithForm('.popup_add', createFormSubmit);

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

function openAvatarPopup() {
  avatarFormValidator.cleanInputErrors();
  avatarPopupWithForm.open();
}

profilePopupWithForm.setEventListeners();
createPopupWithForm.setEventListeners();
objPopupWithImage.setEventListeners();
confirmPopup.setEventListeners();
avatarPopupWithForm.setEventListeners();
btnEditProfile.addEventListener('click', openEditProfilePopup);
btnAddCard.addEventListener('click', openCreateCardPopup);
popupEditAvatarButton.addEventListener('click', openAvatarPopup);
profileForm.enableValidation();
addForm.enableValidation();
avatarFormValidator.enableValidation();
