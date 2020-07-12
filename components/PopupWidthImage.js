import Popup from "./Popup.js";
export default class PopupWidthImage extends Popup{
    constructor(popupSelector,{data}) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }
    open() {
        super.open();
        this._popup.querySelector('.popup__image').src = this._link;
        this._popup.querySelector('.popup__image').alt = this._name;
        this._popup.querySelector('.popup__title').textContent = this._name;
    }
}