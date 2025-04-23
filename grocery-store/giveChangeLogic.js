
import { giveChangeBtn, manualTotalInput, amountPaidInput, changeOutput } from "./domConstants.js";
import { gameState } from "./gameState.js";
import { showPopupMessage } from "./utils.js";
import { errorSound, successSound } from "./audio/sounds.js";
import { getsTip } from "./tipsLogic.js";
import { updateScores } from "./scoreUpdate.js";


  // --- GIVE CHANGE BUTTON ---

  giveChangeBtn.addEventListener('click', () => {
    const enteredTotal = parseFloat(manualTotalInput.value);
    const enteredPaid = parseFloat(amountPaidInput.value);

    if (isNaN(enteredTotal) || isNaN(enteredPaid)) {
      showPopupMessage('Enter valid numbers for total and amount paid.', true);
      errorSound.currentTime = 0;
      errorSound.play();
      return;
    }

    if (Math.abs(enteredTotal - gameState.totalPrice) > 0.01) {
      showPopupMessage('Entered total is incorrect!', true);
      errorSound.currentTime = 0;
      errorSound.play();
      return;
    }

    if (Math.abs(enteredPaid - gameState.customerCash) > 0.01) {
      showPopupMessage(`Customer gave $${gameState.customerCash}. You entered $${enteredPaid}.`);
      errorSound.currentTime = 0;
      errorSound.play();
      return;
    }

    if (enteredPaid < enteredTotal) {
      showPopupMessage('Not enough money!', true);
      errorSound.currentTime = 0;
      errorSound.play();
      return;
    }
    if (gameState.changeGiven){
      showPopupMessage('You already gave change!', true);
      errorSound.currentTime = 0;
      errorSound.play();
      return;
    }
    const change = enteredPaid - enteredTotal;
    changeOutput.textContent = change.toFixed(2);
    gameState.changeGiven = true;
    gameState.jobSecurity += 1;
    updateScores();
    getsTip();
    


    showPopupMessage(`Change given: $${change.toFixed(2)}`);
    successSound.playbackRate = 1.5;
    successSound.currentTime = 0;
    successSound.play();
  });