"use strict";

function Game(player, newCardsStack, newRooms) {
  this.player = player;
  this.cardStack = newCardsStack;
  this.hand = [];
  this.handDivs = [];
  this.usedCards = [];
  this.adventureStep = 0;
  this.rooms = newRooms;
  this.visitedRoomsValue =[];
  this.visitedBackgrounds =[];
  this.callback = null;
}

Game.prototype.shuffleCards = function(array) {
  let result = []; //wtf, gives undefined
  for (; array.length > 0; ) {
    let randomNumber = Math.floor(Math.random() * array.length);
    let randomCard = array.splice(randomNumber, 1);

    result.push(randomCard[0]);
  }
  this.setTipCallback("game-shuffle: " + result);

  return result;
};

Game.prototype.initializeRooms = function() {
  return this.cardStack.length;
};

Game.prototype.getHand = function(array) {
  this.hand = [];
  if (array.length > 0) {
    for (var i = 0; i < 4; i++) {
      var randomCard = Math.random() * array.length;
      let cardToPass = array.pop();
      this.hand.push(cardToPass);
    }
  }

};

Game.prototype.discardCardAfterUse = function(index) {
  this.hand[index].isUsed = true;
};

Game.prototype.makeCardAction = function(card) {
  switch (card) {
    case "fight":
      this.fight();
      break;
    case "hole":
      this.hole();
      break;
    case "life":
      this.life();
      break;
  }
};

Game.prototype.fight = function() {
  let damage = parseInt(1 + Math.random() * 4);
  this.player.hp -= damage;

  this.callback(
    "The fight has broke your jaw in pieces and damage is: " +
      damage +
      "\n Now your HP is: " +
      this.player.hp
  );
};

Game.prototype.hole = function() {
  this.player.hp = 0;
  this.callback("You felt into the hole. You are dead.");
  console.log("--hole--");
};

Game.prototype.life = function() {
  this.player.hp = 10;
  this.callback("You ate chicken. Your HP is: " + this.player.hp);
};

Game.prototype.checkIfCardsNeeded = function() {
  let counter = this.hand.length;
  this.hand.forEach(function(card) {
    if (card.isUsed === true) {
      counter--;
    }
  });
  if (counter < 2) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.flush = function() {
  this.hand = [];
};

Game.prototype.setTipCallback = function(updateTipText) {
  this.updateTipText = updateTipText;
  this.callback(this.updateTipText);
};
