import Section from "../components/Section.js";
import PopupWidthImage from "../components/PopupWidthImage.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/constants.js";

const imagePopup = new PopupWidthImage('#image-popup');

const places = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                imagePopup.open(item);
                imagePopup.setEventListeners();
            },
            templateSelector: '#place-card-template'
        });
        const cardElement = card.generateCard();
        places.addItem(cardElement);
    }
},'.places__list');
places.renderItems();