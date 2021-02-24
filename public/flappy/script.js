document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');

  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 2;
  let isGameOver = false;
  const gap = 430;

  function startGame() {
    birdBottom -= gravity
    bird.style.bottom = `${birdBottom}px`;
    bird.style.left = `${birdLeft}px`;
  }
  const gameTimerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = `${birdBottom}px`;
    // eslint-disable-next-line no-console
    console.log(birdBottom);
  }

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  document.addEventListener('keyup', control);

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }

  function generateObstacle() {
    let obstacleLeft = 500;
    const randomHeight = Math.random() * 60;
    const obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = `${obstacleLeft}px`;
      topObstacle.style.left = `${obstacleLeft}px`;

      if (obstacleLeft === -60) {
        clearInterval();
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        // eslint-disable-next-line no-mixed-operators
        obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220
        // eslint-disable-next-line no-mixed-operators
        && (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 202)
        // eslint-disable-next-line no-mixed-operators
        || birdBottom === 0) {
        gameOver();
        // eslint-disable-next-line no-use-before-define
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }
  generateObstacle();
});