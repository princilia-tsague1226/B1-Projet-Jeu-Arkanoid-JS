/*******************************************************************************
 ************************ ALL IMPORTS * *****************************************
 *******************************************************************************/

import {displayBrick, createBrick, numberOfBrickLeft} from "./functions/displayBrick.js";
import { animationBallAndPaddle, drawBallAndPaddle } from "./functions/paddleAndBallMovement.js";
import game from "./objects/game.js";
import ball from "./objects/ball.js";
import paddle from "./objects/paddle.js";

/*******************************************************************************
 ************************ ALL VARIABLE * *****************************************
 *******************************************************************************/
 
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// selecte the difficulty button
const difficultyButton = document.querySelectorAll("button");



// use to start the game ( press enter )
const gameStartReady = (e) => {
     if (e.key === "Enter" && !game.isGameStarted) {
          document.removeEventListener("keydown", gameStartReady);
          game.isGameStarted = true;
          game.isGamePause = false;
          startCountdown();
          
          difficultyChoice();
          
          displayBrick();
          
          // start the game
          gameLoop();
     }
};

/*******************************************************************************
 *************************** EXECUTED CODE * ***********************************
 *******************************************************************************/
 
 
// change the canvas width and heigth with the width and heigth in game.js
canvas.width = game.canvasWidth;
canvas.height = game.canvasHeigth;

// draw the instruction on the refresh page
drawInstructions();


// use to start the game when press enter 
document.addEventListener("keydown", gameStartReady);


// use to pause/resume the game
document.addEventListener("keydown", (e) => {

     if (!game.isGameStarted) return;
     if (game.isCountdown) return;

     if (e.key === " ") {

          // Game countdown
          if (game.isGamePause && !game.isGameOver) {
               startCountdown();
          }
          // Game is pause
          else if (!game.isGamePause) {
               game.isGamePause = true;
          }
     }
});

// detecte the retry button
canvas.addEventListener("click", (e) => {
    //check the position of the mouse (offset is to make the x=0 and y=0 in the top left corner of the canvas) minus the coordonate of the rect
   const MouseCheckX = e.offsetX;
   const MouseCheckY = e.offsetY;
   // check if the mouse is inside a the hitbox (a square zone aroud the circle) of the rect
   if ((game.isGameOver || game.isGameWin) &&
       MouseCheckX <= 440 && MouseCheckX >= 340 &&
       MouseCheckY <= 440 && MouseCheckY >= 390
   ) 
   {
          reset();
          displayBrick();
          // draw the border of the canvas
          ctx.strokeStyle = "#0049FC";
          ctx.lineWidth = 10;
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
          
   }
});


// use to create the basic of the game like brick ball and paddle (not display)
gameBase();





/*******************************************************************************
 ************************ ALL FUNCTION * *****************************************
 *******************************************************************************/



/********************************* GAME FUNCTION ******************************************


/**
 * use to display the instruction to play on the refresh page
 */
function drawInstructions() {
     
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     
     // display background
     ctx.fillStyle = "rgba(0,0,0,0.7)";
     ctx.fillRect(0, 0, canvas.width, canvas.height);

     // display title
     ctx.fillStyle = "#00BFFF";
     ctx.font = "bold 40px Verdana";
     ctx.textAlign = "center";
     ctx.fillText("ARKANOID", canvas.width / 2, 120);

     // display controle
     ctx.fillStyle = "white";
     ctx.font = "20px Verdana";

     ctx.fillText("← : déplacer le plateau vers la gauche.", canvas.width / 2, 220);
     ctx.fillText("→ : déplacer le plateau vers la doite.", canvas.width / 2, 260);
     ctx.fillText("La touche ESPACE : sert de pause / reprise du jeu.", canvas.width / 2, 300);
     ctx.fillText("Si la balle touche le mur du bas le jeu se termine.", canvas.width / 2, 340);

     // display how to start
     ctx.fillStyle = "#00BFFF";
     ctx.font = "bold 24px Verdana";
     ctx.fillText("Appuyez sur la touche ENTRÉE pour commencer le jeu", canvas.width / 2, 420);
     
     ctx.fillStyle = "#00FF7F";
     ctx.font = "bold 40px Verdana";
     ctx.fillText("BONNE CHANCE !", canvas.width / 2, 490);
}


/**
 * use for the start of the game
 */
function gameBase() {
     // create the bricks
     createBrick();
     
     // display the ball and the paddle
     drawBallAndPaddle();
     
     
     
     // draw the border of the canvas
     ctx.strokeStyle = "#0049FC";
     ctx.lineWidth = 10;
     ctx.strokeRect(0, 0, canvas.width, canvas.height);
     
     // draw on the refresh page
     paddle.draw(ctx);
     ball.draw(ctx);
     paddle.movePaddle();
     
}


/**
 * use to animate the game and chack if it win, loose or pause
 */
