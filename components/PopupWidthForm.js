import Popup from "./Popup.js";
export default class PopupWidthForm extends Popup{
    constructor({popupSelector,handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }
    _getInputValues(){
        const values = Array.from(this._popup.querySelector('input'));
        const inputList = {};
        values.forEach((input) => {
            inputList.input = input.value;
        })
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this._handleSubmit(this._getInputValues());
    }
    close() {
        super.close();
    }
}