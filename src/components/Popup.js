export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClick = this._handleEscClick.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }
    open(){
        this._popup.classList.add('popup_opened');
    }
    close(){
        this._popup.classList.remove('popup_opened');
    }
    _handleOverlayClick(evt){
        if(evt.target.classList.contains('popup')){
            this.close();
        }
    }
    _handleEscClick(evt){
        if(evt.keyCode === 27){
            this.close();
        }
    }
    setEventListeners(){
        const popupIsOpen = this._popup.classList.contains('popup_opened');
        if(popupIsOpen){
            document.addEventListener('keydown',this._handleEscClick);
            this._popup.addEventListener('click',this._handleOverlayClick);
            this._popup.querySelector('.popup__close').addEventListener('click',() => {
                this.close();
            })
        }else{
            document.removeEventListener('keydown',this._handleEscClick);
            this._popup.removeEventListener('click',this._handleOverlayClick);
        }
    }
}