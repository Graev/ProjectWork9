'use strict';

//работа с api
class Api {
    constructor(options){
      this.options = options;
    }
  
    getUserData() {
      return fetch(this.options.baseUrl+'/users/me', Object.assign({}, this.options.header))
        .then(statusRequest)
        .catch(err=>console.log(err));
    }
  
    editUserData(name, about){
      return fetch(this.options.baseUrl+'/users/me', Object.assign({method: 'PATCH'}, this.options.header, {body: JSON.stringify({
        "name": name,
        "about": about
      })}))
        .then(statusRequest)
        .catch(err=>{console.log('edit user data ERROR :', err);})
    }
  
    getCards() {
      return fetch(this.options.baseUrl+'/cards',  this.options.header)
        .then(statusRequest)
        .catch(err => console.log('getCard ERROR :', err));
    }
  
    addCard(name, link) {
      return fetch(this.options.baseUrl+'/cards', Object.assign({method: 'POST'}, this.options.header, {body: JSON.stringify({
        'name': name,
        'link': link
      })}))
        .then(statusRequest)
        .catch(err => console.log('addCard ERROR :', err))
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
        .catch((err)=> {
          console.log('editLikeCount ERROR : :', err);
        })
    }
  
    changeAvatar(link){
      document.querySelector('#avatarSubmit').setAttribute('disabled', true);
      document.querySelector('#avatarSubmit').textContent = 'Загрузка...';
    
      return fetch(this.options.baseUrl+'/users/me/avatar',Object.assign({method: 'PATCH'}, this.options.header, {body:JSON.stringify({avatar: link})}))
      .then(statusRequest)
      .catch(err => {
        console.log('changeAvatar ERROR : :', err);
      })
    }
  }

function statusRequest(res) {
    if (res.ok) {
      return res.json();
    } return Promise.reject(res);
}

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';

export const api = new Api({
  baseUrl: serverUrl,
  header:{
    headers: {
      authorization: '4cdd9b84-dfe4-4ccc-942e-84e8ca2336ab',
      'Content-Type': 'application/json'
    }
  }
})

