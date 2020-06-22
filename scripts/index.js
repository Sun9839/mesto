import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const profilePopup = document.querySelector('#profile-popup');
const inputName = profilePopup.querySelector('.popup__name');
const inputActivity = profilePopup.querySelector('.popup__activity');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileForm = profilePopup.querySelector('.popup__form');
const popupCard = document.querySelector('#card-popup');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardInputName = popupCard.querySelector('.popup__name');
const popupCardInputLink = popupCard.querySelector('.popup__activity');
const popupCardForm = popupCard.querySelector('.popup__form');
const imagePopup = document.querySelector('#image-popup');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const initialCards = [
    {
        name: 'Татуин',
        link: 'https://s14.stc.all.kpcdn.net/share/i/12/10018874/inx960x640.jpg'
    },
    {
        name: 'Набу',
        link: 'https://img.gazeta.ru/files3/293/7971293/Nabu_-pic4_zoom-1500x1500-50986.jpg'
    },
    {
        name: 'Корусант',
        link: 'https://starwars.ru/media/cache/36/eb/36ebc69855277b638b9100965879a2f1.png'
    },
    {
        name: 'Явин 4',
        link: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Star_Wars_in_Guatemala.jpg'
    },
    {
        name: 'Дагоба',
        link: 'https://retina.news.mail.ru/pic/ec/d2/image706133_cf8032a597cbe3a2402d2a8d5c992ae8.jpg'
    },
    {
        name: 'Камино',
        link: 'https://vignette.wikia.nocookie.net/starwarsrussia/images/1/15/TipocaCity.jpg/revision/latest?cb=20180320001559&path-prefix=ru'
    }
];
const options = {
    inputSelector: 'input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__name_type_error',
    inactiveButtonClass: 'popup__save_inactive'
}
function cleanErrors(popup){
    const inputElements = Array.from(popup.querySelectorAll('input'));
    inputElements.forEach((inputElement) => {
        inputElement.classList.remove(options.inputErrorClass);
        popup.querySelector(`#${inputElement.id}-error`).textContent = '';
    })
}
function checkButtonState(popup){
    const saveButton = popup.querySelector('.popup__save');
    const hasNotErrors = popup.querySelector('.popup__form').checkValidity();
    if(hasNotErrors){
        saveButton.classList.remove(options.inactiveButtonClass);
        saveButton.disabled = false;
    }else{
        saveButton.classList.add(options.inactiveButtonClass);
        saveButton.disabled = true;
    }
}
function togglePopup(popup){
    popup.classList.toggle('popup__opened');
    cleanErrors(popup);
    checkButtonState(popup);
}
function openProfilePopup(){
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
    togglePopup(profilePopup);
}
function saveProfile(evt){
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
    togglePopup(profilePopup);
}
function createCard(data){
    const card = new Card(data);
    const cardElement = card.generateCard();
    document.querySelector('.places__list').prepend(cardElement);
}
function enableValidationProfilePopup(){
    const profileFormValidator = new FormValidator(options,profileForm);
    profileFormValidator.enableValidation();
}
function enableValidationPopupCard(){
    const popupCardFormValidator = new FormValidator(options,popupCardForm);
    popupCardFormValidator.enableValidation();
}
editButton.addEventListener('click',openProfilePopup);
addButton.addEventListener('click',() =>{
    togglePopup(popupCard);
});
profileCloseButton.addEventListener('click',() =>{
    togglePopup(profilePopup);
});
popupCardCloseButton.addEventListener('click',() =>{
    togglePopup(popupCard);
});
imagePopupCloseButton.addEventListener('click',() =>{
    togglePopup(imagePopup);
});
profilePopup.addEventListener('submit',saveProfile);
popupCard.addEventListener('submit',function(evt){
    evt.preventDefault();
    const data = {
        name : `${popupCardInputName.value}`,
        link : `${popupCardInputLink.value}`
    }
    createCard(data);
    togglePopup(popupCard);
    popupCardInputName.value = '';
    popupCardInputLink.value = '';
})
initialCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    document.querySelector('.places__list').append(cardElement);
});
enableValidationProfilePopup();
enableValidationPopupCard();