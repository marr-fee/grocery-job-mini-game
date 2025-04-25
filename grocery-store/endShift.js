import { bgm, levelCompleteSound, streetSound, mainBgm } from "./audio/sounds.js";
import { gameState } from "./gameState.js";
import { itemList } from "./data/items.js";
import { accountBalanceSpan, daySpan, endShiftBtn, endShiftPopup, endShiftSummary, firedSummary, playAgainBtn, startGroceryJobBtn, customerArea, passerByWrapper } from "./domConstants.js";
import { closeEndShiftPopUp } from "./utils.js";
import { resetValues, prepareNextShift} from "./resetValues.js";
import { updatePromotionMeter } from "./utils.js";
import { calculateItemsBaggedPerHour, updateHighScoreDisplay } from "./scoreUpdate.js";

// --- END SHIFT FUNCTION ---
export function endShift(timeEnded) {
  if (gameState.shiftEnded) return; // Prevent multiple calls
  gameState.shiftEnded = true;

  bgm.pause();
  bgm.currentTime = 0;

  // --- If Player Got Fired ---
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

    requestAnimationFrame(() => {
      endShiftPopup.style.display = 'flex';
    });

    firedSummary.onclick = (e) => {
      if (e.target.classList.contains('end-shift-summary-btn')) {
        closeEndShiftPopUp();
        passerByWrapper.style.visibility = 'visible';
        streetSound.currentTime = 0;
        streetSound.play();
        mainBgm.currentTime = 0;
        mainBgm.play();

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

  // --- Normal Shift End Summary ---
  let summaryText = `You served ${gameState.customersServed} customers and bagged ${gameState.itemsBagged} items.`;

  const itemsBaggedPerHour = calculateItemsBaggedPerHour();
  updateHighScoreDisplay();
  summaryText += `<br><strong>Items Bagged Per Hour:</strong> ${itemsBaggedPerHour}`;

  // --- Perfect Shift: All customers served before time ---
  if ((gameState.customersToServe - gameState.customersServed === 0) && !timeEnded) {
    levelCompleteSound.currentTime = 0;
    levelCompleteSound.play();
    gameState.jobSecurity += 5;

    summaryText += `<br><br>All customers served before time!<br>Job Security increased! ✔🎉<br>`;
    summaryText += `<br><br>Keep up the good work, big things await you! 👍<br>`;
    summaryText += `<br><strong>Today's Total Tips:</strong> $${gameState.dailyTips.toFixed(2)}<br>`;
    
    summaryText += `<br><button class="end-shift-summary-btn" style="margin: 10px auto 5px auto; color: white; font-size: 12px; padding: 5px 10px; text-align: center; background-color: blue;">CLOSE</button>`;
    endShiftSummary.innerHTML = summaryText;
    endShiftPopup.style.display = 'flex';

    endShiftSummary.onclick = (e) => {
      if (e.target.classList.contains('end-shift-summary-btn')) {
        closeEndShiftPopUp();
        passerByWrapper.style.visibility = 'visible';
        streetSound.currentTime = 0;
        streetSound.play();
        mainBgm.currentTime = 0;
        mainBgm.play();
        gameState.accountBalance += gameState.dailyTips;
        accountBalanceSpan.textContent = `$${gameState.accountBalance.toFixed(2)}`;
        daySpan.innerText = `${gameState.days}`;
        prepareNextShift();
      }
    };

    return;
  }

  // --- Incomplete Shift ---
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

  summaryText += `<br><strong>Today's Total Tips:</strong> $${gameState.dailyTips.toFixed(2)}<br>`;
  summaryText += `<button class="end-shift-summary-btn" style="margin: 10px auto 5px auto; color: white; font-size: 12px; padding: 5px 10px; text-align: center; background-color: blue;">
    CLOSE
  </button>`;

  endShiftSummary.innerHTML = summaryText;

  endShiftSummary.onclick = (e) => {
    if (e.target.classList.contains('end-shift-summary-btn')) {
      closeEndShiftPopUp();
      passerByWrapper.style.visibility = 'visible';
      streetSound.currentTime = 0;
      streetSound.play();
      mainBgm.currentTime = 0;
      mainBgm.play();
      gameState.accountBalance += gameState.dailyTips;
      accountBalanceSpan.textContent = `$${gameState.accountBalance.toFixed(2)}`;
      daySpan.innerText = `${gameState.days}`;
      prepareNextShift();
    }
  };

  requestAnimationFrame(() => {
    endShiftPopup.style.display = 'flex';
  });


  clampJobSecurity();
  updatePromotionMeter();
}


window.addEventListener('load', () => {
  endShiftBtn.addEventListener('click', () => {
    endShift(false);

  });
});

