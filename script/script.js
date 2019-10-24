'use strict';

import "../pages/index.css"
import {Api} from  './Api.js';
import {ChangeNamePopup, AddCardPopup, ChangeAvatarPopup} from './Popup.js';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';

/*валидацию вынес в отдельную функцию, что бы не вешать проверку каждый раз при открытии popup, 
если поля будут развиваться, можно будет сделать частью классов, наверное
*/
function inputMessage(elem) {
  if (elem.validity.valueMissing){
    elem.nextElementSibling.textContent = 'Это обязательное поле';
  }else if (elem.validity.typeMismatch) {
    elem.nextElementSibling.textContent = 'Здесь должна быть ссылка';
  } else if ((elem.validity.tooLong) || (elem.validity.tooShort)) {
    elem.nextElementSibling.textContent = `Должно быть от 2 до 30 символов`;
  } else {
    elem.nextElementSibling.textContent = '';
  }
}
    
function validity(event){
  const inputs = Array.from(event.target.parentElement.elements);
  let check = true;
  inputMessage(event.target);

  inputs.forEach((elem)=>{
    if (elem.type !== 'submit'){
      if (!elem.checkValidity()) check=false;
    }
  })

  if (check) {
    event.target.parentElement.querySelector('.button').removeAttribute('disabled', true);
  }else {
    event.target.parentElement.querySelector('.button').setAttribute('disabled', true);
  }
    }

//вызов конструкторов
export const api = new Api({
  baseUrl: serverUrl,
  header:{
    headers: {
      authorization: '4cdd9b84-dfe4-4ccc-942e-84e8ca2336ab',
      'Content-Type': 'application/json'
    }
  }
})
export let cardContainer = '';
export const formPopup = new ChangeNamePopup(document.querySelector('.edit-popup'), document.querySelector('.user-info__edit-button'));
export const addPopuop = new AddCardPopup(document.querySelector('.add-popup'), document.querySelector('.user-info__button'));
export const avatarPopup = new ChangeAvatarPopup(document.querySelector('.avatar-popup'), document.querySelector('.user-info__photo'));
const photoPopup = document.querySelector('.photo-popup');


api.getUserData();
api.getCards();

photoPopup.querySelector('.popup__close').addEventListener('click', () => {
  photoPopup.classList.remove('popup_is-opened');

})

document.querySelector('.root').addEventListener('input', validity);





