window.onload = () => {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  //VARIABLES
  const totalOfImages = 2;
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
    }

    updatePosition ()  {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  const mainCharacter = new MainCharacter(); // Create const of MainCharacter class



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

  const startGame = () => {
      generateImages();
      updateCanvas()
  };

  let backgroundImage = '';
  let mainCharacterImage = '';

  const drawImages = (backgroundImage, mainCharacterImage) => {
    ctx.drawImage(backgroundImage, 0, 0, 800, 450);
    ctx.drawImage(mainCharacterImage, mainCharacter.x, mainCharacter.y, mainCharacter.width, mainCharacter.height);
  };

  const generateImages = () => {
    backgroundImage = new Image();
    mainCharacterImage = new Image();

    backgroundImage.src = '../images/canvas_background.png';
    mainCharacterImage.src = '/images/main_character_img/stand_1.png';

    backgroundImage.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage);
      };
    };

    mainCharacterImage.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage);
      };
    };

  };

  const updateCanvas = () => {
    mainCharacter.updatePosition();
    if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage);
    }
    requestAnimationFrame(updateCanvas);
  };


};
