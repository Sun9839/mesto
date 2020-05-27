const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const popup = document.querySelector('#popup');
const closeButton = popup.querySelector('.popup__close');
const inputName = popup.querySelector('.popup__name');
const inputActivity = popup.querySelector('.popup__activity');
const saveButton = popup.querySelector('.popup__save');
const cardsZone = document.querySelector('.elements');
const card = cardsZone.querySelector('#element').content;
const popupCard = document.querySelector('#popup-card');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardInputName = popupCard.querySelector('.popup__name');
const popupCardInputLink = popupCard.querySelector('.popup__activity');
const popupCardSaveButton = popupCard.querySelector('.popup__save');
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseButton = document.querySelector('.image-popup__close');
let likeButtons = document.querySelectorAll('.element__like');
let deleteButtons = document.querySelectorAll('.element__delete');
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
    popupCardInputName.value = '';
    popupCardInputLink.value = '';
}
function popupCardOpen(){
    popupCard.classList.add('popup__opened');
}
function cardAdd(){
    const newCard = card.cloneNode(true);
    const cardName = newCard.querySelector('.element__title');
    const cardImage = newCard.querySelector('.element__image');
    cardImage.src = popupCardInputLink.value;
    cardName.textContent = popupCardInputName.value;
    cardsZone.prepend(newCard);
    popupCardClose();
    const likeButton = document.querySelector('.element__like');
    likeButton.addEventListener('click',function(){
        likeButton.classList.toggle('element__like_clicked')
    })
    const deleteButton = document.querySelector('.element__delete');
    deleteButton.addEventListener('click',function(){
        deleteButton.parentElement.remove();
    })
    cardImage.addEventListener('click',function(){
        imagePopup.classList.add('image-popup__opened');
        imagePopup.querySelector('.image-popup__image').src = cardImage.src;
        imagePopup.querySelector('.image-popup__text').textContent = cardName.textContent;
    })
}

function imagePopupClose(){
    imagePopup.classList.remove('image-popup__opened');
}
editButton.addEventListener('click',popupOpen);
closeButton.addEventListener('click',popupClose);
saveButton.addEventListener('click',popupSave);
popup.addEventListener('submit',popupSave);
popupCardCloseButton.addEventListener('click',popupCardClose);
addButton.addEventListener('click',popupCardOpen);
popupCardSaveButton.addEventListener('click',cardAdd);
popupCardSaveButton.addEventListener('submit',cardAdd);
document.addEventListener('DOMContentLoaded',function(){
    likeButtons = document.querySelectorAll('.element__like');
    likeButtons.forEach(function(item){
        item.addEventListener('click',function(){
            item.classList.toggle('element__like_clicked');
        })
    })
    deleteButtons = document.querySelectorAll('.element__delete');
    deleteButtons.forEach(function(item){
        item.addEventListener('click',function(){
            item.parentElement.remove();
        })
    })
});
imagePopupCloseButton.addEventListener('click',imagePopupClose);
initialCards.forEach(function(item){
    const newCard = card.cloneNode(true);
    const cardName = newCard.querySelector('.element__title');
    const cardImage = newCard.querySelector('.element__image');
    cardImage.src = item.link;
    cardName.textContent = item.name;
    cardsZone.append(newCard);
    cardImage.addEventListener('click',function(){
        imagePopup.classList.add('image-popup__opened');
        imagePopup.querySelector('.image-popup__image').src = cardImage.src;
        imagePopup.querySelector('.image-popup__text').textContent = cardName.textContent;
    });
});