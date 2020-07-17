import {ESCAPE_KEY_CODE} from "../utils/constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClick = this._handleEscClick.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown',this._handleEscClick);
        this._setEventListeners()
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown',this._handleEscClick);
    }
    _handleOverlayClick(evt){
        if(evt.target.classList.contains('popup')){
            this.close();
        }
    }
    _handleEscClick(evt){
        if(evt.keyCode === ESCAPE_KEY_CODE){
            this.close();
        }
    }
    _setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClick);
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
    }

}