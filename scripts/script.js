const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const profilePopup = document.querySelector('#profile-popup');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const inputName = profilePopup.querySelector('.popup__name');
const inputActivity = profilePopup.querySelector('.popup__activity');
const saveButton = profilePopup.querySelector('.popup__save');
const cardsZone = document.querySelector('.places__list');
const card = document.querySelector('#place-card-template').content;
const popupCard = document.querySelector('#card-popup');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardInputName = popupCard.querySelector('.popup__name');
const popupCardInputLink = popupCard.querySelector('.popup__activity');
const popupCardSaveButton = popupCard.querySelector('.popup__save');
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
function openProfilePopup(){
    inputName.value = name.textContent;
    inputActivity.value = activity.textContent;
}
function togglePopup(popup){
    popup.classList.toggle('popup__opened');
    openProfilePopup();
}
function savePopup(){
    name.textContent = inputName.value;
    activity.textContent = inputActivity.value;
    togglePopup(profilePopup);
}
function closeImagePopup(){
    imagePopup.classList.remove('popup__opened');
}
function createCard(cardTitle,source){
    const newCard = card.cloneNode(true);
    const cardName = newCard.querySelector('.place-card__title');
    const cardImage = newCard.querySelector('.place-card__image');
    cardImage.src = source;
    cardName.textContent = cardTitle;
    handleLike(newCard);
    handleDelete(newCard);
    handleImageClick(newCard);
    return newCard;
}
function handleLike(clickedCard){
    const likeButton = clickedCard.querySelector('.place-card__like');
    likeButton.addEventListener('click',function(){
        likeButton.classList.toggle('place-card__like_clicked');
    })
}
function handleDelete(clickedCard){
    const deleteButton = clickedCard.querySelector('.place-card__delete');
    deleteButton.addEventListener('click',function(){
        const deleteCard = deleteButton.closest('.place-card');
        deleteCard.remove();
    })
}
function handleImageClick(clickedCard){
    const image = clickedCard.querySelector('.place-card__image');
    const title = clickedCard.querySelector('.place-card__title')
    image.addEventListener('click',function(){
        imagePopup.classList.add('popup__opened');
        imagePopup.querySelector('.popup__image').src = image.src;
        imagePopup.querySelector('.popup__text').textContent = title.textContent;
    });
}
editButton.addEventListener('click',function(evt){
    togglePopup(profilePopup);
    evt.preventDefault();

});
profileCloseButton.addEventListener('click',function(){
    togglePopup(profilePopup);
});
saveButton.addEventListener('click',savePopup);
popupCardCloseButton.addEventListener('click',function(){
    togglePopup(popupCard);
});
addButton.addEventListener('click',function(){
    togglePopup(popupCard);
});
popupCardSaveButton.addEventListener('click',function(evt){
    const cardElement =createCard(popupCardInputName.value,popupCardInputLink.value);
    cardsZone.prepend(cardElement);
    togglePopup(popupCard);
    evt.preventDefault();
})
imagePopupCloseButton.addEventListener('click',closeImagePopup);
initialCards.forEach(function(item){
    const cardElement = createCard(item.name,item.link);
    cardsZone.append(cardElement);
})