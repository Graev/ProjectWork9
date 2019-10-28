'use strict';

import {api} from './Api.js';
import {formPopup} from './Popup.js';

export class Card {
  constructor(data){
    this.data = data;
    this.name = data.name;
    this.link = data.link;
    this.myId = String(formPopup.myId);
    this.likeCount = data.likes.length;
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.popup = this.popup.bind(this);
    this.card = this.create();
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    if (this.data.owner._id == this.myId){
      this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }
    this.card.querySelector('.place-card__image').addEventListener('click', this.popup)

  }
  
  //сборка карточки
  create() {
    const placeCard = document.createElement('div');
    const placeCardDelete = document.createElement('button');
    const placeCardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLike = document.createElement('button');
    const placeCardLikeCount = document.createElement('p');
    const placeCardImage = document.createElement('div');

    placeCardImage.classList.add('place-card__image')
    placeCardDelete.classList.add('place-card__delete-icon');
    placeCardDescription.classList.add('place-card__description');
    placeCardLike.classList.add('place-card__like-icon');
    for(let i=0; i<= this.data.likes.length-1; i++){  
      if(this.data.likes[i]._id == this.myId){
        placeCardLike.classList.add('place-card__like-icon_liked');
      }
    }
    placeCardLikeCount.classList.add('place-card__like-count');
    placeCardName.classList.add('place-card__name');
    placeCard.classList.add('place-card');
    placeCardImage.setAttribute('style',`background-image: url(${this.link})`);
    placeCardLikeCount.textContent = this.likeCount;
    placeCardName.textContent = this.name;
    if (this.data.owner._id == this.myId){
      placeCardImage.appendChild(placeCardDelete);
    }
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(document.createElement('div'));
    placeCardDescription.querySelector('div').appendChild(placeCardLike);
    placeCardDescription.querySelector('div').appendChild(placeCardLikeCount);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    return placeCard;
  }
  //лайк лайк лайк
  like(event){
    if (event.target.classList.contains('place-card__like-icon_liked')){
      api.editLikeCount(this.data._id, 'DELETE' , event.target).then((data)=>{
        this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        this.card.querySelector('.place-card__like-count').textContent = data.likes.length;
      });
    }else {
      api.editLikeCount(this.data._id, 'PUT', event.target).then((data)=>{
        this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        this.card.querySelector('.place-card__like-count').textContent = data.likes.length;
      });
    }
  }
  //удаление
  remove(event){
    event.stopPropagation();
    if (window.confirm('Точно удалить?')){
      api.deleteCard(this.data._id);
      this.card.parentNode.removeChild(this.card);
    }
  }
  //поп ап который в карточке
  popup(event){
    event.stopPropagation();
    document.querySelector('.popup__photo').setAttribute('src', this.link)
    document.querySelector('.photo-popup').classList.add('popup_is-opened');
  }
}