function gameLoop() {

     // reset the canvas
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     // draw the border of the canvas
     ctx.strokeStyle = "#0049FC";
     ctx.lineWidth = 10;
     ctx.strokeRect(0, 0, canvas.width, canvas.height);
     
     //stop the all if the game pause
     if (!game.isGamePause) {
          // animate the ball and paddle
          animationBallAndPaddle();
     }

     // display the paddle and ball at their new place each frame
     drawBallAndPaddle();
     
     // display the score
     displayScore();
     
     if(game.isGameStarted) {
          // display the brick who still have health
          displayBrick();
     }   
     
     // update every thing each frame
     requestAnimationFrame(gameLoop);
     
     
     // display pause logo
     if (game.isGamePause && !game.isCountdown) {
          
          // red circle
          ctx.beginPath();
          ctx.fillStyle = "#FF5733";
          ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.closePath();
          
          // pause logo
          ctx.fillStyle = "white";
          ctx.fillRect(405, 270, 10, 35);
          ctx.fillRect(385, 270, 10, 35);
          
          
          // text PAUSE
          ctx.font = "bold 20px Verdana";
          ctx.textAlign = "center";
          ctx.fillText("PAUSE", 398, 330);
     }
     
     // display countdown
     if (game.isCountdown) {
          
          // display background
          ctx.fillStyle = "rgba(0,0,0,0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // display countdown
          ctx.fillStyle = "white";
          ctx.font = "bold 80px Verdana";
          ctx.textAlign = "center";
          if (game.countdownValue > 0) {
               ctx.fillText(game.countdownValue, canvas.width / 2, canvas.height / 2);
          } else {
               ctx.fillText("GO!", canvas.width / 2, canvas.height / 2);
          }
     }
          
     
     
     // check if the ball touch the botom
     if(ball.isBallBottom(canvas)){
          
          gameOver();
          displayScore();
          
    }
    
    // check if the player win
    if (numberOfBrickLeft() === 0 ) {
         gameWin();
         displayScore();
    }
    
    
}




/********************************* END GAME ******************************************




/**
 * display the game over screen
 */
function gameOver(){
     
     // stop the game 
     game.isGamePause = true;
     game.isGameOver = true;
     
     cancelAnimationFrame(gameLoop);
     ctx.clearRect(0,0,canvas.width,canvas.height);
     ctx.fillStyle = "black";
     ctx.fillRect(0,0, canvas.width, canvas.height);
     ctx.fillStyle = "red";
     
     // Ecrire du texte
     ctx.font = "bold 50px Verdana";
     ctx.textAlign = "center";
     
     // Permet d'écrire
     ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
     ctx.fillStyle = "gray";
     ctx.fillRect(340,390, 100, 50);
     ctx.strokeStyle = "red";
     ctx.strokeRect(340,390, 100, 50);
     ctx.lineWidth = 2;
     ctx.fillStyle = "red";
     ctx.font = "15px Verdana";
     ctx.fillText("Try again?", 390, 420);
     
}


/**
 * display the game win screen
 */
function gameWin(){
     
     console.log("game Win");
     game.isGamePause = true;
     game.isGameWin = true;
     
     cancelAnimationFrame(gameLoop);
     ctx.clearRect(0,0,canvas.width,canvas.height);
     ctx.fillStyle = "#0F1220";
     ctx.fillRect(0,0, canvas.width, canvas.height);
     ctx.fillStyle = "green";
     
     // Ecrire du texte
     ctx.font = "bold 50px Verdana";
     ctx.textAlign = "center";
     
     // Permet d'écrire
     ctx.fillText("GAME WIN", canvas.width / 2, canvas.height / 2);
     ctx.fillStyle = "#FCFEFD";
     ctx.fillRect(340,390, 100, 50);
     ctx.strokeStyle = "green";
     ctx.strokeRect(340,390, 100, 50);
     ctx.lineWidth = 2;
     ctx.fillStyle = "green";
     ctx.font = "15px Verdana";
     ctx.fillText("Play again?", 390, 420);
     
}







/********************************* ADDITION FUNCTION ******************************************


/**
 * use to start a countdown before teh game start
 */
function startCountdown() {
     
     game.isCountdown = true;
     game.isGamePause = true;
     game.countdownValue = 3;
     
     game.countdownInterval = setInterval(() => {

          game.countdownValue--;

          if (game.countdownValue < 0) {
               clearInterval(game.countdownInterval);
               game.countdownInterval = null;
               game.isCountdown = false;
               game.isGamePause = false;
          }

     }, 1000);
}


/**
 * us to display the score of the player
 */
function displayScore() {
     ctx.font = "bold 25px Verdana";
     ctx.textAlign = "center";
     ctx.beginPath();
     ctx.fillStyle = "red";
     ctx.lineWidth = 2;
     
     ctx.fillText("Score : " + game.playerScore, canvas.width - 90 , 30);
}


/**
 * reset the game 
 */
function reset() {
     
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     game.isGameWin = false;
     game.isGameOver = false;
     game.isGamePause = true;
     game.playerScore = 0;

     
     createBrick();
     
     ball.x = canvas.width / 2;
     ball.y = canvas.height - 45;
     ball.dx = 0 + (Math.random() - 0.5);
     ball.dy = 2 + game.gameLevel * 3;

     
     
     paddle.x = canvas.width / 2 - paddle.width / 2;
     paddle.y = canvas.height - 30;

     
     
}


/**
 * manage the difficulty choice of the player
 * (when button is clicked player need to click somewhere else on the screen)
 */
function difficultyChoice() {
     
     for (let i = 0; i < difficultyButton.length; i++) {
          
          
          // detect the click on a button and change the difficulty
          difficultyButton[i].addEventListener("click", (e) => {
               e.preventDefault();
               game.gameLevel = i + 1;
               console.log(game.gameLevel);
               reset();
               difficultyButton.forEach(Button => Button.classList.remove("current-difficulty"));
               difficultyButton[i].classList.add("current-difficulty");
               
          });
     }
     
}






