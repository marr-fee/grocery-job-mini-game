
import { gameState } from "./gameState.js";
import { paymentMethodText, paymentMethodDialog } from "./domConstants.js";

  // --- PAYMENT METHOD DIALOG ---

export  function showPaymentMethodDialog() {
    gameState.isCashPayment = Math.random() < 0.5 ? false : true; // 60% card, 40% cash
    gameState.changeGiven = false;
  
    if (gameState.isCashPayment) {
      gameState.customerCash = (gameState.totalPrice + Math.random() * 10 + 1).toFixed(2); // always overpay
      paymentMethodText.textContent = `Customer is paying with CASH: $${gameState.customerCash}`;
      paymentMethodDialog.style.display = 'flex';
    } else {
      paymentMethodText.textContent = `Customer is paying with CARD. No change needed.`;
      paymentMethodDialog.style.display = 'flex';
    }
  }
