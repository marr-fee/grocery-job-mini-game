
import { showNewCustomer, startNewCustomer } from "./customerSpawn.js";
import { startTimer } from "./timeLogic.js";
import { gameState } from "./gameState.js";
import { playAgainBtn, popupMessageElem, startGroceryJobBtn, timerElem, tipsJar, totalDisplay, ruleBook } from "./domConstants.js";
import { updateScores } from "./scoreUpdate.js";
import { addToScannedItemsGrid } from "./scanLogic.js";


export function startGroceryShift() {

  showNewCustomer();
  startNewCustomer();
  startTimer();
  updateScores(); 
  ruleBook.style.display = 'none'; // Hide the rule book when starting a new shift  
}

playAgainBtn.addEventListener('click', () => {
  playAgainBtn.style.visibility = 'hidden';
  startGroceryJobBtn.style.visibility = 'visible';

  //  reset all gameplay variables
  gameState.isFired = false;
  gameState.currentCustomerItems = [];
  gameState.scannedItems = [];
  gameState.totalPrice = 0;
  gameState.customersServed = 0;
  gameState.itemsBagged = 0;
  gameState.highScore = localStorage.getItem("highScore") || 0;
  gameState.jobSecurity = 50;
  gameState.salary = 1200;
  gameState.customersToServe = Math.floor(Math.random() * 11) + 20;
  gameState.totalGroceryLoss = 0;
  gameState.currentPaymentMethod = null;
  gameState.isCashPayment = false;
  gameState.customerCash = 0;
  gameState.changeGiven = false;
  gameState.currentCustomerImg = null;
  gameState.dailyTips = 0;
  gameState.unhappyCustomer = false;
  gameState.onBreak = false;
  gameState.isFired = false;
  gameState.accountBalance = 50;
  gameState.days = 1;

  updateScores();

  timerElem.textContent = '8h 0m'; 
  // Reset total price display
  totalDisplay.textContent = '$0.00';
  // Reset tips jar display
  tipsJar.textContent = '';
  // Clear popup messages
  popupMessageElem.textContent = '';
 ruleBook.classList.add('hidden');
});


