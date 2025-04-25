// startLogic.js
import { showNewCustomer, startNewCustomer } from "./customerSpawn.js";
import { startTimer } from "./timeLogic.js";
import { updateScores } from "./scoreUpdate.js";
import { playAgainBtn, popupMessageElem, startGroceryJobBtn, timerElem, tipsJar, totalDisplay, ruleBook, passerByWrapper } from "./domConstants.js";
import { gameState } from "./gameState.js";
import { prepareNextShift } from "./resetValues.js";
import { streetSound, mainBgm } from "./audio/sounds.js";

export function startGroceryShift() {
  showNewCustomer();
  startNewCustomer();
  startTimer();
  updateScores();
  ruleBook.classList.add('hidden');
  console.log(gameState.customersToServe);
  passerByWrapper.style.visibility = 'hidden';
  
  streetSound.pause();
  streetSound.currentTime = 0;
  mainBgm.pause();
  mainBgm.currentTime = 0;
  
}

playAgainBtn.addEventListener('click', () => {
  playAgainBtn.style.visibility = 'hidden';
  startGroceryJobBtn.style.visibility = 'visible';
  
  Object.assign(gameState, {


    currentCustomerItems: [],
    scannedItems: [],
    totalPrice: 0,
    customersServed: 0,
    itemsBagged: 0,
    highScore: localStorage.getItem("highScorePerHour") || 0,
    jobSecurity: 50,
    salary: 1200,
    days: 1,
    accountBalance: 50,
    customersToServe: Math.floor(Math.random() * 11) + 20,
    totalGroceryLoss: 0,
    currentPaymentMethod: null,
    isCashPayment: false,
    customerCash: 0,
    changeGiven: false,
    currentCustomerImg: null,
    dailyTips: 0,
    unhappyCustomer: false,
    onBreak: false,
    isFired: false,
    shiftEnded: false,
    timeLeft: 480, // in minutes
    promotionMeter: 0,
    newGame: true,

  });
  prepareNextShift(); // reset core game state
});
