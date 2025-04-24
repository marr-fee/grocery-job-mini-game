import { bgm } from "./audio/sounds.js";
import { endShiftSummary, popupMessageElem, endShiftPopup, groceryBuilding, cashierJobCntr, paymentMethodDialog } from "./domConstants.js";



export  function closeEndShiftPopUp(){
    endShiftSummary.innerHTML = '';
    endShiftPopup.style.display = 'none';
    popupMessageElem.style.display = 'none';
    groceryBuilding.style.display = 'flex';
    cashierJobCntr.style.display = "none";
    // document.querySelector('.passer-by-wrapper').style.visibility = 'visible';
    bgm.pause();
  };

// --- POPUP MESSAGE FUNCTION ---

export function showPopupMessage(message, isError) {
    popupMessageElem.textContent = message;
    popupMessageElem.style.color = isError ? 'red' : 'green';
    popupMessageElem.style.display = 'block'; // Ensure the popup is visible
    paymentMethodDialog.style.display = 'flex';
}


// Add the clamp function directly here
export function clampJobSecurity() {
  if (gameState.jobSecurity > 100) {
    gameState.jobSecurity = 100;
  } else if (gameState.jobSecurity < 0) {
    gameState.jobSecurity = 0;
  }
}

export function updatePromotionMeter() {
  if (gameState.jobSecurity >= 70) {
    gameState.promotionMeter += 1;

    if (gameState.promotionMeter === 30) {
      showPopupMessage(
        "You are doing such a great job, you are not far from a promotion!",
        false
      );
    } else if (gameState.promotionMeter === 50) {
      popupMessageElem.innerHTML = `
        <p>You have done such a great job so far and the owners would like to offer you a promotion to store manager and a 100% salary increase!</p>
        <button id="accept-promotion" style="background-color: blue; color: white; padding: 10px; margin: 5px;">Accept</button>
        <button id="decline-promotion" style="background-color: red; color: white; padding: 10px; margin: 5px;">Decline</button>
      `;
      popupMessageElem.style.display = "block";

      document.getElementById("decline-promotion").onclick = () => {
        popupMessageElem.style.display = "none";
        gameState.promotionMeter = 31; // Reset promotion meter to 31
      };

      // Leave the accept button event listener empty for now
      document.getElementById("accept-promotion").onclick = () => {
        // Placeholder for future logic
      };
    }
  }
}