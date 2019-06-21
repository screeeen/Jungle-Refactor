"use strict";

// -------------- MAIN --------------------

function main() {
  function buildDom(html) {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = html;
    return mainElement;
  }

  // -------------- SPLASH --------------------

  function buildSplashScreen() {
    const splashScreen = buildDom(`
<section>
  <h1>Jungle Rumble Cards Adventure</h1>
  <button class="start-button">Start Game</button>
  </section>
`);
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", buildGameScreen);
  }

  buildSplashScreen();

  // -------------- GAME --------------------

  function buildGameScreen() {
    const gameScreen = buildDom(`
<div id="title">
      <h1>Jungle Rumble Cards Adventure </h1>
    </div>
    <div id="game-view">
    <div id="stack">
    <h2>Cards Stack</h2>
    <ul class="cards-list"></ul>
  </div>
      <div id="monitor"></div>
      <div id="avatar">
        <!-- <h2 class=".hp"></h2> -->
      </div>
      <div id="hand">
      <div class="hand-opened">
        <h2>Your Cards</h2>
        </div>
      </div>
      <div class="life-ui"></div>
      <div id="tip">
        <p>---TIPS HERE---- <span id="tip-text"></span></p>

      </div>
    </div>
`);

    //------------------------------------

    var cardStackForGame = JSON.parse(JSON.stringify(newCardsStack));
    var newRoomsCopy = JSON.parse(JSON.stringify(newRooms));

    const hp = 10;
    var player = new Player(hp);
    const audioManager = new AudioManager();
    // audioManager.playMusic(music);
    var monitor = new Monitor();
    var rooms = new Rooms(newRoomsCopy);
    const game = new Game(player, cardStackForGame);

    game.callback = tip;
    game.cardStack = game.shuffleCards(game.cardStack);
    game.getHand(game.cardStack);


    let stackView = document.querySelector(".cards-list");
    let monitorView = document.querySelector("#monitor");
    let handView = document.querySelector("#hand");
    let avatarView = document.querySelector("#avatar");
    let lifeUI = document.querySelector(".life-ui");
    let handDivs = document.querySelectorAll(".hand-card");

    function tip(msg) {
      var speed = 25;
      var i = 0;
      let tipview = document.querySelector("#tip");
      let txt = "";

      function type() {
        if (i < msg.length) {
          txt += msg.charAt(i);
          tick.pitch = -5//Math.random();
          tick.volume = .1;
          tick.play();
          let result = `<p id="tip-text1">${txt}</p> `;
          tipview.innerHTML = result;
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }

    function selectCard() {
      let index = this.attributes.index.value;
      this.removeEventListener("onmouseenter", selectCard);
      this.setAttribute("id", "hand-card-back");
      displayCard(index);
      game.adventureStep++;
      game.makeCardAction(game.hand[index].value);
      monitor.updateAvatarView();
      avatarView.innerHTML = monitor.updateAvatarView();
      lifeUI.innerHTML = monitor.updateLifeStats();
      monitorView.innerHTML = monitor.updateRoomsIntoMonitor(game.hand[index].value,game, rooms);
      checkIfGameOver();
      game.discardCardAfterUse(index);

      if (game.checkIfCardsNeeded() && game.player.hp > 0) {
        closeCardBox();

        const time = 1000;
        let timedown = 5;
        const intervalId = setInterval(function () {
          timedown--;
          tip("New cards in  " + timedown);
          if (timedown === 0) {
            flush(intervalId);
          }
        }, time);
      }
    }

    function flush(t) {
      openCardBox();
      tip("New Round. Pick a card young fellow.");
      clearInterval(t);
      game.getHand(game.cardStack);
      handView.innerHTML = monitor.updateHandView(handView, game);
      stackView.innerHTML = monitor.updateStack(game);

      nextTurn();
    }

    function createHandListeners(handDiv) {
      handDiv.forEach(function (card, i) {
        handDiv[i].addEventListener("click", selectCard);
        // e.preventDefault();
      });
    }

    function nextTurn() {
      createHandListeners(handDivs);
    }

    function checkIfGameOver() {
      if (game.player.hp < 1) {
        music.pause();
        deadSnd.play();
        tip("Sorry GAME OVER");
        closeCardBox();
        setTimeout(buildGameOVerScreen, 5000);
      }
    }

    function displayCard(index) {
      flipCard.pitch = -5//Math.random();
      flipCard.volume = .8;
      flipCard.play();
      handDivs[index].style.background = `url(img/${
        game.hand[index].value
        }.png) center no-repeat`;
    }

    function closeCardBox() {
      handDivs.forEach(function (e) {
        var cardsBox = document.querySelectorAll(".hand-card");

        cardsBox.forEach(function (e, i) {
          e.removeAttribute("class", "hand-card");
          e.removeAttribute("id", "hand-card-back");
          e.style.background = ""; // removeAttribute("class","background");
          e.setAttribute("class", "hand-closed");
        });

      });
    }

    function openCardBox() {
      var thing = document.querySelectorAll(".hand-closed");

      thing.forEach(function (e, i) {
        e.removeAttribute("class", "hand-closed");
        e.setAttribute("class", "hand-card");
        e.setAttribute("class", "hand-open");
      });
    }

    //first state
    stackView.innerHTML = monitor.updateStack(game);
    monitorView.innerHTML = monitor.updateRoomsIntoMonitor('start', game, rooms);
    handView.innerHTML = monitor.updateHandView(handView, game);
    avatarView.innerHTML = monitor.updateAvatarView(game.player.hp);
    lifeUI.innerHTML = monitor.updateLifeStats(game.player.hp);
    handDivs = document.querySelectorAll(".hand-card");

    nextTurn();

    tip(
      "Welcome to <color:#F44>jungle Rumble</color>. Pick a card and enjoy. Your hp: " +
      game.player.hp
    );
  }

  // -------------- OVER --------------------

  function buildGameOVerScreen() {
    const gameOverScreen = buildDom(`
    <section>
    <h1>Game Over</h1>
    <button class="restart-button">
    <p id="leaflet">
    Haiku:
    <br>
    · Choose a magic card<br>
    · Watch the history chart<br>
    · Be lucky<br>
    · Repeat
     <br>
     <br>
     <br>
     ...and now click and restart.
     <br>
    </p>
    </button>
   

    </section>
    `);
    const restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", buildGameScreen);
  }

  //TOOL
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 38) {
      buildGameScreen();
    }
  });

}
window.addEventListener("load", main);



// function tip(msg) {
//   let txt = [];
//   let tipview = document.querySelector("#tip");
//   let speed = 8000;

//   console.log("msg: " +msg);

//   function typeIt(letter){
//     // [...txt + letter].forEach((letter)=>{
//       txt.push(letter);
//       let txtButJoined = txt.join('')

//       console.log("text " + txtButJoined);

//       let result = `<p id="tip-text1">${txtButJoined}</p> `;
//       tipview.innerHTML = result;

//       console.log(txt);
//       // setTimeout(typeIt, speed);
//       // i++;
//     }
//     [...msg].forEach((letter)=> setTimeout(()=>{typeIt(letter)},speed))
//     // typeIt();
//   }

