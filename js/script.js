window.onload = () => {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  //VARIABLES
  const totalOfImages = 3; // Add +1 everytime I create a new character
  let counterForLoadedImages = 0;


  // CLASSES

  class MainCharacter {
    constructor() {
      this.x = 50;
      this.y = 200
      this.speedX = 0;
      this.speedY = 0;
      this.width = 80;
      this.height = 140;
    };
    updatePosition ()  {
      this.x += this.speedX;
      this.y += this.speedY;
    };

    checkForBoundries() {
      if  (this.x < -5) {
        this.x = -5;
      };
      if (this.x > 728) {
        this.x = 728;
      };
      if (this.y < 150 ) {
        this.y = 150;
      };
      if (this.y > 320) {
        this.y = 320;
      };
    };

  };

  class Enemy {
    constructor() {
      this.x = 800;
      this.y = Math.floor(Math.random() * 321); // Random 'y' position between 149 and 320
      this.speed = 0;
      this.width = 59;
      this.height = 119;
    };
    updatePosition()  {
      this.x -= this.speed;
    };

    checkForBoundries() {
      if (this.y < 150) {
        this.y = 150;
      };
      if (this.y > 320) {
        this.y = 320;
      };
    };
  };

  const mainCharacter = new MainCharacter(); // Create const of MainCharacter class
  const enemy = new Enemy(); // Create const of  Enemy class



  //EVENT LISTENERS
  document.getElementById('start-button').onclick = () => {
      startGame();
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      mainCharacter.speedX = 3;
    } else if (event.key === 'ArrowLeft') {
      mainCharacter.speedX = -3;
    } else if (event.key === 'ArrowUp') {
      mainCharacter.speedY = -3;
    } else if (event.key === 'ArrowDown') {
      mainCharacter.speedY = 3;
    };
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === ('ArrowRight') || event.key === ('ArrowLeft')) {
      mainCharacter.speedX = 0;
    } else if (event.key === 'ArrowUp' || event.key === ('ArrowDown')) {
      mainCharacter.speedY = 0;
    };
  });



  //FUNCTIONS

  const arrayOfEnemies = [];

  const startGame = () => {
      generateImages();
      updateCanvas();
      const createEnemies = setInterval(() => {
        arrayOfEnemies.push(new Enemy());
      }, 3000);
  };

  let backgroundImage = '';
  let mainCharacterImage = '';
  let enemyImg = '';

  const drawImages = (backgroundImage, mainCharacterImage) => {
    ctx.drawImage(backgroundImage, 0, 0, 800, 450);
    ctx.drawImage(mainCharacterImage, mainCharacter.x, mainCharacter.y, mainCharacter.width, mainCharacter.height);
  };

  const generateImages = () => {
    backgroundImage = new Image();
    mainCharacterImage = new Image();
    enemyImg = new Image();

    backgroundImage.src = '/images/canvas_background.png';
    mainCharacterImage.src = '/images/main_character_img/stand_1.png';
    enemyImg.src = '/images/enemy1_img/enemy1_1.png';

    backgroundImage.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage, enemyImg);
      };
    };

    mainCharacterImage.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage, enemyImg);
      };
    };

    enemyImg.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage, enemyImg);
      };
    };


  }

    const updateEnemyPosition = () => {
      arrayOfEnemies.forEach((enemy) => {
        enemy.speed = 0.7;
        enemy.x -= enemy.speed;
      });
    };

    const drawEnemies = () => {
      arrayOfEnemies.forEach((enemy) => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
      });
    };



  const updateCanvas = () => {
    mainCharacter.updatePosition();
    mainCharacter.checkForBoundries();
    enemy.updatePosition();
    enemy.checkForBoundries();
    if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage);
    };
    updateEnemyPosition();
    drawEnemies();
    requestAnimationFrame(updateCanvas);
  };


};
