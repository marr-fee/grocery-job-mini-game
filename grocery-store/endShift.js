import { bgm, levelCompleteSound } from "./audio/sounds.js";
import { gameState } from "./gameState.js";
import { itemList } from "./data/items.js";
import { accountBalanceSpan, daySpan, endShiftBtn, endShiftPopup, endShiftSummary, firedSummary, playAgainBtn, startGroceryJobBtn, customerArea } from "./domConstants.js";
import { closeEndShiftPopUp } from "./utils.js";
import { resetValues, prepareNextShift} from "./resetValues.js";

// --- END SHIFT FUNCTION ---
export function endShift(timeEnded) {
  if (gameState.shiftEnded) return; // Prevent multiple calls
  gameState.shiftEnded = true;

  bgm.pause();
  bgm.currentTime = 0;


  if (gameState.jobSecurity <= 0) {
    gameState.isFired = true;
    const unservedCount = gameState.customersToServe - gameState.customersServed;
    for (let i = 0; i < unservedCount; i++) {
      const itemCount = Math.floor(Math.random() * 30) + 1;
      for (let j = 0; j < itemCount; j++) {
        const item = itemList[Math.floor(Math.random() * itemList.length)];
        gameState.totalGroceryLoss += item.price;
      }
    }

    const firedLossRepayment = gameState.totalGroceryLoss * 0.10;
    firedSummary.innerHTML = `
      <strong>You've been FIRED! 😓</strong><br><br>
      Due to excessive losses, your employment has been terminated.<br>
      You are now required to repay 10% of the total Company loss.<br><br>
      <strong>Total Company Loss:</strong> $${gameState.totalGroceryLoss.toFixed(2)}<br>
      <strong>Amount to Repay:</strong> $${firedLossRepayment.toFixed(2)}<br><br>
      <button class="end-shift-summary-btn" style="margin: 10px auto 5px auto; color: white; font-size: 12px; padding: 5px 10px; text-align: center; background-color: red;">
        Accept Consequences
      </button>
    `;

    endShiftPopup.style.display = 'flex';
    firedSummary.onclick = (e) => {
      if (e.target.classList.contains('end-shift-summary-btn')) {
        closeEndShiftPopUp();
        startGroceryJobBtn.style.visibility = 'hidden';
        playAgainBtn.style.visibility = 'visible';
        gameState.accountBalance += gameState.dailyTips;
        gameState.accountBalance -= firedLossRepayment;
        accountBalanceSpan.textContent = `$${gameState.accountBalance.toFixed(2)}`;
        gameState.days = 1;
        daySpan.innerText = `${gameState.days}`;
        resetValues();
      }
    };

    return;
  }

  let summaryText = `You served ${gameState.customersServed} customers and bagged ${gameState.itemsBagged} items.`;

  if (gameState.customersServed >= gameState.customersToServe && !timeEnded) {
    levelCompleteSound.currentTime = 0;
    levelCompleteSound.play();
    gameState.jobSecurity += 5;
    summaryText += `<br><br>All customers served before time!<br>Job Security increased! 🎉`;
    // Directly display the end shift summary instead of calling endShift again
    endShiftSummary.innerHTML = summaryText;
    endShiftPopup.style.display = 'flex';
    return;
  } else {
    const unservedCount = gameState.customersToServe - gameState.customersServed;
    for (let i = 0; i < unservedCount; i++) {
      const itemCount = Math.floor(Math.random() * 30) + 1;
      for (let j = 0; j < itemCount; j++) {
        const item = itemList[Math.floor(Math.random() * itemList.length)];
        gameState.totalGroceryLoss += item.price;
      }
    }

    const lossPercent = 0.05 * gameState.totalGroceryLoss;
    gameState.salary -= lossPercent;
    gameState.jobSecurity -= 5;

    summaryText += timeEnded
      ? `<br><br>⏰ Time ran out! Some customers were left unserved.`
      : `<br><br>⚠️ You ended the shift early! Some customers were left unserved.`;

    summaryText += `<br><strong>Company LOSS:</strong> $${gameState.totalGroceryLoss.toFixed(2)}<br>`;
    summaryText += `5% of the LOSS will be deducted from your salary = $${lossPercent.toFixed(2)}<br>`;
    summaryText += `New Monthly Salary: $${gameState.salary.toFixed(2)}<br>`;
    summaryText += `Job Security decreased.`;
  }

  summaryText += `<br><strong>Today's Total Tips:</strong> $${gameState.dailyTips.toFixed(2)}<br>`;
  summaryText += `<br><strong>Job Security:</strong> ${gameState.jobSecurity}%<br>`;
  summaryText += `<button class="end-shift-summary-btn" style="margin: 10px auto 5px auto; color: white; font-size: 12px; padding: 5px 10px; text-align: center; background-color: blue;">
    CLOSE
  </button>`;

  endShiftSummary.innerHTML = summaryText;
  endShiftPopup.style.display = 'flex';

  endShiftSummary.onclick = (e) => {
    if (e.target.classList.contains('end-shift-summary-btn')) {
      closeEndShiftPopUp();
      gameState.accountBalance += gameState.dailyTips;
      accountBalanceSpan.textContent = `$${gameState.accountBalance.toFixed(2)}`;
      daySpan.innerText = `${gameState.days}`;
      prepareNextShift();
    }
  };
  
}

window.addEventListener('load', () => {
  endShiftBtn.addEventListener('click', () => {
    endShift(false);
  });
});

