const ImagePopup = document.querySelector('#image-popup');
class Card{
    constructor(data,templateSelector){
        this._title = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }
    _getTemplate(){
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place-card').cloneNode(true);
        return cardElement;
    }
    _handleLike(){
        this._element.querySelector('.place-card__like').classList.toggle('place-card__like_clicked');
    }
    _handleDelete(){
        this._element.remove();
        this._element = '';
    }
    _clickOverlay(evt){
        if(evt.target.classList.contains('popup')){	   
            ImagePopup.classList.remove('popup_opened');
        }
    }
    _clickEsc(evt){
        if(evt.keyCode === 27){
            ImagePopup.classList.remove('popup_opened');
        }
    }
    _addEventListenerPopup(){
        const openPopup = ImagePopup.classList.contains('popup_opened');
        if(openPopup){
            ImagePopup.addEventListener('click',this._clickOverlay);
            document.addEventListener('keydown',this._clickEsc);
        }else{
            ImagePopup.removeEventListener('click',this._clickOverlay);
            document.removeEventListener('keydown',this._clickEsc);
        }
    }
    _openPopup(){
        ImagePopup.classList.toggle('popup_opened');
        this._addEventListenerPopup();
    }
    _handleImageClick(){
        ImagePopup.querySelector('.popup__image').src = this._element.querySelector('.place-card__image').src;
        ImagePopup.querySelector('.popup__text').textContent = this._element.querySelector('.place-card__image').alt;
        this._openPopup();
    }
    _setEventListeners(){
        this._element.querySelector('.place-card__like').addEventListener('click', () => {
            this._handleLike();
        });
        this._element.querySelector('.place-card__delete').addEventListener('click', () => {
            this._handleDelete();
        })
        this._element.querySelector('.place-card__image').addEventListener('click',() => {
            this._handleImageClick();
        })
    }
    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.place-card__title').textContent = this._title;
        this._element.querySelector('.place-card__image').src = this._link;
        this._element.querySelector('.place-card__image').alt = this._title;
        return this._element;
    }
}
export {Card};