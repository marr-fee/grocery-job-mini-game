// paymentLogic.js
import { gameState } from "./gameState.js";
import { paymentMethodText, paymentMethodDialog } from "./domConstants.js";

export function showPaymentMethodDialog() {
  // Corrected probability: 50% card, 50% cash
  gameState.isCashPayment = Math.random() < 0.5 ? true : false;

  
  gameState.changeGiven = false;
  
  
  if (gameState.isCashPayment) {
    gameState.customerCash = (gameState.totalPrice + Math.random() * 10 + 1).toFixed(2);
    paymentMethodText.textContent = `Customer is paying with CASH: $${gameState.customerCash}`;
  } else {
    paymentMethodText.textContent = `Customer is paying with CARD. No change needed.`;
  }
  paymentMethodDialog.style.display = 'flex';
}
