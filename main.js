// This is the main entry point for the Grocery Job Mini-Game
// It initializes the game by importing and coordinating various modules
// The game logic is modularized into separate files for better maintainability
import * as App from "./index.js";

window.addEventListener('load', () => {
  const introcontainer = document.getElementById('intro-container');
  const intro2 = document.getElementById('intro-2');
  const intro1 = document.querySelector('.first-intro');
  const game = document.querySelector('.grocery-store-wrapper');
  const playGameBtn = document.getElementById('play-game-btn');

  // Show second intro after first
  intro1.addEventListener("animationend", () => {
    intro1.style.display = "none";
    intro2.style.display = "flex";
  });

  playGameBtn.addEventListener('click', () => {
    introcontainer.style.display = 'none';
    game.style.display = 'flex';
    App.passerByWrapper.style.visibility = 'visible';
    App.mainBgm.currentTime = 0;
    App.mainBgm.play();
    App.streetSound.currentTime = 0;
    App.streetSound.play();
  });
});