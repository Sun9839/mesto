import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards,profileEditButton,addCardButton,optionObject} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import closeIcon from "../images/Close Icon.svg"
import jakIvKusto from "../images/Jak-Iv-Kusto.jpg"
import like from "../images/like.svg"
import likeClicked from "../images/likeClicked.svg"
import logo from "../images/logo.png"
import pencil from"../images/pencil.svg"
import plus from "../images/plus.svg"
import rubishContainer from "../images/rubish-container.svg"
import "./index.css"
const whoIsTheGoat = [
    { name: 'closeIcon', image: closeIcon },
    { name: 'jakIvKusto', link: jakIvKusto },
    { name: 'likeClicked', link: likeClicked },
    { name: 'logo', link: logo },
    { name: 'like', link: like },
    { name: 'pencil', link: pencil },
    { name: 'plus', link: plus },
    { name: 'rubishContainer', link: rubishContainer }
];

const imagePopup = new PopupWithImage('#image-popup');

const placePopup = new PopupWithForm({
    popupSelector: '#card-popup',
    handleSubmit: (obj) => {
        const card = new Card({
            data: obj,
            handleCardClick: () => {
                imagePopup.open(obj);
                imagePopup.setEventListeners();
            },
            templateSelector: '#place-card-template'
        });
        places.addItem(card.generateCard());
    }
});
const placePopupValidation = new FormValidator(optionObject,'#card-popup');
placePopupValidation.enableValidation();

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userActivitySelector: '.profile__activity'
})

const profilePopup = new PopupWithForm({
    popupSelector: '#profile-popup',
    handleSubmit: (obj) => {
        userInfo.setUserInfo(obj);
    }
});
const profilePopupValidation = new FormValidator(optionObject,'#profile-popup');
profilePopupValidation.enableValidation();

const places = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                imagePopup.open(item);
                imagePopup.setEventListeners();
            },
            templateSelector: '#place-card-template'
        });
        const cardElement = card.generateCard();
        places.addItem(cardElement);
    }
},'.places__list');
places.renderItems();

profileEditButton.addEventListener('click',() => {
    userInfo.getUserInfo();
    profilePopup.setInputsValues(userInfo.getUserInfo());
    profilePopupValidation.checkButtonState();
    profilePopup.open();
    profilePopup.setEventListeners();
});
addCardButton.addEventListener('click',() => {
    placePopup.open();
    placePopupValidation.checkButtonState();
    placePopup.setEventListeners();
})