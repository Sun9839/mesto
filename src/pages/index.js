import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    profileEditButton,
    addCardButton,
    optionObject,
    userPopupInputs,
    placePopupInputs,
    profileImage,
    placesList,
    avatarButton
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import closeIcon from "../images/Close Icon.svg";
import jakIvKusto from "../images/Jak-Iv-Kusto.jpg";
import like from "../images/like.svg";
import likeClicked from "../images/likeClicked.svg";
import logo from "../images/logo.png";
import pencil from"../images/pencil.svg";
import plus from "../images/plus.svg";
import rubbishContainer from "../images/rubish-container.svg";
import avatarPencil from "../images/pencil-in-avatar.svg";
import "./index.css";

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const placePopup = new PopupWithForm({
    popupSelector: '#card-popup',
    handleSubmit: (obj) => {
        const addCardToServer = new Api({
            url: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
            method: 'POST',
            headers: {
                authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
            })
        });
        addCardToServer.createTask().then((data) => {
            const card = new Card({
                data: data,
                handleCardClick: () => {
                    imagePopup.open(data);
                },
                templateSelector: '#place-card-template',
                clickDelete: () => {
                    const deletePopup = new PopupWithForm({
                        popupSelector: '#delete-popup',
                        handleSubmit: () => {
                            const deleteCard = new Api({
                                url: `https://mesto.nomoreparties.co/v1/cohort-13/cards/${card.returnId()}`,
                                method: 'DELETE',
                                headers: {authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'}
                            });
                            deleteCard.createTask().then(() => {
                                card.delete();
                            });
                        }
                    })
                    deletePopup.setEventListeners();
                    deletePopup.open();
                }
            });
            const cardElement = card.generateCard();
            placesList.prepend(cardElement);
        })
    }
});
placePopup.setEventListeners();
const placePopupValidation = new FormValidator(optionObject,'#card-popup');
placePopupValidation.enableValidation();

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userActivitySelector: '.profile__activity',
    avatarSelector: '.profile__image'
});
const userNameFromServer = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me',
    headers: {
        authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'
    }
});
userNameFromServer.getTasks().then(
    (data) => {
        userInfo.setUserInfo(data);
        profileImage.src = data.avatar;
    }
);

const getInitialCards = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
    headers: {
        authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'
    }
});
getInitialCards.getTasks().then(
    (data) => {
        const section = new Section({
            items: data,
            renderer: (item) => {
                const card = new Card({
                    data: item,
                    handleCardClick: () => {
                        imagePopup.open(item);
                    },
                    templateSelector: '#place-card-template',
                    clickDelete: () => {
                        const deletePopup = new PopupWithForm({
                            popupSelector: '#delete-popup',
                            handleSubmit: () => {
                                const deleteCard = new Api({
                                    url: `https://mesto.nomoreparties.co/v1/cohort-13/cards/${card.returnId()}`,
                                    method: 'DELETE',
                                    headers: {authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'}
                                });
                                deleteCard.createTask().then();
                                card.delete();
                            }
                        })
                        deletePopup.setEventListeners();
                        deletePopup.open();
                    },
                    likeClick: () => {
                        if(card.checkLike()){
                            const removeLike = new Api({
                                url: `https://mesto.nomoreparties.co/v1/cohort-13/cards/likes/${card.returnId()}`,
                                method: 'DELETE',
                                headers: {authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'}
                            });
                            card.removeLike();
                            removeLike.createTask().then(() => {card.handleLike()});
                        }else{
                            const setLike = new Api({
                                url: `https://mesto.nomoreparties.co/v1/cohort-13/cards/likes/${card.returnId()}`,
                                method: 'PUT',
                                headers: {authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'}
                            });
                            card.addLike();
                            setLike.createTask().then(() => {card.handleLike()});
                        }
                    }
                });
                const cardElement = card.generateCard();
                section.addItem(cardElement);
            }
        },'.places__list');
        section.renderItems();
    }
)

const profilePopup = new PopupWithForm({
    popupSelector: '#profile-popup',
    handleSubmit: (obj) => {
        const editProfileOnServer = new Api({
            url: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me',
            method: 'PATCH',
            headers: {
                authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                about: obj.about
            })
        });
        editProfileOnServer.createTask(obj).then((data) => {
            userInfo.setUserInfo(data);
        })
    }
});
profilePopup.setEventListeners();
const profilePopupValidation = new FormValidator(optionObject,'#profile-popup');
profilePopupValidation.enableValidation();

avatarButton.addEventListener('click',() => {
    avatarPopup.open();
})

const avatarPopup = new PopupWithForm({
    popupSelector: '#avatar-popup',
    handleSubmit: (obj) => {
        const setAvatar = new Api({
            url: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me/avatar',
            method: 'PATCH',
            headers: {
                authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: obj.avatar
            })
        });
        setAvatar.createTask().then(() => {profileImage.src = obj.avatar})
    }
})
avatarPopup.setEventListeners();
const avatarPopupValidation = new FormValidator(optionObject,'#avatar-popup');
avatarPopupValidation.enableValidation();

profileEditButton.addEventListener('click',() => {
    userInfo.getUserInfo();
    profilePopup.setInputsValues(userInfo.getUserInfo());
    profilePopupValidation.checkButtonState();
    profilePopup.open();
    userPopupInputs.forEach((input) => {
        profilePopupValidation.hideInputError(input);
    })
});
addCardButton.addEventListener('click',() => {
    placePopup.open();
    placePopupValidation.checkButtonState();
    placePopupInputs.forEach((input) => {
        profilePopupValidation.hideInputError(input);
    })
})