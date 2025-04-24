// paymentLogic.js
import { gameState } from "./gameState.js";
import { paymentMethodText, paymentMethodDialog } from "./domConstants.js";

export function showPaymentMethodDialog() {
  // Corrected probability: 60% card, 40% cash
  gameState.isCashPayment = Math.random() < 0.4;
  gameState.changeGiven = false;

  if (gameState.isCashPayment) {
    gameState.customerCash = (gameState.totalPrice + Math.random() * 10 + 1).toFixed(2);
    paymentMethodText.textContent = `Customer is paying with CASH: $${gameState.customerCash}`;
  } else {
    paymentMethodText.textContent = `Customer is paying with CARD. No change needed.`;
  }
  paymentMethodDialog.style.display = 'flex';
}
