// scoreUpdate.js
import { customersDisplay, itemsBaggedDisplay, jobSecurityBar, highScoreDisplay } from "./domConstants.js";
import { gameState } from "./gameState.js";

export function updateScores() {
  customersDisplay.textContent = gameState.customersServed;
  itemsBaggedDisplay.textContent = gameState.itemsBagged;

  // Clamp jobSecurity before setting styles
  gameState.jobSecurity = Math.min(100, Math.max(0, gameState.jobSecurity));

  if (gameState.jobSecurity <= 40) {
    jobSecurityBar.style.background = 'red';
  } else if (gameState.jobSecurity <= 60) {
    jobSecurityBar.style.background = 'orange';
  } else {
    jobSecurityBar.style.background = 'green';
  }

  jobSecurityBar.textContent = `Job Security: ${gameState.jobSecurity}%`;

  if (gameState.itemsBagged > gameState.highScore) {
    gameState.highScore = gameState.itemsBagged;
    localStorage.setItem("highScore", gameState.highScore);
    highScoreDisplay.textContent = gameState.highScore;
  }

    if( gameState.unhappyCustomer){
    gameState.jobSecurity -= 1;
  }
}

export function calculateItemsBaggedPerHour() {
  const hoursWorked = (480 - gameState.timeLeft) / 60;
  const rawScore = hoursWorked > 0 ? gameState.itemsBagged / hoursWorked : 0;
  const score = Math.floor(rawScore); // ⬅️ Make it whole

  const highScore = parseInt(localStorage.getItem("highScorePerHour")) || 0;
  if (score > highScore) {
    localStorage.setItem("highScorePerHour", score);
    gameState.highScore = score;
  } else {
    gameState.highScore = highScore;
  }

  updateHighScoreDisplay();
  return score;
}

export function updateHighScoreDisplay() {
  highScoreDisplay.textContent = gameState.highScore;
}

