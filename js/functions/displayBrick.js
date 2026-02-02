/*******************************************************************************
 ************************ ALL IMPORTS * *****************************************
 *******************************************************************************/

import Brick from "../class/Brick.js";
import game from "../objects/game.js";
import { collisionBrickBall } from "./collision.js";

/*******************************************************************************
 ************************ ALL VARIABLE * *****************************************
 *******************************************************************************/

// use to draw on the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// the list of bricks who is on the screen
let brickList = [];

// number of column and line of bricks (depend of the game level)
let bricksColumn = Math.floor(game.canvasWidth / (game.brickWidth + 8));
let bricksLine = 3 * game.gameLevel;

// the position of the 1st brick
let brickPosX = 22;
let brickPosY = 40;



/*******************************************************************************
 ************************ ALL FUNCTION * *****************************************
 *******************************************************************************/

/**
 * use to create the array of brick line by line
 */
function createBrick() {
     // reset the previous bricks
     brickList = [];
     bricksLine = 3 * game.gameLevel;
     brickPosX = 22;
     brickPosY = 40;
     
     
     //create bricks
     for (let i = 0; i < bricksLine; i++) {

          for (let n = 0; n < bricksColumn; n++) {
               // create a new brick with the position, size, health and color
               let newBrick = new Brick(brickPosX, brickPosY, game.brickWidth, game.brickHeigth, brickHealthProbabilities(game.gameLevel), brickHealthProbabilities(game.gameLevel) - 1);

               // change the position of the next brick to the right of the previous brick
               brickPosX += game.brickWidth + 4;

               // add the brick to the array
               brickList.push(newBrick);
          }

          // create a new line, so reset the x position
          brickPosX = 22;

          // change the position for all the next brick to be under the previous line
          brickPosY += game.brickHeigth + 3;
     }
}



/**
 * manage the health of each brick depending on the game level
 * @param {Number} the game level change the probabilities of the health of each brick
 */
function brickHealthProbabilities(gameLevel) {

     // random number for choose the health of a brick
     let healthProbabilities = Math.random();

     // choose the health of a brick depend on the random number and game level
     if (healthProbabilities <= 0.5 / gameLevel) {

          let brickHealth = 2;
          return brickHealth;

     }
     else if (healthProbabilities >= 0.75 / (gameLevel / 2)) {

          let brickHealth = 3;
          return brickHealth;

     }
     else { // if healthProbabilities is between 0.5 / gameLevel and 0.75 / (gameLevel / 2)

          let brickHealth = 1;
          return brickHealth;
     }
}

/**
 * check the number of brick left
 */
function numberOfBrickLeft() {
     return brickList.length;
}


/**
 * use to display bricks, who is not destroyed on the canvas
 */
function displayBrick() {


     for (let i = 0; i < brickList.length; i++) {

          // draw every brick in the array (brick who is not destroyed)
          brickList[i].draw(ctx);
          
          // manage the collision whith the ball
          collisionBrickBall(brickList[i]);
          
          
          // remove every destroyed brick from the array
          
     }
     
     // remove the destroyed bricks
     brickList = brickList.filter(brick => !brick.isDestroyed);


}





// export to main.js
export {displayBrick, createBrick, numberOfBrickLeft};
