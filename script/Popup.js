'use strict';


//работа с Popup
class Popup {
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
  
  class ChangeNamePopup extends Popup {
    constructor(popupElement, openButton){
      super(popupElement, openButton);
      this.submit = this.submit.bind(this);
      this.setupProfileData = this.setupProfileData.bind(this);
      this.popupElement.addEventListener('submit', this.submit);
    }
  
    open(){
      document.forms.edit.name.value = document.querySelector('.user-info__name').textContent;
      document.forms.edit.aboutOneself.value = document.querySelector('.user-info__job').textContent;
      super.open();
    }
  
    submit(event){
      event.preventDefault();
      api.editUserData(document.forms.edit.name.value, document.forms.edit.aboutOneself.value);
      event.target.parentElement.querySelector('.button').setAttribute('disabled', true);
    }
  
    setupProfileData(name, about, link){
      document.querySelector('.user-info__name').textContent = name;
      document.querySelector('.user-info__job').textContent = about;
      document.querySelector('.user-info__photo').style.backgroundImage = `url('${link}')`
    }
  }
  
  class AddCardPopup extends Popup{
    constructor(popupElement, openButton){
      super(popupElement, openButton);
      this.submit = this.submit.bind(this);
      this.popupElement.addEventListener('submit', this.submit);
    }
    submit(){
      event.preventDefault();
      api.addCard(document.forms.form.elements.first.value, document.forms.form.elements.second.value);
      document.forms.form.elements.first.value = '';
      document.forms.form.elements.second.value = '';
      event.target.querySelector('.button').setAttribute('disabled', true);
    }
    
  }
  
  class ChangeAvatarPopup extends Popup {
    constructor(popupElement, openButton){
      super(popupElement, openButton);
      this.submit = this.submit.bind(this);
      this.popupElement.addEventListener('submit', this.submit)
    }
  
    submit(event){
      event.preventDefault();
      api.changeAvatar(document.forms.avatar.elements.link.value);
    }
  }

