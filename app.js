// Constants ----------------------------------------------------------
const canvas = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const durationSelect = document.getElementById("duration-box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const accuracyEl = document.getElementById("accuracy");
const ctx = canvas.getContext("2d");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

const clickSound = new Audio("348163__djfroyd__laser-one-shot-2.wav");
const missSound = new Audio("he-is-blind.mp3");

const misinput = new Audio("miss-input.mp3");
const bruh = new Audio("movie_1.mp3");
const alright = new Audio("i-mean-its-alright-like.mp3");
const borat = new Audio("great-success-borat.mp3");
const woo = new Audio("moistcr1tikal-woooh-yeah-baby-meme-360p.mp3");
const goat = new Audio("thats-why-hes-the-goat.mp3");

// Variables ----------------------------------------------------------------
let targets = [];
let score = 0;
let time = 0;
let gameRunning = false;
let totalClicks = 0;
let successfulClicks = 0;
let accuracy;

// Functions ---------------------------------------------------------------

// Target Maker
function createTarget() {
  const size = Math.random() * 20 + 30;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  targets.push({ x, y, size });
}

// Draw targets
function drawTargets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  targets.forEach((target) => {
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.save();
    ctx.shadowColor = "rgba(226, 137, 77, 1)";
    ctx.shadowBlur = 20;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(114, 9, 9, 0.7)";
    ctx.stroke();
    ctx.closePath();
  });
}

// Handle clicks
function handleClick(event) {
  if (!gameRunning) return;

  totalClicks++;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let hit = false;

  for (let i = targets.length - 1; i >= 0; i--) {
    const target = targets[i];
    const distance = Math.sqrt(
      (mouseX - target.x) ** 2 + (mouseY - target.y) ** 2
    );

    if (distance < target.size / 2) {
      hit = true; // 
      score++;
      successfulClicks++;
      scoreEl.textContent = `Score: ${score}`;
      targets.splice(i, 1);
      createTarget();
      clickSound.currentTime = 0;
      clickSound.play();
      break;
    }
  }

  if (!hit) {
    missSound.currentTime = 0;
    missSound.play();
  }

  accuracy =
    totalClicks > 0 ? ((successfulClicks / totalClicks) * 100).toFixed(1) : 100;
  accuracyEl.textContent = `Accuracy: ${accuracy}%`;
}

// Start game
function startGame() {
  if (gameRunning) return;

  score = 0;
  time = parseInt(durationSelect.value);
  totalClicks = 0;
  successfulClicks = 0;

  accuracyEl.textContent = "Accuracy: 100%";
  scoreEl.textContent = `Score: ${score}`;
  timeEl.textContent = `Time: ${time}`;
  targets = [];

  for (let i = 0; i < 3; i++) createTarget();

  gameRunning = true;
  gameInterval = requestAnimationFrame(gameLoop);

  timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = `Time: ${time}`;
    if (time <= 0) endGame();
  }, 1000);
}

// End game
function endGame() {
  gameRunning = false;
  clearInterval(timerInterval);
  cancelAnimationFrame(gameInterval);
  timeEl.textContent = "Time: 0";

  let message = "";

  if (score <= 5 && accuracy < 50) {
    message = "Current Rank: Misinput";
    misinput.currentTime = 0;
    misinput.play();
  } else if (score <= 5) {
    message = "Current Rank: Bruh";
    bruh.currentTime = 0;
    bruh.play();
  } else if (score > 5 && score <= 10) {
    message = "Current Rank: Alright";
    alright.currentTime = 0;
    alright.play();
  } else if (score > 10 && score <= 15) {
    message = "Current Rank: Great Success";
    borat.currentTime = 0;
    borat.play();
  } else if (score > 15 && score <= 20) {
    message = "Current Rank: WOOO!";
    woo.currentTime = 0;
    woo.play();
  } else {
    message = "Current Rank: The GOAT!";
    goat.currentTime = 0;
    goat.play();
  }

  dialog.querySelector("p").textContent = message;
  dialog.showModal();
}

// Reset game
function resetGame() {
  gameRunning = false;
  clearInterval(timerInterval);
  cancelAnimationFrame(gameInterval);
  score = 0;
  targets = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  totalClicks = 0;
  successfulClicks = 0;
  accuracyEl.textContent = "Accuracy: 100%";
  scoreEl.textContent = "Score: 0";
  timeEl.textContent = "Time: 0";
}

// Game loop
function gameLoop() {
  if (gameRunning) {
    drawTargets();
    gameInterval = requestAnimationFrame(gameLoop);
  }
}

// Event listeners ----------------------------------------------------------
showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

canvas.addEventListener("click", handleClick);
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
