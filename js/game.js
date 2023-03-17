function startGame() {
  // Hide title container and show canvas
  const titleContainer = document.querySelector('.title-container');
  const canvas = document.getElementById('game-canvas');
  titleContainer.style.display = 'none';
  canvas.style.display = 'block';

  // Play music
  const audio = new Audio('music/gameLevel.wav');
  audio.loop = true;
  audio.play();

  const gameOverSound = new Audio('music/planktonCollision.wav');

  let isAudioOn = true; // variable to track audio state
  
  // toggle audio state when 'm' key is pressed
  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyM') {
      if (isAudioOn) {
        audio.pause();
        gameOverSound.pause();
        isAudioOn = false;
      } else {
        audio.play();
        isAudioOn = true;
      }
    }
  });

  // Start the game
  initialize();
}


const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const image = new Image();
image.src = "images/sky.png";
image.onload = () => {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  context.font = "bold 48px Arial";
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.fillText("SNAIL LIFE", canvas.width / 2, canvas.height / 2);

};

const ctx = canvas.getContext("2d");

const heroImg = new Image();
heroImg.src = "images/HeroSnail.png";
heroImg.onload = function() {
  let heroX = 0;
  let heroY = canvas.height / 2;

  let canvasX = 0;
  const canvasWidth = canvas.width * 2;

  let isGoingUp = false;
  let isGoingDown = false;
  let isGameOver = false;
  let isPaused = false;
  let speed = 2;
  let score=0;
  let greenyFrequency = 0.02;
  //let planktonFrequency=0.007;
  //let lives=3;

 const obstacleImg = new Image();
  obstacleImg.src = "images/greeny.png";
  //let obstacleX = canvas.width;
  //let obstacleY = Math.floor(Math.random() * (canvas.height - obstacleImg.height));
 
  //const planktonImg = new Image();
//planktonImg.src = 'images/spikyT.png';


  const obstacles = [];
  //const enemies = [];

  //const woshellImg = new Image();
  //woshellImg.src = "images/woshell.png";

  //const livesImg = new Image();
  //livesImg.src = "images/lives.png";

 
  
function createObstacle() {
  const obstacle = {
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height - obstacleImg.height)),
  };
  obstacles.push(obstacle);
}
/*function createPlankton() {
  
  const plankton = {
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height - planktonImg.height)),
    speed: 2,
  };
  enemies.push(plankton);
}  */

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    ctx.drawImage(obstacleImg, obstacle.x, obstacle.y);
  }
}

/*function drawEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    ctx.drawImage(planktonImg, enemy.x, enemy.y);
  }
}*/

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.x -= 5;
    if (obstacle.x < -obstacleImg.width) {
      obstacles.splice(i, 1);
      i--;
    } else {
      // Check collision with hero
      const heroRadius = 75;
      const greenyRadius = 25;
      const dx = heroX + heroRadius - (obstacle.x + greenyRadius);
      const dy = heroY + heroRadius - (obstacle.y + greenyRadius);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < heroRadius + greenyRadius) {
        obstacles.splice(i, 1);
        i--;
        score += 10;
      }
    }
  }
  if (greenyFrequency > Math.random()) {
    createObstacle();
  }
}

/*function updateEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.x -= enemy.speed;
    if (enemy.x < -planktonImg.width) {
      enemies.splice(i, 1);
      i--;
      score += 5;
    } else {
      const heroRadius = 75;
      const enemyRadius = 75;
      const dx = heroX + heroRadius - (enemy.x + enemyRadius);
      let dy = heroY + heroRadius - (enemy.y + enemyRadius);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDy = canvas.height - heroRadius - enemyRadius;
      if (dy > maxDy) {
        dy = maxDy;
      } else if (dy < -maxDy) {
        dy = -maxDy;
      }
      if (distance < heroRadius + enemyRadius) {
        lives--;
        score -= 5;
        if (lives === 0) {
          isGameOver = true;
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          return;
        } else if (lives === 1) {
          alert("One life left");
        } else if (lives === 2) {
          alert("Two lives left");
        }
        updateLives();
        enemies.splice(i, 1);
        continue;
      }
      enemy.y += dy * 0.07;
      if (Math.random() < 0.005) {
        enemy.speed *= -1;
        dy = dy * -1;
      }
      ctx.drawImage(planktonImg, enemy.x, enemy.y);
    }
  }
  if (planktonFrequency > Math.random()) {
    createPlankton();
  }
}
*/

  
  
  
  function drawHero() {
    ctx.drawImage(heroImg, heroX, heroY, 175, 175);
  }
  
  /*function drawLives() {
    
    context.fillText("x " + lives, canvas.width - 95, 40);
  }
  
  function updateLives() {
    if (score > 0 && score % 50 === 0) {
      lives++;
      alert(`Two lives left. Your current score is ${score}`);
    }
    drawLives();
  }
  
  
  function draw() {
    if (isGameOver) {

     
       
    
        // Display game over screen and restart button
        const gameOverScreen = document.getElementById('game-over');
        const finalScore = document.getElementById('final-score');
        finalScore.textContent = score;
        gameOverScreen.style.display = 'block';
    
        const restartButton = document.getElementById('restart-btn');
        restartButton.style.display = 'block';
        restartButton.addEventListener('click', startGame);
    
        

    }
    drawHero();
    drawObstacles();
    updateObstacles();
    drawEnemies();
    updateEnemies();
    drawScore();
    drawLives();
    
  }

  
 function drawLives() {
    context.drawImage(livesImg, canvas.width - 130, 20, 25, 25);
    context.fillText("x " + lives, canvas.width - 95, 40);
  }

  function updateLives() {
    if (score % 50 === 0 && lives < 3) {
      lives++;

    }
  }
    */     
  function updateGame() {
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    context.drawImage(image, -canvasX, 0, canvasWidth, canvas.height);
    context.drawImage(image, canvasWidth - canvasX, 0, canvasWidth, canvas.height);

    // Draw hero
    drawHero();

    drawObstacles();

    updateObstacles();

    //drawEnemies();

    //updateEnemies();

    //drawLives();
    
    //updateLives();
    
    
    

//Draw Score
context.font = "bold 24px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign = "right";
    context.fillText(`Score: ${score}`, canvas.width - 20, canvas.height - 20);

    

    // Move hero
    if (isGoingUp) {
      heroY -= 5;
    } else if (isGoingDown) {
      heroY += 5;
    }

    // Keep hero within canvas
    if (heroY < 0) {
      heroY = 0;
    } else if (heroY > canvas.height - 100) {
      heroY = canvas.height - 100;
    }

    // Move canvas
    if (!isGameOver && !isPaused) {
      canvasX += speed;
      if (canvasX >= canvasWidth) {
        canvasX = 0;
      }
    }

    // Request next frame
    if (!isGameOver && !isPaused) {
      requestAnimationFrame(updateGame);
    }
  }

  // Handle key presses
  document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowUp") {
      isGoingUp = true;
    } else if (event.code === "ArrowDown") {
      isGoingDown = true;
    } else if (event.code === "KeyP") {
      if (isPaused) {
        isPaused = false;
        requestAnimationFrame(updateGame);
      } else {
        isPaused = true;
      }
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.code === "ArrowUp") {
      isGoingUp = false;
    } else if (event.code === "ArrowDown") {
      isGoingDown = false;
    }
  });

  // Start game loop
  requestAnimationFrame(updateGame)}