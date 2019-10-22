'use strict';



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
const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort3',
  header:{
    headers: {
      authorization: '4cdd9b84-dfe4-4ccc-942e-84e8ca2336ab',
      'Content-Type': 'application/json'
    }
  }
})
let cardContainer = '';
const formPopup = new ChangeNamePopup(document.querySelector('.edit-popup'), document.querySelector('.user-info__edit-button'));
const addPopuop = new AddCardPopup(document.querySelector('.add-popup'), document.querySelector('.user-info__button'));
const avatarPopup = new ChangeAvatarPopup(document.querySelector('.avatar-popup'), document.querySelector('.user-info__photo'));
const photoPopup = document.querySelector('.photo-popup');


api.getUserData();
api.getCards();

photoPopup.querySelector('.popup__close').addEventListener('click', () => {
  photoPopup.classList.remove('popup_is-opened');

})

document.querySelector('.root').addEventListener('input', validity);

//У меня, почему то, поехала верстка, при наведении мышки на изображение в карточки .place-card__image::after стал 
//появляться ровно под изображением и перекрывал .place-card__description. 
//Пришлось добавить ему position: absolute и расположение... но очень интересно из-за чего это происходило

/*самое трудоемкое было настроить смену колличества лайков, когда нажимаешь на лайк. this внутри fetch(then) указывает не 
на место вызова, а на место сборки класса, в связи с этим внутри then поменять кол-во лайков на актуально не получалось.
Потом не мог понять как вытащить PromiseValue... Но сладость побеты этого стоила))
*/

/**
 * Здравствуйте
 * Большую работу проделали, молодцы
 * В любой работе, сколько бы долго её не делать, вы получаете самое главное, опыт
 * 
 * Я не смог отредактировать профиль, очень печально, надо исправить - Исправил
 * 
 * Каждый класс надо разнести в отдельный файл
 * 1 класс = 1 файл и подцепить файлы в  <script src="./script/script.js"></script> по очереди - Сначала ничего не понял, потом прочитал
 *  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import и стало лучше) надеюсь, что правильно понял,
 * что от меня требовалось. Единственное, теперь не работает, если НЕ через сервер открывать, то есть как файл, с этим можно как нибудь бороться?
 * 
 * Очень непонравилась конструкция 
 * document.querySelector('.photo-popup').querySelector('.popup__close').addEventListener('click', () => {
 * Таких длинных конструкций стоит избегать - исправил
 * 
 *  owner._id необходимо вынести отдельно - если правильно понял, то сделал
 *  так же  так  токен и идентификатор группы
 * 
 * 
 * function statusRequest(res)  - очень хорошее решение - спасибо!
 * 
 * @koras
 * 
 */

/**
 * У меня ничего не работает, не могу проверить
 * 
 * Зачем вы делаете через import, у вас нет webpack и так далее
 * 
 * Подключите просто через  <script src="./script/script.js" type="module"></script>
 * Не изобретайте велосипед
 * 
 */



 /**
  * Работа принимается в полном объёме
  * 
 * @koras
  * 
  */