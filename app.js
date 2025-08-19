// Constants ----------------------------------------------------------
const canvas = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const durationSelect = document.getElementById("duration-box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const ctx = canvas.getContext("2d");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

//Variables ----------------------------------------------------------------
let targets = [];
let score = 0;
let time = 10;
let gameState;
let timerState;
let gameRunning = false;

//Funcitons ---------------------------------------------------------------
//Target Maker
function createTarget() {
  const size = Math.random() * 20 + 30;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  targets.push({ x, y, size });
}
//Put Target on Screen / remove them

function drawTargets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  targets.forEach((target) => {
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  });
}

//5 Clicks
       //When game is running, clicked targets ++ score
       //Make clickable area
       //Make targets disappear when clicked?


//Game operations
//1 Start
       //Start timer
       //Score = 0
       //Change gameRunning to true




//4 Reset
       //Return game to original state
      


//3 End
       //When game running && timer = 0, display score and rank
       // Set gameRunning to false



//2 Game loop
       //If game running, draw dots

//Event listeners ----------------------------------------------------------

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
