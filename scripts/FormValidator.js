class FormValidator{
    constructor(optionObject,form){
        this._inputSelector = optionObject.inputSelector;
        this._submitButtonSelector = optionObject.submitButtonSelector;
        this._inputErrorClass = optionObject.inputErrorClass;
        this._inactiveButtonClass = optionObject.inactiveButtonClass;
        this._form = form;
    }
    hideInputError(input){
        input.classList.remove(this._inputErrorClass);
        document.querySelector(`#${input.id}-error`).textContent = '';
    }
    _showInputError(input){
        input.classList.add(this._inputErrorClass);
        document.querySelector(`#${input.id}-error`).textContent = input.validationMessage;
    }
    _checkInputValidity(input){
        input.addEventListener('input',() => {
            const hasNotErrors = input.checkValidity(); 
            if(hasNotErrors){ 
                this.hideInputError(input); 
            }else{ 
                this._showInputError(input); 
            } 
        })
    }
    checkButtonState(){
        const saveButton = this._form.querySelector('.popup__save');
        const hasNotErrors = this._form.checkValidity();
        if(hasNotErrors){ 
            saveButton.classList.remove(this._inactiveButtonClass); 
            saveButton.disabled = false; 
        }else{ 
            saveButton.classList.add(this._inactiveButtonClass); 
            saveButton.disabled = true; 
        } 
    }
    _setEventListeners(){
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputs.forEach((item) => {
            this._checkInputValidity(item);
        })
        this._form.addEventListener('input',() => { 
            this.checkButtonState(this._form); 
        })
    }
    enableValidation(){
    this._setEventListeners();
    }
}
export {FormValidator};