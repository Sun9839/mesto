let editButton = document.querySelector('.profile__edit');
let name = document.querySelector('.profile__name');
let activity = document.querySelector('.profile__activity');
let popup = document.querySelector('#popup');
let closeButton = popup.querySelector('.popup__close');
let inputName = popup.querySelector('.popup__name');
let inputActivity = popup.querySelector('.popup__activity');
let saveButton = popup.querySelector('.popup__save');
function popupClose(){
    popup.classList.remove('popup__opened');
    console.log('popup закрыт');
}
function popupOpen(){
    popup.classList.add('popup__opened');
    inputName.value = name.textContent;
    inputActivity.value = activity.textContent;
    console.log('popup открыт');
}
function popupSave(){
    name.textContent = inputName.value;
    activity.textContent = inputActivity.value;
    console.log('изменения сохранены');
}
editButton.addEventListener('click',popupOpen);
closeButton.addEventListener('click',popupClose);
saveButton.addEventListener('click',popupSave);
saveButton.addEventListener('click',popupClose);
popup.addEventListener('submit',popupSave)