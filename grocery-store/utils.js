

import { bgm } from "./audio/sounds.js";
import { endShiftSummary, popupMessageElem, endShiftPopup, groceryBuilding, cashierJobCntr, paymentMethodDialog } from "./domConstants.js";


export  function closeEndShiftPopUp(){
    endShiftSummary.innerHTML = '';
    endShiftPopup.style.display = 'none';
    popupMessageElem.style.display = 'none';
    groceryBuilding.style.display = 'flex';
    cashierJobCntr.style.display = "none";
    // document.querySelector('.passer-by-wrapper').style.visibility = 'visible';
    // mapBtn.style.display = 'flex';
    bgm.pause();
  };

// --- POPUP MESSAGE FUNCTION ---

export  function showPopupMessage(message, isError = false) {
    popupMessageElem.textContent = message;
    popupMessageElem.style.color = isError ? 'red' : 'green';
    paymentMethodDialog.style.display = 'flex';
}