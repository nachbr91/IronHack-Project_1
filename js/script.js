//VARIABLES ****************
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const totalOfImages = 3; // Add +1 everytime I create a new character
let counterForLoadedImages = 0;

const arrayOfEnemies = [];

let arrayOfCharacters = [];

let backgroundImage = "";
let mainCharacterImage = "";
let enemyImg = "";

let mainCharacter;

backgroundImage = new Image();
backgroundImage.src = "/images/canvas_background.png";

mainCharacterImage = new Image();
mainCharacterImage.src = "/images/main_character_img/stand_1.png";

enemyImg = new Image();
enemyImg.src = "/images/enemy1_img/enemy1_1.png";

// const drawImages = (backgroundImage, mainCharacterImage) => {
//   ctx.drawImage(backgroundImage, 0, 0, 800, 450);
//   ctx.drawImage(
//     mainCharacterImage,
//     mainCharacter.x,
//     mainCharacter.y,
//     mainCharacter.width,
//     mainCharacter.height
//   );
// };

//FUNCIONES ****************

const startGame = () => {
  // generateImages();
  createEnemies();

  updateCanvas();
};

// const generateImages = () => {
//   backgroundImage = new Image();
//   mainCharacterImage = new Image();
//   enemyImg = new Image();

//   backgroundImage.src = "/images/canvas_background.png";
//   mainCharacterImage.src = "/images/main_character_img/stand_1.png";
//   enemyImg.src = "/images/enemy1_img/enemy1_1.png";

//   backgroundImage.onload = () => {
//     counterForLoadedImages++;
//     if (counterForLoadedImages === totalOfImages) {
//       drawImages(backgroundImage, mainCharacterImage, enemyImg);
//     }
//   };

//   mainCharacterImage.onload = () => {
//     counterForLoadedImages++;
//     if (counterForLoadedImages === totalOfImages) {
//       drawImages(backgroundImage, mainCharacterImage, enemyImg);
//     }
//   };

//   enemyImg.onload = () => {
//     counterForLoadedImages++;
//     if (counterForLoadedImages === totalOfImages) {
//       drawImages(backgroundImage, mainCharacterImage, enemyImg);
//     }
//   };
// };

const createEnemies = () => {
  const createEnemy = setInterval(() => {
    arrayOfEnemies.push(new Enemy(enemyImg));
  }, 2500);
  // const createEnemies = setInterval(() => {
  //   arrayOfEnemies.push(new Enemy(enemyImg2));
  // }, 4500);
};

const updateEnemyPosition = () => {
  arrayOfEnemies.forEach((enemy) => {
    enemy.updatePosition();
  });
};

// const drawEnemies = () => {
//   arrayOfEnemies.forEach((enemy) => {
//     enemy.draw();
//   });
// };


// LOOP PRINCIPAL DE MI JUEGO ***************
const updateCanvas = () => {
  ctx.drawImage(backgroundImage, 0, 0, 800, 450); // pintar el background

  // mainCharacter.draw();
  // mainCharacter.updatePosition(); //update pos pj
  mainCharacter.checkForBoundries();

  // updateEnemyPosition();
  // drawEnemies();

  arrayOfCharacters = [...arrayOfEnemies, mainCharacter].sort((a,b) => a.y - b.y) // sort array, por altura de Y y los que estan mas abajo se le dice que pinte y pintara por orden
  arrayOfCharacters.forEach((character) => {
    character.draw()
    character.updatePosition()
  });

  // mainCharacter.checkForBoundries();
  // enemy.updatePosition();

  // if (counterForLoadedImages === totalOfImages) {
  //   drawImages(backgroundImage, mainCharacterImage);
  // }

  requestAnimationFrame(updateCanvas);
};

//CLASES *******************
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

class Enemy {
  constructor(image) {
    this.x = 800;
    this.y = Math.floor(Math.random() * 167) + 153; // Random 'y' position between 153 and 320
    this.speed = 1.5;
    this.width = 59;
    this.height = 119;
    this.image = image;
  }

  updatePosition() {
    this.x -= this.speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

//Array de enemigos + personaje



//  arrayOfCharacters.forEach((updatePosition) => {
//    if (mainCharacter.updatePosition()) {}
//  })


class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.width = 0;
    this.height = 0;
  }

  updatePosition() {
    this.x += this.speed;
  }
}

//EVENTOS - > window.onload
window.onload = () => {
  mainCharacter = new MainCharacter(); // Create const of MainCharacter class
  enemy = new Enemy();
  // const bullet = new Bullet(); // Create const of Bullet class

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
      // bullet.speed = 10;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      mainCharacter.stop("x");
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      mainCharacter.stop("y");
    } else if (event.key === 's') {
      // bullet.speed = 0;
    }
  });
};
