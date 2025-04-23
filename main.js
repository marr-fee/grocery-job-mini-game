// This is the main entry point for the Grocery Job Mini-Game
// It initializes the game by importing and coordinating various modules
// The game logic is modularized into separate files for better maintainability
import * as App from "./index.js";

window.addEventListener('load', () => {
  const intro1 = document.getElementById('intro-1');
  const intro2 = document.getElementById('intro-2');
  const game = document.querySelector('.grocery-store-wrapper');

  // Show second intro after first
  setTimeout(() => {
    intro1.style.display = 'none';
    intro2.classList.remove('hidden');
  }, 4000); // after 4s

  // Show game after second
  setTimeout(() => {
    intro2.style.display = 'none';
    game.style.display = 'flex';
  }, 7000); // after 4s of intro 2 (total 7s)
});