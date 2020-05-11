const editButton = document.querySelector('.profile__edit');
const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const popup = document.querySelector('#popup');
const closeButton = popup.querySelector('.popup__close');
const inputName = popup.querySelector('.popup__name');
const inputActivity = popup.querySelector('.popup__activity');
const saveButton = popup.querySelector('.popup__save');
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
editButton.addEventListener('click',popupOpen);
closeButton.addEventListener('click',popupClose);
saveButton.addEventListener('click',popupSave);
popup.addEventListener('submit',popupSave);