const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('.popup__form');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const inputName = profilePopup.querySelector('.popup__name');
const inputActivity = profilePopup.querySelector('.popup__activity');
const cardsZone = document.querySelector('.places__list');
const card = document.querySelector('#place-card-template').content;
const popupCard = document.querySelector('#card-popup');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardInputName = popupCard.querySelector('.popup__name');
const popupCardInputLink = popupCard.querySelector('.popup__activity');
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
function togglePopup(popup){
    popup.classList.toggle('popup__opened');
    togglePopupEventListener(popup);
    cleanErrors(popup);
}
function clickOverlay(evt){
    if(evt.target.classList.contains('popup')){
        togglePopup(document.querySelector('.popup__opened'));
    }
}
function clickEsc(evt){
    if(evt.keyCode === 27){
        togglePopup(document.querySelector('.popup__opened'));
    }
}
function togglePopupEventListener(popup){
    if(popup.classList.contains('popup__opened')){
        popup.addEventListener('click',clickOverlay);
        document.addEventListener('keydown',clickEsc);
    }else{
        popup.removeEventListener('click',clickOverlay);
        document.removeEventListener('keydown',clickEsc);
    }
}
function handleLike(evt){
    evt.target.classList.toggle('place-card__like_clicked');
}
function handleDelete(evt){
    const deleteCard = evt.target.closest('.place-card');
    deleteCard.remove();
}
function handleImageClick(evt){
    imagePopup.querySelector('.popup__image').src = evt.target.src;
    imagePopup.querySelector('.popup__text').textContent = evt.target.alt;
    togglePopup(imagePopup);
}
function setCardEventListeners(item){
    item.querySelector('.place-card__like').addEventListener('click', handleLike);
    item.querySelector('.place-card__delete').addEventListener('click', handleDelete);
    item.querySelector('.place-card__image').addEventListener('click', handleImageClick);
}
function openProfilePopup(){
    inputName.value = name.textContent;
    inputActivity.value = activity.textContent;
    togglePopup(profilePopup);
    handleFormInput(profileForm,profileForm.querySelector('.popup__save'),object.inactiveButtonClass);
}
function saveProfile(evt){
    evt.preventDefault();
    name.textContent = inputName.value;
    activity.textContent = inputActivity.value;
    togglePopup(profilePopup);
}
function createCard(cardTitle,source){
    const newCard = card.cloneNode(true);
    const cardName = newCard.querySelector('.place-card__title');
    const cardImage = newCard.querySelector('.place-card__image');
    cardImage.src = source;
    cardImage.alt = cardTitle;
    cardName.textContent = cardTitle;
    setCardEventListeners(newCard);
    return newCard;
}
editButton.addEventListener('click',(evt) => {
    openProfilePopup();
});
profileCloseButton.addEventListener('click',function(){
    togglePopup(profilePopup);
});
profilePopup.addEventListener('submit',saveProfile);
popupCardCloseButton.addEventListener('click',function(){
    togglePopup(popupCard);
    popupCardInputLink.value = '';
    popupCardInputName.value = '';
});
addButton.addEventListener('click',function(){
    togglePopup(popupCard);
    handleFormInput(popupCardForm,popupCardForm.querySelector('.popup__save'),object.inactiveButtonClass);
});
popupCard.addEventListener('submit',function(evt){
    const cardElement = createCard(popupCardInputName.value,popupCardInputLink.value);
    cardsZone.prepend(cardElement);
    togglePopup(popupCard);
    popupCardInputName.value = '';
    popupCardInputLink.value = '';
    evt.preventDefault();
})
imagePopupCloseButton.addEventListener('click', () =>  togglePopup(imagePopup));
initialCards.forEach(function(item){
    const cardElement = createCard(item.name,item.link);
    cardsZone.append(cardElement);
})