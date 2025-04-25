

import { errorSound, nextCustomerSound, confirmPurchaseSound } from "./audio/sounds.js";
import { showPopupMessage } from "./utils.js";
import { paymentMethodDialog } from "./domConstants.js";
import { gameState } from "./gameState.js";
import { customerLeaves, startNewCustomer, showNewCustomer } from "./customerSpawn.js";
import { endShift } from "./endShift.js";
import { getsTip } from "./tipsLogic.js";
import { updateScores } from "./scoreUpdate.js";

 // --- CONFIRM AND CANCEL PURCHASE ---

document.getElementById('confirm-purchase').addEventListener('click', () => {

  if (gameState.scannedItems.length < gameState.currentCustomerItems.length) {
    errorSound.currentTime = 0;
    errorSound.play();
    showPopupMessage("You haven't scanned all the items!", true);
    return;
  }

  if (gameState.isCashPayment && !gameState.changeGiven) {
    showPopupMessage("Customer upset! You didn’t give them change.", true);
    errorSound.currentTime = 0;
    errorSound.play();
    gameState.unhappyCustomer = true;
    updateScores(); 
    return;
  }

  if (!gameState.isCashPayment && gameState.unhappyCustomer === false) {
    gameState.jobSecurity += 1;
    gameState.unhappyCustomer = false;
    getsTip();
  }
  
  paymentMethodDialog.style.display = 'none';
  gameState.itemsBagged += gameState.scannedItems.length;
  gameState.customersServed += 1;

  // Increase job security if customer patience is above 0
  if (gameState.currentCustomerImg && gameState.currentCustomerImg.patience.current() > 0) {
    gameState.jobSecurity += 1;
    gameState.unhappyCustomer = false;
  }

  // Update scores after incrementing itemsBagged and customersServed
  updateScores();
  confirmPurchaseSound.currentTime = 0;
  confirmPurchaseSound.play();

  

  customerLeaves(() => {
    if (gameState.customersToServe === 0) {
      endShift(false);
    } else {
      showNewCustomer();
      startNewCustomer();
      nextCustomerSound.currentTime = 0;
      nextCustomerSound.play()
      
      setTimeout(() => {
        nextCustomerSound.pause();
        nextCustomerSound.currentTime = 0; // reset so it can play again next time
      }, 1600);
    }
  });
  
});