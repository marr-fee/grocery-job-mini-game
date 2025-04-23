import { bgm, levelCompleteSound } from "./audio/sounds.js";
import { gameState } from "./gameState.js";
import { itemList } from "./data/items.js";
import { accountBalanceSpan, daySpan, endShiftBtn, endShiftPopup, endShiftSummary, firedSummary, playAgainBtn, startGroceryJobBtn, customerArea } from "./domConstants.js";
import { closeEndShiftPopUp } from "./utils.js";
import { resetValues } from "./resetValues.js";

// --- END SHIFT FUNCTION ---
export function endShift(timeEnded) {
  bgm.pause();
  bgm.currentTime = 0;
  gameState.days += 1;
  

  // === HANDLE FIRING SCENARIO FIRST ===
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
    const firedText = `
      <strong>You've been FIRED! 😓</strong><br><br>
      Due to excessive losses, your employment has been terminated.<br>
      You are now required to repay 10% of the total Company loss.<br><br>
      <strong>Total Company Loss:</strong> $${gameState.totalGroceryLoss.toFixed(2)}<br>
      <strong>Amount to Repay:</strong> $${firedLossRepayment.toFixed(2)}<br><br>
      <button class="end-shift-summary-btn" style="margin: 10px auto 5px auto; color: white; font-size: 12px; padding: 5px 10px; text-align: center; background-color: red;">
        Accept Consequences
      </button>
    `;

    firedSummary.innerHTML = firedText;
    endShiftPopup.style.display = 'flex';

    firedSummary.addEventListener('click', (e) => {
      if (e.target.classList.contains('end-shift-summary-btn')) {
        closeEndShiftPopUp();
        startGroceryJobBtn.style.visibility = 'hidden';
        playAgainBtn.style.visibility = 'visible';
        gameState.accountBalance += gameState.dailyTips;
        gameState.accountBalance -= firedLossRepayment;

        accountBalanceSpan.textContent = `$${gameState.accountBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        gameState.days = 1;
        daySpan.innerText = `${gameState.days}`;
        gameState.shiftEnded = true;
        firedSummary.innerHTML = '';
        resetValues();
      }

    });

    return; // exit early if fired
  }

  // === NORMAL END SHIFT SUMMARY ===
  let summaryText = `You served ${gameState.customersServed} customers and bagged ${gameState.itemsBagged} items.`;

  // === Case 1: All customers served before time ends ===
  if (gameState.customersServed >= gameState.customersToServe && timeEnded === false) {
    levelCompleteSound.currentTime = 0;
    levelCompleteSound.play();
    gameState.jobSecurity += 5;
    summaryText += `<br><br>All customers served before time!<br>Job Security increased! 🎉`;
    summaryText += `<br><strong>Today's Total Tips:</strong> $${gameState.dailyTips.toFixed(2)}<br>`;
    summaryText += `<strong>Job Security:</strong> ${gameState.jobSecurity}<br>`;
  }

  // === Case 2 & 3: Early end or timeout with customers left ===
  else {
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

    if (timeEnded) {
      summaryText += `<br><br>⏰ Time ran out! Some customers were left unserved.`;
    } else {
      summaryText += `<br><br>⚠️ You ended the shift early! Some customers were left unserved.`;
    }

    summaryText += `<br><strong>Company LOSS:</strong> $${gameState.totalGroceryLoss.toFixed(2)}<br>`;
    summaryText += `5% of the LOSS will be deducted from your salary = $${lossPercent.toFixed(2)}<br>`;
    summaryText += `New Monthly Salary: $${gameState.salary.toFixed(2)}<br>`;
    summaryText += `Job Security decreased.`;
    summaryText += `<br><strong>Today's Total Tips:</strong> $${gameState.dailyTips.toFixed(2)}<br>`;
    summaryText += `<br><strong>Job Security:</strong> ${gameState.jobSecurity}<br>`;

  }

  summaryText += `<button class="end-shift-summary-btn" style="margin: 10px auto 5px auto; color: white; font-size: 12px; padding: 5px 10px; text-align: center; background-color: blue;">
    CLOSE
  </button>`;

  endShiftSummary.innerHTML = summaryText;
  endShiftPopup.style.display = 'flex';

  endShiftSummary.addEventListener('click', (e) => {
    if (e.target.classList.contains('end-shift-summary-btn')) {
      closeEndShiftPopUp();
      gameState.accountBalance += gameState.dailyTips;
      accountBalanceSpan.textContent = `$${gameState.accountBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
      daySpan.innerText = `${gameState.days}`;

      gameState.shiftEnded = true;
      resetValues();

      if (gameState.days > 30){
        gameState.accountBalance += gameState.salary;
        accountBalanceSpan.textContent = `$${gameState.accountBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        gameState.salary = 1200;
        gameState.days = 1;
      }

    }
  });

  
}

endShiftBtn.addEventListener('click', () => {
  endShift(false);
});
