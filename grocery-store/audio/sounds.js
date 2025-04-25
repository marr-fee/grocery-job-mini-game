// All sounds used in the game initialized with volume and preloaded

export const nextCustomerSound = new Audio('assets/sounds/supermarket-pa-104750.mp3');
nextCustomerSound.volume = 0.6;
nextCustomerSound.preload = "none";
nextCustomerSound.load();

export const scanSound = new Audio('assets/sounds/store-scanner-beep-90395.mp3');
scanSound.volume = 0.6;
scanSound.preload = "none";
scanSound.load();

export const successSound = new Audio('assets/sounds/cash-register-kaching-sound-effect-125042.mp3');
successSound.volume = 0.6;
successSound.preload = "none";
successSound.load();

export const errorSound = new Audio('assets/sounds/error-4-199275.mp3');
errorSound.volume = 0.6;
errorSound.preload = "none";
errorSound.load();

export const levelCompleteSound = new Audio('assets/sounds/level-up-4-243762.mp3');
levelCompleteSound.volume = 0.6;
levelCompleteSound.preload = "none";
levelCompleteSound.load();

export const streetSound = new Audio('assets/sounds/street-ambience.mp3');
streetSound.loop = true;
streetSound.volume = 0.3;
streetSound.preload = "none";
streetSound.load();

export const confirmPurchaseSound = new Audio('assets/sounds/confirm-purchase-sound.mp3');
confirmPurchaseSound.volume = 0.6;
confirmPurchaseSound.preload = "none";
confirmPurchaseSound.load();

export const tipsSound = new Audio('assets/sounds/level-up-bonus-sequence-2-186891.mp3');
tipsSound.volume = 0.6;
tipsSound.preload = "none";
tipsSound.load();

export const tipsHundredSound = new Audio('assets/sounds/hundred-sound.mp3');
tipsHundredSound.volume = 0.6;
tipsHundredSound.preload = "none";
tipsHundredSound.load();

export const bgm = new Audio('assets/sounds/game-music-loop-3-144252.mp3');
bgm.loop = true;
bgm.volume = 0.2;
bgm.preload = "none";
bgm.load();

export const mainBgm = new Audio('assets/sounds/main-sound.mp3');
mainBgm.loop = true;
mainBgm.volume = 0.2;
mainBgm.preload = "none";
mainBgm.load();
