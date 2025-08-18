// Constants ----------------------------------------------------------
const screen = document.getElementById("game-screen");
const startBtn = document.getElementById("Start");
const resetBtn = document.getElementById("Reset");
const durationSelect = document.getElementById("Duration");

//Variables ----------------------------------------------------------------
let targets = [];
let score = 0;
let time = 30;

//Funcitons ---------------------------------------------------------------
function createTarget() {
  const size = Math.random() * 20 + 30; 
  const x = Math.random() * (screen.width - size);
  const y = Math.random() * (screen.height - size);
  targets.push({ x, y, size });
}

// Targets
//Clicks
//Game operations
    //Start
    //Reset
    //End

//Event listeners ----------------------------------------------------------    
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});