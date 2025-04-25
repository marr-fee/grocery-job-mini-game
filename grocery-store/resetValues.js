// resetLogic.js
import { showNewCustomer, startNewCustomer } from "./customerSpawn.js";
import { tipsDialogDiv, tipsJar, accountBalanceSpan, timerElem, totalDisplay, popupMessageElem , daySpan, customerArea} from "./domConstants.js";
import { gameState } from "./gameState.js";
import { updateScores } from "./scoreUpdate.js";


export function resetValues() {
  Object.assign(gameState, {
    currentCustomerItems: [],
    scannedItems: [],
    totalPrice: 0,
    customersServed: 0,
    itemsBagged: 0,
    unhappyCustomer: false,
    customersToServe: Math.floor(Math.random() * 11) + 20,
    totalGroceryLoss: 0,
    currentPaymentMethod: null,
    isCashPayment: false,
    customerCash: 0,
    changeGiven: false,
    dailyTips: 0,
    onBreak: false,
    shiftEnded: false,
    currentCustomerImg: null,
    timeLeft: 480, // Reset the clock to full shift
    newGame: false,
    jobSecurityDeducted: false,

  });
  
  gameState.accountBalance += gameState.dailyTips;
  accountBalanceSpan.textContent = `$${gameState.accountBalance.toFixed(2)}`;
  tipsJar.innerText = `$${gameState.dailyTips.toFixed(2)}`;
  timerElem.textContent = '8h 0m';
  gameState.currentCustomerImg = null; // Reset current customer image
  customerArea.innerHTML = ''; // Clear all customers from the area
  totalDisplay.textContent = '$0.00';
  daySpan.innerText = `${gameState.days}`;
}



export function prepareNextShift() {
  if (gameState.newGame){
    gameState.days += 0;
  } else{
    gameState.days += 1;
  }
  resetValues(); // reset core game state
    // Update UI elements
  updateScores();
}
