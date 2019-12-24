'use strict';

import {api} from './Api.js';
import {Card} from './Card.js';
import {cardContainer} from './CardList.js';

//работа с Popup
export class Popup {
  constructor(popupElement, openButton){
    this.popupElement = popupElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    openButton.addEventListener('click', this.open);
    popupElement.querySelector('.popup__close').addEventListener('click', this.close);
  }

  open(){
    this.popupElement.classList.add('popup_is-opened');
  }

  close(){
    this.popupElement.classList.remove('popup_is-opened');
  }
}
  
export class ChangeNamePopup extends Popup {
  constructor(popupElement, openButton){
    super(popupElement, openButton);
    this.submit = this.submit.bind(this);
    this.setupProfileData = this.setupProfileData.bind(this);
    this.popupElement.addEventListener('submit', this.submit);
    
    api.getUserData().then(data=>{
      this.setupProfileData(data.name, data.about, data.avatar, data._id);
    })
  }

  open(){
    document.forms.edit.name.value = document.querySelector('.user-info__name').textContent;
    document.forms.edit.aboutOneself.value = document.querySelector('.user-info__job').textContent;
    super.open();
  }

  submit(event){
    event.preventDefault();
    document.querySelector('.popup__edit-button').textContent = 'Загрузка...';
    api.editUserData(document.forms.edit.name.value, document.forms.edit.aboutOneself.value).then(data=>{
      this.setupProfileData(data.name, data.about, data.avatar);
    })
    .finally(()=>{
      document.querySelector('.popup__edit-button').textContent = 'Сохранить';
      this.close();
    })
    event.target.parentElement.querySelector('.button').setAttribute('disabled', true);
  }

  setupProfileData(name, about, link, id){
    document.querySelector('.user-info__name').textContent = name;
    document.querySelector('.user-info__job').textContent = about;
    this.myId = id;
    if (!(link == null)) {
      document.querySelector('.user-info__photo').style.backgroundImage = `url('${link}')`;
    }
    
  }
}

export class AddCardPopup extends Popup{
  constructor(popupElement, openButton){
    super(popupElement, openButton);
    this.submit = this.submit.bind(this);
    this.popupElement.addEventListener('submit', this.submit);
  }
  submit(){
    event.preventDefault();
    document.querySelector('#addButton').textContent = 'Загрузка...';
    document.querySelector('#addButton').classList.add('popup__edit-button');
    api.addCard(document.forms.form.elements.first.value, document.forms.form.elements.second.value).then(data => {
      const card = new Card(data);
      cardContainer.addCard(card.card);
    }).finally(()=> {
      document.querySelector('#addButton').textContent = '+';
      document.querySelector('#addButton').classList.remove('popup__edit-button');
      this.close();
    });
    document.forms.form.elements.first.value = '';
    document.forms.form.elements.second.value = '';
    event.target.querySelector('.button').setAttribute('disabled', true);
  }
  
}

export class ChangeAvatarPopup extends Popup {
  constructor(popupElement, openButton){
    super(popupElement, openButton);
    this.submit = this.submit.bind(this);
    this.popupElement.addEventListener('submit', this.submit);
  }

  submit(event){
    event.preventDefault();
    api.changeAvatar(document.forms.avatar.elements.link.value)
    .then(data => {
      document.querySelector('.user-info__photo').style.backgroundImage = `url('${data.avatar}')`;
    })
    .finally(()=> {
      document.querySelector('#avatarSubmit').textContent = 'Сохранить';
      this.close();
      document.querySelector('#avatarSubmit').removeAttribute('disabled', true);
      document.forms.avatar.elements.link.value = '';
    });
  }
}

export const formPopup = new ChangeNamePopup(document.querySelector('.edit-popup'), document.querySelector('.user-info__edit-button'));
