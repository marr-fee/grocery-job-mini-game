
import { gameState } from "./gameState.js";
import { tipsJar, tipsDialogDiv } from "./domConstants.js";
import { tipsSound } from "./audio/sounds.js";

// ============= CHECK FOR TIP$ ===========

export function getsTip() {
  const possibleTips = [
    ...Array(53).fill(1),
    ...Array(33).fill(3),
    ...Array(10).fill(6),
    ...Array(3).fill(20),
    ...Array(1).fill(100)
  ]

  const coinToss = Math.random();

  if (coinToss < 0.7 ){
    return;
  }else if (gameState.unhappyCustomer === true){
    return;
  } else {
// Pick tips randomly from weighted array
  const customerTip = possibleTips[Math.floor(Math.random() * possibleTips.length)];
  gameState.dailyTips += customerTip;
  tipsJar.innerText = `$${gameState.dailyTips}`;

  tipsDialogDiv.style.display = 'flex';
  if (customerTip >= 20) {
    tipsDialogDiv.innerText = `🔥 You got a HUGE Tip: $${customerTip}! 🔥🤑`;
  } else{
    tipsDialogDiv.innerText = `You got a $${customerTip} Tip! 😀 Well Done!`;
  }
  
  tipsSound.currentTime = 0;
  tipsSound.play();
  
  setTimeout(()=>{
    tipsDialogDiv.style.display = 'none';
    tipsDialogDiv.innerText = '';
  }, 3000);
    
    
  }

  
}