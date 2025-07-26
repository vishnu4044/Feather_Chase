let game = document.getElementById('game');
let gunshot = document.getElementById('gunshot');
let scoreElem = document.getElementById('score');
let livesElem = document.getElementById('lives');
let leaderboardList = document.getElementById('leaderboardList');

let score = 0;
let lives = 5;
let player = '';

function startGame() {
  const bgm = document.getElementById('bgmusic');
  if (bgm) { bgm.play().catch(() => {}); }

  player = document.getElementById('playerName').value.trim();
  if (!player) {
    alert("Enter your name to start.");
    return;
  }
  score = 0;
  lives = 5;
  scoreElem.textContent = "Score: 0";
  livesElem.textContent = "Lives: 5";
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('leaderboard').classList.add('hidden');
  document.getElementById('about').classList.add('hidden');
  game.classList.remove('hidden');
  spawnDog();
  setTimeout(() => spawnDuck(), 2000);
}

function spawnDuck() {
  if (lives <= 0) return;

  const duck = document.createElement('div');
  duck.classList.add('duck');
  duck.style.left = `${Math.random() * 80 + 10}%`;

  const xOffset = (Math.random() - 0.5) * 300;
  const yHeight = Math.random() * 300 + 400;
  const flyTime = Math.random() * 2 + 4;

  duck.animate([
    { transform: 'translate(0, 0)', opacity: 1 },
    { transform: `translate(${xOffset}px, -${yHeight}px)`, opacity: 0 }
  ], {
    duration: flyTime * 1000,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  duck.addEventListener('click', e => {
    e.stopPropagation();
    gunshot.currentTime = 0;
    gunshot.play();
    duck.remove();
    score++;
    scoreElem.textContent = `Score: ${score}`;
    setTimeout(spawnDuck, 1500);
    spawnDog();
  });

  game.appendChild(duck);

  setTimeout(() => {
    if (duck.parentElement) {
      duck.remove();
      lives--;
      livesElem.textContent = `Lives: ${lives}`;
      if (lives > 0) setTimeout(spawnDuck, 2000);
      else endGame();
    }
  }, flyTime * 1000);
}

function spawnDog() {
  const dog = document.createElement('div');
  dog.classList.add('dog');
  game.appendChild(dog);
  setTimeout(() => dog.remove(), 3000);
}

function endGame() {
  game.classList.add('hidden');
  saveScore();
  showLeaderboard();
}

function saveScore() {
  const scores = JSON.parse(localStorage.getItem("featherchase_scores") || "[]");
  scores.push({ name: player, score });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("featherchase_scores", JSON.stringify(scores.slice(0, 10)));
}

function showLeaderboard() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('leaderboard').classList.remove('hidden');
  const scores = JSON.parse(localStorage.getItem("featherchase_scores") || "[]");
  leaderboardList.innerHTML = '';
  scores.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name}: ${s.score}`;
    leaderboardList.appendChild(li);
  });
}

function showAbout() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('about').classList.remove('hidden');
}

function goHome() {
  document.getElementById('menu').classList.remove('hidden');
  document.getElementById('leaderboard').classList.add('hidden');
  document.getElementById('about').classList.add('hidden');
}
