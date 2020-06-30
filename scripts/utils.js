function togglePopup(popup){
    popup.classList.toggle('popup_opened');
    addEventListenerPopup(popup);
}
function clickOverlay(evt){
    if(evt.target.classList.contains('popup')){	   
        togglePopup(document.querySelector('.popup_opened'));
    }
}
function clickEsc(evt){
    if(evt.keyCode === 27){
        togglePopup(document.querySelector('.popup_opened'));
    }
}
function addEventListenerPopup(popup){
    const openPopup = popup.classList.contains('popup_opened');
    if(openPopup){
        popup.addEventListener('click',clickOverlay);
        document.addEventListener('keydown',clickEsc);
    }else{
        popup.removeEventListener('click',clickOverlay);
        document.removeEventListener('keydown',clickEsc);
    }
}
export {addEventListenerPopup,togglePopup};