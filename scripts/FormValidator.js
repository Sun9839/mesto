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
    _checkInputsValidity(){
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector)); 
        inputs.forEach((item) => {
            item.addEventListener('input',() => {
                const hasNotErrors = item.checkValidity();
                if(hasNotErrors){
                    this.hideInputError(item);
                }else{
                    this._showInputError(item);
                }
            });
        });
    }
    checkButtonState(questionary){
        const saveButton = questionary.querySelector('.popup__save');
        const hasNotErrors = questionary.checkValidity();
        if(hasNotErrors){ 
            saveButton.classList.remove(this._inactiveButtonClass); 
            saveButton.disabled = false; 
        }else{ 
            saveButton.classList.add(this._inactiveButtonClass); 
            saveButton.disabled = true; 
        } 
    }
    enableValidation(){
        this._form.addEventListener('input',() => {
            this.checkButtonState(this._form);
        })
        this._checkInputsValidity();
    }
}
export {FormValidator};