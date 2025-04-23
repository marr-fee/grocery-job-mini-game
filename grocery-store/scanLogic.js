


import { errorSound, scanSound } from "./audio/sounds.js";
import { scanBtn, groceryGridCntr, totalDisplay } from "./domConstants.js";
import { showPopupMessage } from "./utils.js";
import { gameState } from "./gameState.js";
import { treadmill } from "./domConstants.js";
import { showPaymentMethodDialog } from "./paymentLogic.js";

  // --- SCAN BUTTON CLICK ---

  scanBtn.addEventListener('click', () => {
    const selectedItem = document.querySelector('.grocery-item.selected');
    if (!selectedItem){
      errorSound.currentTime = 0;
      errorSound.play();
      return showPopupMessage('Select an item to scan.', true);
    } 
    
   
    // Assuming 'currentCustomerImg' is the currently active customer
    if (gameState.currentCustomerImg) {
      const patience = gameState.currentCustomerImg.patience;
      const newPatience = patience.current() + 1;  // Increase by 2 seconds
      patience.set(newPatience);  // Update the patience meter
    }

    const index = selectedItem.dataset.index;
    const item = gameState.currentCustomerItems[index];
    scanSound.playbackRate = 1.5;
    scanSound.currentTime = 0;
    scanSound.play();

    addToScannedItemsGrid(item);
    gameState.scannedItems.push(item);
    
    gameState.totalPrice += item.price;
    totalDisplay.textContent = gameState.totalPrice.toFixed(2);
    
    selectedItem.remove();

    // Show payment popup if this was the last item
    if (treadmill.childElementCount === 0) {
      showPaymentMethodDialog();
  }
  });


    // --- ADD ITEM TO GRID ---

   export function addToScannedItemsGrid(item) {
      const existingItems = Array.from(groceryGridCntr.getElementsByClassName('scanned-items-grid-items'));
      let found = false;
  
      existingItems.forEach((div, i) => {
        const name = div.querySelector('.grocery-item').textContent;
        if (name === item.name) {
          const qtyElem = div.querySelector('.item-quantity');
          const costElem = div.querySelector('.item-cost');
          const newQty = parseInt(qtyElem.textContent) + 1;
          qtyElem.textContent = newQty;
          costElem.textContent = `$${(newQty * item.price).toFixed(2)}`;
          found = true;
        }
      });
  
      if (!found) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'scanned-items-grid-items';
        const serialNum = groceryGridCntr.children.length + 1;
        itemDiv.innerHTML = `
          <p class="serial-num">${serialNum}</p>
          <p class="grocery-item">${item.name}</p>
          <p class="item-quantity">1</p>
          <p class="item-cost">$${item.price.toFixed(2)}</p>
        `;
        groceryGridCntr.appendChild(itemDiv);
      }
    }