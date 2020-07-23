import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {profileEditButton,addCardButton,optionObject,userPopupInputs,placePopupInputs} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import closeIcon from "../images/Close Icon.svg"
import jakIvKusto from "../images/Jak-Iv-Kusto.jpg"
import like from "../images/like.svg"
import likeClicked from "../images/likeClicked.svg"
import logo from "../images/logo.png"
import pencil from"../images/pencil.svg"
import plus from "../images/plus.svg"
import rubishContainer from "../images/rubish-container.svg"
import "./index.css"

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const placePopup = new PopupWithForm({
    popupSelector: '#card-popup',
    handleSubmit: (obj) => {
        const card = new Card({
            data: obj,
            handleCardClick: () => {
                imagePopup.open(obj);
            },
            templateSelector: '#place-card-template'
        });
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
    method: '',
    headers: {
        authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3'
    }
});
userNameFromServer.getTasks().then(
    (data) => {
        userInfo.setUserInfo(data);
    }
);

const getInitialCards = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
    method: '',
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
                    templateSelector: '#place-card-template'
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
        userInfo.setUserInfo(obj);
    }
});
profilePopup.setEventListeners();
const profilePopupValidation = new FormValidator(optionObject,'#profile-popup');
profilePopupValidation.enableValidation();


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