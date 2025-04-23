import { startGroceryJobBtn, groceryBuilding, cashierJobCntr } from "./domConstants.js";
import { bgm } from "./audio/sounds.js";
import { startGroceryShift } from "./startShift.js";
import { gameState } from "./gameState.js";


if(gameState.isFired === true){
  startGroceryJobBtn.style.visibility = 'hidden';

} else{
  startGroceryJobBtn.style.visibility = 'visible';
  // document.querySelector('.passer-by-wrapper').style.visibility = 'visible';
}
startGroceryJobBtn.addEventListener('click', ()=>{
  groceryBuilding.style.display = 'none';
  cashierJobCntr.style.display = "flex";
  // document.querySelector('.passer-by-wrapper').style.visibility = 'hidden';

  startGroceryShift();
  // mapBtn.style.display = 'none';
  bgm.play();
})