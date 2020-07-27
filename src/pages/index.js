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

const api = new Api({
    authorization: 'fe47d12a-65cb-489c-8a22-593f286d28c3',
    cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/cards/',
    userUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me'
});

const placePopup = new PopupWithForm({
    popupSelector: '#card-popup',
    handleSubmit: (obj) => {
        api.addCardToServer(obj).then((data) => {
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
                            api.deleteCard(card.returnId()).then(() => {
                                card.delete()
                            }).then(() => {
                                placePopup.close();
                            });
                        }
                    })
                    deletePopup.setEventListeners();
                    deletePopup.open();
                },
                likeClick: () => {
                    if(card.checkLike()){
                        api.removeLike(card.returnId()).then(() => {
                            card.removeLike();
                            card.handleLike();
                        });
                    }else{
                        api.setLike(card.returnId()).then(() => {
                            card.addLike();
                            card.handleLike();
                        });
                    }
                }
            });
            const cardElement = card.generateCard();
            placesList.prepend(cardElement);
        }).then(() => {
            placePopup.close();
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
api.getUser().then(
    (data) => {
        userInfo.setUserInfo(data);
        profileImage.src = data.avatar;
    }
);

api.getInitialCards().then(
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
                                api.deleteCard(card.returnId()).then(() => {
                                    card.delete()
                                }).then(() => {
                                    deletePopup.close();
                                });
                            }
                        })
                        deletePopup.setEventListeners();
                        deletePopup.open();
                    },
                    likeClick: () => {
                        if(card.checkLike()){
                            api.removeLike(card.returnId()).then(() => {
                                card.removeLike()
                                card.handleLike();
                            });
                        }else{
                            api.setLike(card.returnId()).then(() => {
                                card.addLike()
                                card.handleLike();
                            });
                        }
                    }
                });
                const cardElement = card.generateCard();
                section.addItem(cardElement);
            }
        },'.places-list');
        section.renderItems();
    }
)

const profilePopup = new PopupWithForm({
    popupSelector: '#profile-popup',
    handleSubmit: (obj) => {
        api.editProfile(obj).then((data) => {
            userInfo.setUserInfo(data);
        }).then(() => {
            profilePopup.close();
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
        api.setAvatar(obj).then(() => {
            profileImage.src = obj.avatar
        }).then(() => {
            avatarPopup.close();
        })
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