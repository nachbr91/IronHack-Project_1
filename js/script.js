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
      updateCanvas
      generateImages();
  }

  let backgroundImage = '';
//   let mainCharacterImage = "";

  const drawImages = (backgroundImage) => {
    ctx.drawImage(backgroundImage, 0, 0, 800, 500);
    // ctx.drawImage(mainCharacterImage, 20, 400, 50, 100);
  };

  const generateImages = () => {
    backgroundImage = new Image();

    backgroundImage.src = '../images/backgroundImg2.png';

    backgroundImage.onload = () => {
      counterForLoadedImages++;
      if (counterForLoadedImages === totalOfImages) {
        drawImages(backgroundImage);
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