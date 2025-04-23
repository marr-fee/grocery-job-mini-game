import { tipsDialogDiv, tipsJar } from "./domConstants.js";
import { gameState } from "./gameState.js";

export function resetValues() {
  
  gameState.currentCustomerItems = [],
  gameState.scannedItems = [],
  gameState.totalPrice = 0,
  gameState.customersServed = 0;
  gameState.itemsBagged = 0;
  gameState.isFired = false;
  gameState.unhappyCustomer = false;
  gameState.highScore = parseInt(localStorage.getItem("highScore")) || 0;
  gameState.customersToServe = Math.floor(Math.random() * 11) + 20,
  gameState.totalGroceryLoss = 0,
  gameState.currentPaymentMethod = null,
  gameState.isCashPayment = false,
  gameState.customerCash = 0,
  gameState.changeGiven = false,
  gameState.dailyTips = 0,
  gameState.onBreak = false,
  gameState.shiftEnded = false,
  tipsDialogDiv.innerText = '';
  tipsJar.innerText = `$${gameState.dailyTips}`;

  gameState.timeLeft = 480; 
}

