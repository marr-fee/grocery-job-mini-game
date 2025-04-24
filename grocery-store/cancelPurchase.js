import { gameState } from "./gameState.js";
import { showPopupMessage } from "./utils.js";
import { errorSound } from "./audio/sounds.js";
import { customerLeaves, showNewCustomer, startNewCustomer } from "./customerSpawn.js";
import { endShift } from "./endShift.js";
import { updateScores } from "./scoreUpdate.js";
import { amountPaidInput } from "./domConstants.js";


document.getElementById('cancel-purchase').addEventListener('click', () => {
  const isCard = gameState.isCashPayment === false;

  const paid = parseFloat(amountPaidInput.value);
  const hasPaidEnough = !isNaN(paid) && paid >= gameState.totalPrice;

  if ((isCard || hasPaidEnough || gameState.changeGiven)) {
    if (!gameState.unhappyCustomer) {
      showPopupMessage('Customer left unhappy...', true);
      errorSound.currentTime = 0;
      errorSound.play();
      gameState.jobSecurity -= 1;
      gameState.unhappyCustomer = true;
      updateScores();
    }
  }

  customerLeaves(() => {
    if (gameState.jobSecurity <= 0) {
      showPopupMessage('You got fired! Game over.', true);
      errorSound.currentTime = 0;
      errorSound.play();
      endShift();
    } else {
      showNewCustomer();
      startNewCustomer();
    }
  });

 
});