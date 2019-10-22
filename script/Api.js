'use strict';

//работа с api
class Api {
    constructor(options){
      this.options = options;
    }
  
    getUserData() {
      fetch(this.options.baseUrl+'/users/me', Object.assign({}, this.options.header))
        .then(statusRequest)
        .then(data => {
          formPopup.setupProfileData(data.name, data.about, data.avatar);
        })
        .catch(err=>console.log(err));
    }
  
    editUserData(name, about){
      document.querySelector('.popup__edit-button').textContent = 'Загрузка...';
      fetch(this.options.baseUrl+'/users/me', Object.assign({method: 'PATCH'}, this.options.header, {body: JSON.stringify({
        "name": name,
        "about": about
      })}))
        .then(statusRequest)
        .then(data=>{
          formPopup.setupProfileData(data.name, data.about, data.avatar);
        })
        .catch(err=>{console.log('edit user data ERROR :', err);})
        .finally(()=>{
          document.querySelector('.popup__edit-button').textContent = 'Сохранить';
          formPopup.close();
        })
    }
  
    getCards() {
      fetch(this.options.baseUrl+'/cards',  this.options.header)
        .then(statusRequest)
        .then(data => {
          cardContainer = new CardList(document.querySelector('.places-list'), data);
        })
        .catch(err => console.log('getCard ERROR :', err));
    }
  
    addCard(name, link) {
      document.querySelector('#addButton').textContent = 'Загрузка...';
      document.querySelector('#addButton').classList.add('popup__edit-button');
      
      fetch(this.options.baseUrl+'/cards', Object.assign({method: 'POST'}, this.options.header, {body: JSON.stringify({
        'name': name,
        'link': link
      })}))
        .then(statusRequest)
        .then(data => {
          const card = new Card(data);
          cardContainer.addCard(card.card);
        })
        .catch(err => console.log('addCard ERROR :', err))
        .finally(()=> {
          document.querySelector('#addButton').textContent = '+';
          document.querySelector('#addButton').classList.remove('popup__edit-button');
          addPopuop.close();
        })
    }
  
    deleteCard(id){
      fetch(this.options.baseUrl+'/cards/'+id, Object.assign({method: 'DELETE'}, this.options.header))
        .then(statusRequest)
        .then(data => console.log('data :', data))
        .catch(err => console.log('deleteCard ERROR :', err))
    }
  
    editLikeCount(id, method, card) {
      return fetch(this.options.baseUrl+'/cards/like/'+id, Object.assign({method: method}, this.options.header))
        .then(statusRequest)
        .then(data => {
          card.classList.toggle('place-card__like-icon_liked');
          return data.likes.length;
        })
        .catch((err)=> {
          console.log('editLikeCount ERROR : :', err);
        })
    }
  
    changeAvatar(link){
      document.querySelector('#avatarSubmit').setAttribute('disabled', true);
      document.querySelector('#avatarSubmit').textContent = 'Загрузка...';
    
      fetch(this.options.baseUrl+'/users/me/avatar',Object.assign({method: 'PATCH'}, this.options.header, {body:JSON.stringify({avatar: link})}))
      .then(statusRequest)
      .then(data => {
        document.querySelector('.user-info__photo').style.backgroundImage = `url('${data.avatar}')`;
      })
      .catch(err => {
        console.log('changeAvatar ERROR : :', err);
      })
      .finally(()=> {
        document.querySelector('#avatarSubmit').textContent = 'Сохранить';
        avatarPopup.close();
        document.querySelector('#avatarSubmit').removeAttribute('disabled', true);
        document.forms.avatar.elements.link.value = '';
      })
  
    }
  }

function statusRequest(res) {
    if (res.ok) {
      return res.json();
    } return Promise.reject(res);
}


// let cardContainer = '';

