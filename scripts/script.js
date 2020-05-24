const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const popup = document.querySelector('#popup');
const closeButton = popup.querySelector('.popup__close');
const inputName = popup.querySelector('.popup__name');
const inputActivity = popup.querySelector('.popup__activity');
const saveButton = popup.querySelector('.popup__save');
const popupCard = document.querySelector('#popup-card');
const closeButtonCard = popupCard.querySelector('.popup__close');
const inputNameCard = popupCard.querySelector('.popup__name');
const inputSourceCard = popupCard.querySelector('.popup__activity');
const saveButtonCard = popupCard.querySelector('.popup__save');
const elements = document.querySelector('.elements');
const element = elements.querySelector('#element').content;
const cardOne = element.cloneNode(true);
const cardTwo = element.cloneNode(true);
const cardThree = element.cloneNode(true);
const cardFour = element.cloneNode(true);
const cardFive = element.cloneNode(true);
const cardSix = element.cloneNode(true);
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
function popupClose(){
    popup.classList.remove('popup__opened');
}
function popupOpen(){
    popup.classList.add('popup__opened');
    inputName.value = name.textContent;
    inputActivity.value = activity.textContent;
}
function popupSave(){
    name.textContent = inputName.value;
    activity.textContent = inputActivity.value;
    popupClose();
}
function popupCardClose(){
    popupCard.classList.remove('popup__opened');
}
function popupCardOpen(){
    popupCard.classList.add('popup__opened');
    inputNameCard.value = '';
    inputSourceCard.value = '';
}
function popupCardAdd(){
    newCard = element.cloneNode(true);
    newCard.querySelector('.element__image').src = inputSourceCard.value;
    newCard.querySelector('.element__title').textContent = inputNameCard.value;
    elements.prepend(newCard);
    popupCardClose();
}
editButton.addEventListener('click',popupOpen);
closeButton.addEventListener('click',popupClose);
saveButton.addEventListener('click',popupSave);
popup.addEventListener('submit',popupSave);
document.addEventListener('DOMContentLoaded',function(){
    cardOne.querySelector('.element__image').src = initialCards[0].link;
    cardOne.querySelector('.element__title').textContent = initialCards[0].name;
    elements.append(cardOne);
})
document.addEventListener('DOMContentLoaded',function(){
    cardTwo.querySelector('.element__image').src = initialCards[1].link;
    cardTwo.querySelector('.element__title').textContent = initialCards[1].name;
    elements.append(cardTwo);
})
document.addEventListener('DOMContentLoaded',function(){
    cardThree.querySelector('.element__image').src = initialCards[2].link;
    cardThree.querySelector('.element__title').textContent = initialCards[2].name;
    elements.append(cardThree);
})
document.addEventListener('DOMContentLoaded',function(){
    cardFour.querySelector('.element__image').src = initialCards[3].link;
    cardFour.querySelector('.element__title').textContent = initialCards[3].name;
    elements.append(cardFour);
})
document.addEventListener('DOMContentLoaded',function(){
    cardFive.querySelector('.element__image').src = initialCards[4].link;
    cardFive.querySelector('.element__title').textContent = initialCards[4].name;
    elements.append(cardFive);
})
document.addEventListener('DOMContentLoaded',function(){
    cardSix.querySelector('.element__image').src = initialCards[5].link;
    cardSix.querySelector('.element__title').textContent = initialCards[5].name;
    elements.append(cardSix);
})
addButton.addEventListener('click',popupCardOpen);
closeButtonCard.addEventListener('click',popupCardClose);
saveButtonCard.addEventListener('click',popupCardAdd);