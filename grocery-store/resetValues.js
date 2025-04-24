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
    timeLeft: 480 // Reset the clock to full shift
  });

  tipsJar.innerText = `$${gameState.dailyTips.toFixed(2)}`;
  timerElem.textContent = '8h 0m';
  gameState.currentCustomerImg = null; // Reset current customer image
  customerArea.innerHTML = ''; // Clear all customers from the area
}



export function prepareNextShift() {
  resetValues(); // reset core game state
  gameState.days += 1;
  daySpan.innerText = `${gameState.days}`;
  // Additional resets for UI & state not handled in resetValues
  gameState.shiftEnded = false;
  gameState.changeGiven = false;
  gameState.unhappyCustomer = false;
  gameState.totalGroceryLoss = 0;
  gameState.currentCustomerImg = null;

  // Update UI elements
  updateScores();
  showNewCustomer(); // Show a new customer
  startNewCustomer(); // Start a new customer
  timerElem.textContent = '8h 0m';
  totalDisplay.textContent = '$0.00';
  tipsJar.textContent = `$${gameState.dailyTips.toFixed(2)}`;
  popupMessageElem.textContent = ''; // clear popup

  // Optional: console.log to debug
  console.log("✔️ Shift prepped and reset.");
}
