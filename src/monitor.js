"use strict";
function Monitor(){

}

Monitor.prototype.updateStack = function(game) {
  // Generate card divs and append them to the stack view
  let result = "";
  game.cardStack.forEach(function (ele) {
    result += `
  <li style="list-style-image: url(img/${ele.value}.png)">${ele.value}
  </li>`;
  });
  console.log (result);
  return result;
}