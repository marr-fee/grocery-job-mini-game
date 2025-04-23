import { gameState } from "./gameState.js";
import { timerElem } from "./domConstants.js";
import { endShift } from "./endShift.js";

export function startTimer(){
  gameState.unhappyCustomer = false;
  gameState.timeLeft = 480; // in minutes

  const timerInterval = setInterval(() => {
    gameState.timeLeft--;
    const hours = Math.floor(gameState.timeLeft / 60);
    const minutes = gameState.timeLeft % 60;
    timerElem.textContent = `${hours}h ${minutes}`;

    if (gameState.timeLeft <= 0 || gameState.shiftEnded) {
      clearInterval(timerInterval);
      endShift(true);
    }
  }, 1000); // every geme minute

}