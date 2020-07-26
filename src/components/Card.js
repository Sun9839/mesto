export default class Card {
    constructor({data, handleCardClick, templateSelector,clickDelete,likeClick}){
        this._data = data;
        this._id = data._id;
        this._owner = data.owner
        this._title = data.name;
        this._link = data.link;
        this._quantity = data.likes.length;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
        this._clickDelete = clickDelete;
        this._likeClick = likeClick;
        this._likes = data.likes;
    }
    _getTemplate(){
        this._card = document.querySelector(this._templateSelector).content.querySelector('.place-card').cloneNode(true);
        return this._card;
    }
    handleLike(){
        this._card.querySelector('.place-card__like').classList.toggle('place-card__like_clicked');
        this._card.querySelector('.place-card__quantity').textContent = this._quantity;
    }
    addLike(){
        this._quantity = this._quantity + 1;
    }
    removeLike(){
        this._quantity = this._quantity - 1;
    }
    checkLike(){
        return this._card.querySelector('.place-card__like').classList.contains('place-card__like_clicked');
    }
    delete(){
        this._card.remove();
        this._card = '';
    }
    _disableDeleteButton(){
        this._card.querySelector('.place-card__delete').classList.add('place-card__delete_disabled');
    }
    _setEventListeners(){
        this._card.querySelector('.place-card__like').addEventListener('click',() => {
            this._likeClick();
        });
        this._card.querySelector('.place-card__delete').addEventListener('click',() => {
            this._clickDelete();
        })
        this._card.querySelector('.place-card__image').addEventListener('click',() => {
            this._handleCardClick();
        });
    }
    returnId(){
        return this._id;
    }
    generateCard(){
        this._getTemplate();
        this._setEventListeners();
        this._card.querySelector('.place-card__title').textContent = this._title;
        this._image = this._card.querySelector('.place-card__image');
        this._image.alt = this._title;
        this._image.src = this._link;
        this._card.querySelector('.place-card__quantity').textContent = this._quantity;
        if(this._owner._id != '9aa1628c56d20492a03bb1f2'){
            this._disableDeleteButton();
        }
        this._likes.forEach((item) => {
            if(item._id === '9aa1628c56d20492a03bb1f2'){
                this._card.querySelector('.place-card__like').classList.add('place-card__like_clicked');
            }
        })
        return this._card;
    }
}