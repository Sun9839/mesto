class Card{
    constructor(data){
        this._title = data.name;
        this._link = data.link;
    }
    _getTemplate(){
        const cardElement = document.querySelector('#place-card-template').content.querySelector('.place-card').cloneNode(true);
        return cardElement;
    }
    _handleLike(){
        this._element.querySelector('.place-card__like').classList.toggle('place-card__like_clicked');
    }
    _handleDelete(){
        const deleteCard = this._element.closest('.place-card');
        deleteCard.remove();
    }
    _openPopup(){
        document.querySelector('#image-popup').classList.toggle('popup__opened');
    }
    _handleImageClick(){
        document.querySelector('#image-popup').querySelector('.popup__image').src = this._element.querySelector('.place-card__image').src;
        document.querySelector('#image-popup').querySelector('.popup__text').textContent = this._element.querySelector('.place-card__image').alt;
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