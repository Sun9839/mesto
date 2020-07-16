export default class Card {
    constructor({data, handleCardClick, templateSelector}){
        this._title = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
    }
    _getTemplate(){
        this._card = document.querySelector(this._templateSelector).content.querySelector('.place-card').cloneNode(true);
        return this._card;
    }
    _handleLike(){
        this._card.querySelector('.place-card__like').classList.toggle('place-card__like_clicked');
    }
    _handleDelete(){
        this._card.remove();
        this._card = '';
    }
    _setEventListeners(){
        this._card.querySelector('.place-card__like').addEventListener('click',() => {
            this._handleLike();
        });
        this._card.querySelector('.place-card__delete').addEventListener('click',() => {
            this._handleDelete();
        })
        this._card.querySelector('.place-card__image').addEventListener('click',() => {
            this._handleCardClick();
        });
    }
    generateCard(){
        this._getTemplate();
        this._setEventListeners();
        this._card.querySelector('.place-card__title').textContent = this._title;
        this._card.querySelector('.place-card__image').alt = this._title;
        this._card.querySelector('.place-card__image').src = this._link;
        return this._card;
    }
}