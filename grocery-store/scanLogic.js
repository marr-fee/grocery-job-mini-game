// scanLogic.js
import { errorSound, scanSound } from "./audio/sounds.js";
import { scanBtn, groceryGridCntr, totalDisplay, treadmill } from "./domConstants.js";
import { showPopupMessage } from "./utils.js";
import { gameState } from "./gameState.js";
import { showPaymentMethodDialog } from "./paymentLogic.js";


scanBtn.addEventListener('click', () => {
  const selectedItem = document.querySelector('.grocery-item.selected');
  if (!selectedItem) {
    errorSound.currentTime = 0;
    errorSound.play();
    return showPopupMessage('Select an item to scan.', true);
  }

  const index = selectedItem.dataset.index;
  const item = gameState.currentCustomerItems[index];

  scanSound.playbackRate = 1.5;
  scanSound.currentTime = 0;
  scanSound.play();

  addToScannedItemsGrid(item);
  gameState.scannedItems.push(item);
  gameState.totalPrice += item.price;
  totalDisplay.textContent = `$${gameState.totalPrice.toFixed(2)}`;
  selectedItem.remove();

  // Boost customer patience slightly
  if (gameState.currentCustomerImg?.patience) {
    let patience = gameState.currentCustomerImg.patience;
    patience.set(patience.current() + 2);
  }

  if (treadmill.children.length === 0) {
    showPaymentMethodDialog();
  }
});

export function addToScannedItemsGrid(item) {
  const existingItems = [...groceryGridCntr.getElementsByClassName('scanned-items-grid-items')];
  let found = false;

  for (let div of existingItems) {
    const name = div.querySelector('.grocery-item').textContent;
    if (name === item.name) {
      const qtyElem = div.querySelector('.item-quantity');
      const costElem = div.querySelector('.item-cost');
      const newQty = parseInt(qtyElem.textContent) + 1;
      qtyElem.textContent = newQty;
      costElem.textContent = `$${(newQty * item.price).toFixed(2)}`;
      found = true;
      break;
    }
  }

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
