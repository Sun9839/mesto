export default class Card {
    constructor({data, handleCardClick, templateSelector}){
        this._title = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
    }
    _getTemplate(){
        const card = document.querySelector(this._templateSelector).content.querySelector('.place-card').cloneNode(true);
        return card;
    }
    _handleLike(){
        this._element.querySelector('.place-card__like').classList.toggle('place-card__like_clicked');
    }
    _handleDelete(){
        this._element.remove();
        this._element = '';
    }
    _setEventListeners(){
        this._element.querySelector('.place-card__like').addEventListener('click',() => {
            this._handleLike();
        });
        this._element.querySelector('.place-card__delete').addEventListener('click',() => {
            this._handleDelete();
        })
        this._element.querySelector('.place-card__image').addEventListener('click',() => {
            this._handleCardClick();
        });
    }
    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.place-card__title').textContent = this._title;
        this._element.querySelector('.place-card__image').alt = this._title;
        this._element.querySelector('.place-card__image').src = this._link;
        return this._element;
    }
}