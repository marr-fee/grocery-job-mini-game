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