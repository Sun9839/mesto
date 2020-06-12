const profileForm = document.forms.profile;
const placesForm = document.forms.places;
function showInputError(formElement,inputElement){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__name_type_error');
    errorElement.classList.add('popup__input-error_active');
}
function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__name_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}
function isValid(formElement,inputElement){
    if(!inputElement.validity.valid){
        showInputError(formElement,inputElement,inputElement.validitionMessage);
        showErrorMessage(inputElement);
    }else{
        hideInputError(formElement,inputElement);
    }
}
function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll('input'));
    toggleButtonState(inputList, formElement.querySelector('.popup__save'));
    inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input',() => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, formElement.querySelector('.popup__save'));
        });
    });
}
function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) =>{
        setEventListeners(formElement);
    });
}
function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}
function toggleButtonState(inputList,buttonElement){
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save_inactive');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__save_inactive');
        buttonElement.disabled = false;
    }
}
function showErrorMessage(input){
    if(input.value.length > 0){
        if(input.id === 'input-link'){
            showLinkError(input);
        }else{
            showTextError(input);
        }
    }else{
        document.querySelector(`#${input.id}-error`).textContent = 'Вы пропустили это поле.';
    }
}
function showLinkError(input){
    document.querySelector(`#${input.id}-error`).textContent = 'Введите адрес сайта.';
}
function showTextError(input){
    document.querySelector(`#${input.id}-error`).textContent = `Длинна текста должна быть от ${input.getAttribute('minlength')} до ${input.getAttribute('maxlength')} символов.`;
}
enableValidation();