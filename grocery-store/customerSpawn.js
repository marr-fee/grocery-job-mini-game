import { gameState } from "./gameState.js";
import { treadmill, totalDisplay, changeOutput, amountPaidInput, manualTotalInput, groceryGridCntr, customerArea } from "./domConstants.js";
import { itemList } from "./data/items.js";
import { customerImages } from "./data/customers.js";

  // --- CUSTOMER SPAWN ---

export function startNewCustomer() {
    gameState.unhappyCustomer = false;
    gameState.changeGiven = false;
    gameState.customerCash = Math.floor(Math.random() * 100) + 1; // Random cash between $1 and $100
    gameState.currentPaymentMethod = null;
    gameState.isCashPayment = false;
    treadmill.innerHTML = '';
    gameState.scannedItems = [];
    gameState.totalPrice = 0;
    totalDisplay.textContent = '0.00';
    changeOutput.textContent = '0.00';
    amountPaidInput.value = '';
    manualTotalInput.value = '';
    groceryGridCntr.innerHTML = '';

    const itemCount = Math.floor(Math.random() * 30) + 1;
    gameState.currentCustomerItems = [];
    for (let i = 0; i < itemCount; i++) {
      const item = itemList[Math.floor(Math.random() * itemList.length)];
      gameState.currentCustomerItems.push(item);
    }

    gameState.currentCustomerItems.forEach((item, index) => {
      const itemElem = document.createElement('div');
      itemElem.classList.add('grocery-item');
      const itemImgElem = document.createElement('img');
      itemImgElem.classList.add('grocery-item-img');
      itemImgElem.src = item.image;
      itemElem.appendChild(itemImgElem);
      itemElem.dataset.index = index;
      itemElem.addEventListener('click', () => {
        document.querySelectorAll('.grocery-item').forEach(el => el.classList.remove('selected'));
        itemElem.classList.add('selected');
      });
      treadmill.appendChild(itemElem);
    });
  }



export // --- CUSTOMER SPAWN ---

function showNewCustomer() {
  if ( gameState.onBreak === true){
    return;
  }
  
  // Remove existing customer if any

  if (gameState.currentCustomerImg) {
    customerArea.removeChild(gameState.currentCustomerImg);
  }

  const img = document.createElement('img');
  img.src = customerImages[Math.floor(Math.random() * customerImages.length)];
  img.classList.add('customer');
  customerArea.appendChild(img);

  // Create the patience meter
  const patienceMeter = document.createElement('div');
  patienceMeter.classList.add('patience-meter');

  const fill = document.createElement('div');
  fill.classList.add('patience-fill');
  patienceMeter.appendChild(fill);

  const emoji = document.createElement('div');
  emoji.classList.add('patience-emoji');
  patienceMeter.appendChild(emoji);

  img.appendChild(patienceMeter);  // Attach the patience meter to the customer image

  const maxPatience = Math.floor(Math.random() * 11) + 15; // Random patience between 15 and 25
  let currentPatience = maxPatience;

  function updatePatienceBar() {
    const percent = currentPatience / maxPatience;
    fill.style.height = `${percent * 100}%`;

    // Change color based on remaining patience
    if (currentPatience > maxPatience * 0.5) {
      fill.style.backgroundColor = 'green';
    } else if (currentPatience > 5) {
      fill.style.backgroundColor = 'yellow';
    } else {
      fill.style.backgroundColor = 'red';
    }
  }

  updatePatienceBar();

  // Timer to reduce patience every second
  const patienceInterval = setInterval(() => {
    currentPatience--;
    
    if (currentPatience <= 0 && !gameState.unhappyCustomer) {
      currentPatience = 0;
      updatePatienceBar();
      clearInterval(patienceInterval);
      gameState.unhappyCustomer = true;
      gameState.jobSecurity -= 1; // Trigger job security decrease
    } else {
      updatePatienceBar();
      gameState.unhappyCustomer = false;
    }
  }, 1000);


  // Store the references in the image element
  img.patience = {
    max: maxPatience,
    current: () => currentPatience,
    set: (newVal) => {
      currentPatience = Math.max(0, Math.min(maxPatience, newVal)); // Ensure within bounds
      updatePatienceBar();
    },
    reward: () => {
      clearInterval(patienceInterval);
      emoji.textContent = '😊'; // Smiling emoji when sale is completed
      emoji.style.display = 'block';
    },
  };

  // Trigger walk-in animation
  requestAnimationFrame(() => {
    img.classList.add('entering');
  });

  gameState.currentCustomerImg = img;
}


 // --- CUSTOMER LEAVES FUNCTION ---

export function customerLeaves(callback) {
  if (!gameState.currentCustomerImg) return;

  gameState.currentCustomerImg.classList.remove('entering');
  gameState.currentCustomerImg.classList.add('leaving');

  // Wait for animation to finish before removing
  setTimeout(() => {
    if (gameState.currentCustomerImg && gameState.currentCustomerImg.parentNode) {
      customerArea.removeChild(gameState.currentCustomerImg);
    }
    gameState.currentCustomerImg = null;
    if (callback) callback(); // e.g., startNewCustomer()
  }, 1200); // match the transition duration
}
