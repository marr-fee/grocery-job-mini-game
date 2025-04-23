

import { openRuleBookBtn, closeRuleBookBtn, ruleBook } from './domConstants.js';

openRuleBookBtn.addEventListener('click', () => {
  ruleBook.style.display = 'flex';
  
});

closeRuleBookBtn.addEventListener('click', () => {
  ruleBook.style.display = 'none';
});
