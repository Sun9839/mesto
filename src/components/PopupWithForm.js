import Popup from "./Popup.js";
export default class PopupWidthForm extends Popup{
    constructor({popupSelector,handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }
    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        this._formValues.avatar = document.querySelector('.profile__image').src;
        return this._formValues;
    }
    setInputsValues(object){
        this._popup.querySelector('.popup__name').value = object.name;
        this._popup.querySelector('.popup__activity').value = object.activity;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._getInputValues();
            this._handleSubmit(this._formValues);
            this.close();
        });
    }
    close() {
        super.close();
        this._popup.querySelectorAll('input').forEach((input) => {
            input.value = '';
        })
    }
}