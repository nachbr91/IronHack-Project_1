window.onload = () => {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  //VARIABLES
  const totalOfImages = 1;
  let counterForLoadedImages = 0;


  //EVENT LISTENERS
  document.getElementById('start-button').onclick = () => {
      startGame();
  };



  //FUNCTIONS

  const startGame = () => {
      updateCanvas()
      generateImages();
  }

  let backgroundImage = '';
  // let mainCharacterImage = '';

  const drawImages = (backgroundImage, mainCharacterImage) => {
    ctx.drawImage(backgroundImage, 0, 0, 800, 450);
    ctx.fillRect(20, 200, 50, 100) // Main character container test. It would be replaced by mainCharacterImg
  };

  const generateImages = () => {
    backgroundImage = new Image();

    backgroundImage.src = '../images/canvas_background.png';

    backgroundImage.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage, mainCharacterImage);

      }
    };
  };

  const updateCanvas = () => {
      if (counterForLoadedImages === totalOfImages) {
          drawImages(backgroundImage);
      }
      requestAnimationFrame(updateCanvas);
  }


};
