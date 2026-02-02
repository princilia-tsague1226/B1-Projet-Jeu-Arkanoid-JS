/*******************************************************************************
 ************************ ALL IMPORTS * *****************************************
 *******************************************************************************/

import paddle from '../objects/paddle.js';
import ball from '../objects/ball.js';
import {collisionPaddleWallBall} from "./collision.js";
import game from "../objects/game.js";

/*******************************************************************************
 ************************ ALL VARIABLE * *****************************************
 *******************************************************************************/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");




/*******************************************************************************
 ******************* *******************************************************************************/

/**
 * update the paddle and ball positions
 */
function animationBallAndPaddle() {
  if (game.isGamePause === false) {
    // update the paddle position
    paddle.update();
    
    // update the ball position
    ball.update();
    collisionPaddleWallBall();

  

  }
  // draw the ball and paddle at their current position
  drawBallAndPaddle();

}


/**
 * use to display the ball and paddle
 */
function drawBallAndPaddle() {
  paddle.draw(ctx);
  ball.draw(ctx);

}


// export to main.js
export {animationBallAndPaddle, drawBallAndPaddle};
