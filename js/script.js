//VARIABLES ****************

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let arrayOfEnemies = [];
let arrayOfCharacters = [];

let arrayOfBullets = [];

let backgroundImage = "";
let mainCharacterImage = "";
let enemyImg = "";
let bulletImage = "";

let mainCharacter;
let enemy;

let score = 0;

backgroundImage = new Image();
backgroundImage.src = "/images/canvas_background.png";

mainCharacterImage = new Image();
mainCharacterImage.src = "/images/main_character_img/stand_1.png";

enemyImg = new Image();
enemyImg.src = "/images/enemy1_img/enemy1_1.png";

bulletImage = new Image();
bulletImage.src = "/images/bullet.png";

endGame = false;

//FUNCIONES ****************

const startGame = () => {
  // generateImages();
  createEnemies();
  updateCanvas();
};

const createEnemies = () => {
  const createEnemy = setInterval(() => {
    arrayOfEnemies.push(new Enemy(enemyImg));
  }, 1500);
};

const updateEnemyPosition = () => {
  arrayOfEnemies.forEach((enemy) => {
    enemy.updatePosition();
  });
};

const deleteEnemies = () => {
  arrayOfEnemies = arrayOfEnemies.filter((enemy) => {
    return !enemy.toDelete;
  });
};

const updateBulletPosition = () => {
  arrayOfBullets.forEach((bullet) => {
    bullet.updatePosition();
  });
};

const deleteBullet = () => {
  arrayOfBullets = arrayOfBullets.filter((bullet) => {
    return !bullet.toDelete;
  });
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, 800, 450);
};

const drawGameOver = () => {
  clearCanvas();
  ctx.fillStyle = "white";
  ctx.font = "100px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", 400, 225);
};

const drawScore = () => {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center'
  ctx.fillText('Score:' + score, 650, 80);
}

// MAIN LOOP OF THE VIDEO GAME ***************

const updateCanvas = () => {
  if (!endGame) {
    ctx.drawImage(backgroundImage, 0, 0, 800, 450); // draw background

    arrayOfCharacters = [...arrayOfEnemies, mainCharacter].sort(
      (a, b) => a.y - b.y
    ); // sort array, por altura de Y y los que estan mas abajo se le dice que pinte y pintara por orden

    arrayOfCharacters.forEach((character) => {
      character.draw();
      character.updatePosition();
    });

    arrayOfBullets.forEach((bullet) => {
      bullet.draw();
      bullet.updatePosition();
    });

    arrayOfBullets.forEach((bullet) => {
      arrayOfEnemies.forEach((enemy) => {
        bullet.checkBulletCollision(enemy);
      });
    });

    mainCharacter.checkForBoundries();

    enemy.checkMainCharacterCollision();

    deleteEnemies();

    deleteBullet();

    drawScore();

    requestAnimationFrame(updateCanvas);
  } else {
    drawGameOver();
  }
};

//CLASSES *******************

class MainCharacter {
  constructor() {
    this.x = 50;
    this.y = 200;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 80;
    this.height = 140;
  }

  moveLeft() {
    if (this.x >= -5) {
      this.speedX = -3;
    } else {
      this.speedX = 0;
    }
  }

  moveRight() {
    if (this.x < 728) {
      this.speedX = 3;
    } else {
      this.speedX = 0;
    }
  }

  moveUp() {
    if (this.y > 150) {
      this.speedY = -3;
    }
  }

  moveDown() {
    if (this.y < 320) {
      this.speedY = 3;
    }
  }

  stop(direction) {
    if (direction === "y") {
      this.speedY = 0;
    } else {
      this.speedX = 0;
    }
  }

  draw() {
    ctx.drawImage(mainCharacterImage, this.x, this.y, this.width, this.height);
  }

  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  checkForBoundries() {
    if (this.x < -5) {
      this.x = -5;
    } else if (this.x > 728) {
      this.x = 728;
    } else if (this.y < 150) {
      this.y = 150;
    } else if (this.y > 320) {
      this.y = 320;
    }
  }
}
mainCharacter = new MainCharacter(); // Create const of MainCharacter class

class Enemy {
  constructor(image) {
    this.x = 800;
    this.y = Math.floor(Math.random() * 167) + 153; // Random 'y' position between 153 and 320
    this.speed = Math.floor(Math.random() * 5) + 2;
    this.width = 59;
    this.height = 119;
    this.image = image;
    this.toDelete = false;
  }

  updatePosition() {
    this.x -= this.speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkMainCharacterCollision() {
    arrayOfEnemies.forEach((enemy) => {
      if (
        enemy.x + 40 < mainCharacter.x + mainCharacter.width &&
        enemy.x + enemy.width > mainCharacter.x + 80 &&
        enemy.y + 120 < mainCharacter.y + mainCharacter.height &&
        enemy.height + enemy.y > mainCharacter.y + 125
      ) {
        // deadSound.play
        endGame = true;
      }
    });
  }
}
enemy = new Enemy();

class Bullet {
  constructor() {
    this.x = mainCharacter.x;
    this.y = mainCharacter.y + 50;
    this.speed = 10;
    this.width = 20;
    this.height = 30;
    this.toDelete = false;
  }

  updatePosition() {
    this.x += this.speed;
    if (this.x > 800 && this.y > 450) {
      this.toDelete = true;
    }
  }

  draw() {
    arrayOfBullets.forEach((bullet) => {
      ctx.drawImage(bulletImage, this.x, this.y, this.width, this.height);
    });
  }

  checkBulletCollision(enemy) {
    if (
      this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x &&
      this.y < enemy.y + enemy.height &&
      this.height + this.y > enemy.y
    ) {
      enemy.toDelete = true;
      this.toDelete = true;
      score++;
      // document.getElementById("score.counter").innerText = score;
      // console.log(score);
    }
  }
}

//EVENT LISTENERS - > window.onload

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      mainCharacter.moveRight();
    } else if (event.key === "ArrowLeft") {
      mainCharacter.moveLeft();
    } else if (event.key === "ArrowUp") {
      mainCharacter.moveUp();
    } else if (event.key === "ArrowDown") {
      mainCharacter.moveDown();
    } else if (event.key === "s") {
      arrayOfBullets.push(new Bullet());
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      mainCharacter.stop("x");
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      mainCharacter.stop("y");
    }
  });
};
