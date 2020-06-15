const object = {
    formSelector: '.popup__form',
    inputSelector: 'input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__name_type_error',
    inactiveButtonClass: 'popup__save_inactive'
}
function cleanErrors(popup){
    const inputElements = Array.from(popup.querySelectorAll('input'));
    inputElements.forEach((inputElement) => {
        inputElement.classList.remove(object.inputErrorClass);
        popup.querySelector(`#${inputElement.id}-error`).textContent = '';
    })
}
function handleInput(evt,errCls){
    const input = evt.target;
    const error = document.querySelector(`#${input.id}-error`);
    const isInputValid = input.checkValidity();
    if(isInputValid){
        input.classList.remove(errCls);
        error.textContent = '';
    }else{
        input.classList.add(errCls);
        error.textContent = input.validationMessage;
    }
}
function handleFormInput(formElement, submitButton, inactiveButtonClass){
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass,hasErrors)
}
function enableValidation(obj){
    const formElements = Array.from(document.querySelectorAll(obj.formSelector));
    formElements.forEach((formElement) => {
        const InputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
        const submitButton = formElement.querySelector(obj.submitButtonSelector);
        InputElements.forEach((input) => {
            input.addEventListener('input',(el) => {handleInput(el,obj.inputErrorClass)});
        })
        formElement.addEventListener('input', () => {handleFormInput(formElement, submitButton, obj.inactiveButtonClass)})
    })
}
enableValidation(object);