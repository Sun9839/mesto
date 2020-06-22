class FormValidator{
    constructor(optionObject,form){
        this._inputSelector = optionObject.inputElement;
        this._submitButtonSelector = optionObject.submitButtonSelector;
        this._inputErrorClass = optionObject.inputErrorClass;
        this._inactiveButtonClass = optionObject.inactiveButtonClass;
        this._form = form;
    }
    _handleInput(){
        const inputElements = Array.from(this._form.querySelectorAll('input'));
        inputElements.forEach((inputElement) => {
            const error = document.querySelector(`#${inputElement.id}-error`);
            const isInputValid = inputElement.checkValidity();
            if(isInputValid){
                inputElement.classList.remove(this._inputErrorClass);
                error.textContent = '';
            }else{
                inputElement.classList.add(this._inputErrorClass);
                error.textContent = inputElement.validationMessage;
            }
        })
    }
    _handleFormInput(){
        const hasErrors = !this._form.checkValidity();
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        submitButton.disabled = hasErrors;
        submitButton.classList.toggle(this._inactiveButtonClass,hasErrors)
    }
    enableValidation(){
        this._form.addEventListener('input',() => {
            this._handleInput()
            this._handleFormInput();
        })
    }
}
export {FormValidator};