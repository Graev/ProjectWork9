'use strict';

//контейнер карточек
class CardList{
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