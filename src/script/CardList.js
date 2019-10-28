'use strict';

import {Card} from './Card.js';
import {api} from './Api.js';
//контейнер карточек
export let cardContainer = '';

export class CardList{
    constructor (domContainer, cardArray) {
      this.domContainer = domContainer;
      this.cardArray = cardArray;
      this.render();
  
    }
  
    render(){
      this.cardArray.forEach((data) => {
        const cardElem = new Card(data);
        this.addCard(cardElem.card);
      })
    }
  
    addCard(card){
      this.domContainer.appendChild(card);
    }
  }

  api.getCards().then(data => {
    cardContainer = new CardList(document.querySelector('.places-list'), data);
  })