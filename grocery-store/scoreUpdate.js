import { customersDisplay, itemsBaggedDisplay, jobSecurityBar, highScoreDisplay } from "./domConstants.js";
import { gameState } from "./gameState.js";
  
  // --- UPDATE SCORES FUNCTION ---

export  function updateScores() {
    customersDisplay.textContent = gameState.customersServed;
    itemsBaggedDisplay.textContent = gameState.itemsBagged;
    let jobSecurityCount = gameState.jobSecurity

    if (gameState.jobSecurity <= 40) {
      jobSecurityBar.style.background = 'red';

    } else if (gameState.jobSecurity <= 60) {
      jobSecurityBar.style.background = 'orange';

    } else {
      jobSecurityBar.style.background = 'green';

    }
    if (gameState.jobSecurity < 0) {
      gameState.jobSecurity = 0;
    }
    if (gameState.jobSecurity > 100) {
      gameState.jobSecurity = 100;
    }
    jobSecurityBar.textContent = `Job Security: ${gameState.jobSecurity}%`;
    if (gameState.itemsBagged > gameState.highScore) {
      gameState.highScore = gameState.itemsBagged;
      localStorage.setItem("highScore", gameState.highScore);
      highScoreDisplay.textContent = gameState.highScore;
    }
  }