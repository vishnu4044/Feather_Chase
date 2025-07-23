const game = document.getElementById('game');
const scoreboard = document.getElementById('scoreboard');
const gunshot = document.getElementById('gunshot');
let score = 0;

function createRandomFlyAnimation(duck) {
  const flyTime = Math.random() * 2 + 4; // 4-6 seconds
  const xOffset = (Math.random() - 0.5) * 300; // -150 to 150 px
  const yHeight = Math.random() * 300 + 400; // 400-700 px

  duck.animate([
    { transform: 'translate(0, 0)', opacity: 1 },
    { transform: `translate(${xOffset}px, -${yHeight}px)`, opacity: 0 }
  ], {
    duration: flyTime * 1000,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  setTimeout(() => {
    if (duck.parentElement) {
      duck.remove();
      setTimeout(spawnDuck, 1500);
    }
  }, flyTime * 1000);
}

function spawnDuck() {
  const duck = document.createElement('div');
  duck.classList.add('duck');
  duck.style.left = `${Math.random() * 80 + 10}%`;

  duck.addEventListener('click', e => {
    e.stopPropagation();
    gunshot.currentTime = 0;
    gunshot.play();
    duck.remove();
    score++;
    scoreboard.textContent = `Score: ${score}`;
    setTimeout(spawnDuck, 2000);
    spawnDog();
  });

  game.appendChild(duck);
  createRandomFlyAnimation(duck);
}

function spawnDog() {
  const dog = document.createElement('div');
  dog.classList.add('dog');
  game.appendChild(dog);
  setTimeout(() => dog.remove(), 3000);
}

// Start
spawnDog();
setTimeout(() => {
  for (let i = 0; i < 2; i++) {
    setTimeout(spawnDuck, i * 4000);
  }
}, 3000);
