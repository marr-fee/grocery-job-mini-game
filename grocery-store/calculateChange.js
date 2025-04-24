
import { manualTotalInput, amountPaidInput, changeOutput } from "./domConstants.js";
import { errorSound,  } from "./audio/sounds.js";
import { showPopupMessage } from "./utils.js";
import { gameState } from "./gameState.js";

document.getElementById('calculate-change').addEventListener('click', () => {
  const enteredTotal = parseFloat(manualTotalInput.value);
  const paid = parseFloat(amountPaidInput.value);
  if (isNaN(enteredTotal) || isNaN(paid)){
    errorSound.currentTime = 0;
    errorSound.play();
    showPopupMessage('Enter both total and amount paid.', true);
  
  } 
  if (Math.abs(enteredTotal - gameState.totalPrice) > 0.01){
    errorSound.currentTime = 0;
    errorSound.play();
    showPopupMessage('Entered total is incorrect!', true);
    return;
  } 
  if (paid < gameState.totalPrice){
    errorSound.currentTime = 0;
    errorSound.play();
    showPopupMessage('Not enough money!', true);
    return;
  } 
  const change = paid - gameState.totalPrice;
  changeOutput.textContent = change.toFixed(2);
});