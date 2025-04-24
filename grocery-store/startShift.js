// startLogic.js
import { showNewCustomer, startNewCustomer } from "./customerSpawn.js";
import { startTimer } from "./timeLogic.js";
import { updateScores } from "./scoreUpdate.js";
import { playAgainBtn, popupMessageElem, startGroceryJobBtn, timerElem, tipsJar, totalDisplay, ruleBook } from "./domConstants.js";
import { gameState } from "./gameState.js";
import { prepareNextShift } from "./resetValues.js";

export function startGroceryShift() {
  showNewCustomer();
  startNewCustomer();
  startTimer();
  updateScores();
  ruleBook.classList.add('hidden');
}

playAgainBtn.addEventListener('click', () => {
  playAgainBtn.style.visibility = 'hidden';
  startGroceryJobBtn.style.visibility = 'visible';

  prepareNextShift();
  
  Object.assign(gameState, {
    jobSecurity: 50,
    salary: 1200,
    accountBalance: 50,
    days: 1,
    isFired: false,
    highScore: parseInt(localStorage.getItem("highScore")) || 0,
  });
  
});
