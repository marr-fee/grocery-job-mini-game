

import { openRuleBookBtn, closeRuleBookBtn, ruleBook, book } from './domConstants.js';

openRuleBookBtn.addEventListener('click', () => {
  ruleBook.style.display = 'flex';
  setTimeout(() => book.classList.add("open"), 100);
  
});

closeRuleBookBtn.addEventListener('click', () => {
  book.classList.remove("open");
  setTimeout(() => ruleBook.style.display = "none", 1000);
});
