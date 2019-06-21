"use strict";
function Monitor() {

}

Monitor.prototype.updateStack = function (game) {
  // Generate card divs and append them to the stack view
  let result = "";
  game.cardStack.forEach(function (oneRoom) {
    result += `
  <li style="list-style-image: url(img/${oneRoom.value}.png)">${oneRoom.value}
  </li>`;
  });
  return result;
}

Monitor.prototype.updateRoomsIntoMonitor = function (cardValue, game, rooms) {
  console.log(rooms);
  
  let result = "";
  rooms.rooms.forEach(function (oneRoom, index) {
    if (game.adventureStep < index) {
      return;
    }
    var anim = "";
    if (!rooms.rooms[index].visited) {
      anim = "animation: play 0.8s steps(2) 2";
      rooms.rooms[index].value = cardValue;
      rooms.rooms[index].visited = true;
      var randomBackground = Math.trunc(Math.random() * 4);
      rooms.visitedBackgrounds[index] = randomBackground;
      result += `
      <div class="room ${game.adventureStep}" style="background-image:url(img/bg_${rooms.visitedBackgrounds[index]}.png); ">
      <img class="room-action" src="img/${rooms.rooms[index].value}_room_open.png"; style="${anim};"/><h2>${index}</h2></div>`;
      // console.log("result string: " + result);
      rooms.visitedRoomsValue[index] = [rooms.rooms[index].value];
      rooms.visitedBackgrounds[index] = randomBackground;
    } else {
      result += `<div class="room ${game.adventureStep}" style="background-image:url(img/bg_${rooms.visitedBackgrounds[index]}.png); ${anim}" ><h2>${index}</h2></div>`;
    }
    // console.log(
    //   "game.adventureStep " + game.adventureStep + " index " + index
    // );
    // console.log("monitor oneRoom value: " + oneRoom.value + " " + cardValue);
    // console.log("anim: " + anim);
    // console.log("--------------------");
  });
  return result;
}

// Generate hand
Monitor.prototype.updateHandView = function (handview, game) {
  let result = "";
  game.hand.forEach(function (oneRoom, index) {
    result += `
            <div class="hand-card" index="${index}" style="background: url(img/question.png) no-repeat"></div>`;
  });
  return result;
}

// Generate avatar
Monitor.prototype.updateAvatarView = function (hp) {
  let n = "";
  if (hp > 7) {
    n = "";
  }
  if (hp == 8) {
    n = "6";
  }
  if (hp == 4) {
    n = "6";
  }
  if (hp == 2) {
    n = "6";
  }
  if (hp < 5) {
    n = "2";
  }
  if (hp < 3) {
    n = "3";
  }
  if (hp < 1) {
    n = "4";
  }

  let result = "";
  if (hp > 0) {
    result = `<img style="background: url(img/avatar_${n}.png) center no-repeat"> `;
  } else {
    result = `<img style="background: url(img/avatar_${n}.png) center no-repeat">`;
  }
  return result;
}

Monitor.prototype.updateLifeStats = function (hp) {
  let resultLifeStats = "";
  if (hp > 0) {
    resultLifeStats = `<h2 class="life-ui">LIFE: ${hp} </h2>`;
  } else {
    resultLifeStats = `<h2 class="life-ui">+DEAD+</h2>`;
  }
  return resultLifeStats;
}