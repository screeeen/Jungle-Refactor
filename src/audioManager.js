"use strict";
var tick = new Audio("snd/tick.wav");
var flipCard = new Audio("snd/flipCard.wav");
var music  = new Audio ("snd/tune.mp3");
var lifeSnd  = new Audio ("snd/life.wav");
var fightSnd = new Audio ("snd/fight.wav");
var deadSnd = new Audio ("snd/dead.wav");


function AudioManager(){

}

AudioManager.prototype.playMusic = function (){
    music.volume = .2;
    music.loop = true;
    music.play();
}





    // function changeSound (sound){
    //   audioGuy.pause();
    //   audioGuy.currentTime = 0;
    //   audioGuy.pitch = Math.random();
    //   audioGuy.src = `snd/${sound}.wav`;
    //   audioGuy.play();
    // }