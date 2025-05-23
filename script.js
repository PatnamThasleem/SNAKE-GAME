  //Game Constants
const foodSound = new Audio('music/food.mp3'); // Sound on eating food
const gameOverSound = new Audio('music/gameover.mp3'); // Sound on game over
const moveSound = new Audio('music/move.mp3'); // Sound on movement
const musicSound = new Audio('music/music.mp3'); // Background music
  let inputDir = { x: 0, y: 0 };// initial direction 
  let speed = 10;
  let score = 0;
  let lastPaintTime = 0;
  let snakeArr = [{ x: 13, y: 15 }];
  let food = { x: 6, y: 7 };


  //main Function imp
  function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
      return;
    }
    lastPaintTime = ctime;
    gameEngine();
  }


  //to check for collisions
  function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
      return true;
    }

  }

  

  //Game Logic 
  function gameEngine() {


    scoreBox.innerHTML = "Score: " + score;//Update Score
    if (isCollide(snakeArr)) {
      gameOverSound.play();
      musicSound.pause();
      inputDir = { x: 0, y: 0 };
      alert("Game Over");
      musicSound.play();
      snakeArr = [{ x: 13, y: 15 }];
      score = 0;

    }
    
    //Food eating food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
      score += 1;//Score = score+1;
      foodSound.play();
      scoreBox.innerHTML = "Score: " + score;//Update Score

      //Adds new head next to food
      snakeArr.unshift({
        x: snakeArr[0].x + inputDir.x,
        y: snakeArr[0].y + inputDir.y
      });

      //Generate food at random location
      let a = 2;
      let b = 16;
      food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random())
      }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };
    }

    //update head's position
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
      snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if (index === 0) {
        snakeElement.classList.add('head');
      }
      else {
        snakeElement.classList.add('snake');

      }
      board.appendChild(snakeElement);
    });

    //to display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
  }

  musicSound.play();

  window.requestAnimationFrame(main);

  window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();

    switch (e.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
      case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
      default:
        break;
    }
  })
