import ball from '../objects/ball.js';
import { bounceBall } from "./soundEffect.js";
import paddle from '../objects/paddle.js';





const canvas = document.querySelector("canvas");

/**
 * check if th ball touche a brick anmake the ball bounce
 */
function collisionBrickBall(brick) {
     
     
     // check if the ball touch a brick
     if (brick.isColliding(ball)) {
          
          // check if the ball touch the bottom or top of a brick
          if (
               ball.y + ball.radius >= brick._posY && 
               ball.y - ball.radius <= brick._posY ||
               
               ball.y + ball.radius >= brick._posY + brick._heigth && 
               ball.y - ball.radius <= brick._posY + brick._heigth
               
               
               
          ) {
               // reverse its movement vertically
               ball.dy *= -1;
          }
          
          // check if the ball touch the side of a brick
          if (
               ball.x + ball.radius >= brick._posX && 
               ball.x - ball.radius <= brick._posX ||
               
               ball.x + ball.radius >= brick._posX + brick._width && 
               ball.x - ball.radius <= brick._posX + brick._width
               
               
          ) {
               // reverse its horizontal movement
               ball.dx *= -1;
          }
          
          
            // remove health from the brick and become destroyed if the health <= 0
            brick.handleCollision();

     }
     
     
}


/**
 * use by the ball to detecte a collision with a wall, the paddle
 */
function collisionPaddleWallBall() {
  // check if the ball touch a side wall
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {

    // to prevent the ball to be stuck
    if (ball.x + ball.radius > canvas.width) {

      //teleporte the ball inside the canvas
      ball.x = canvas.width - (ball.radius + 5);
    }


    // to prevent the ball to be stuck
    if (ball.x - ball.radius < 0) {

      //teleporte the ball inside the canvas
      ball.x = 0 + (ball.radius + 5);
    }


    // reverse its horizontal movement
    ball.dx *= -1;

    // make the bounce Sound
    bounceBall();
  }

  // check if the ball touch the roof
  if (ball.y - ball.radius < 0) {

    // to prevent the ball to be stuck
    if (ball.y - ball.radius < 0) {
      //teleporte the ball inside the canvas
      ball.y = 0 + (ball.radius + 5);
    }

    // reverse its movement vertically
    ball.dy *= -1;

    // make the bounce Sound
    bounceBall();
  }

  // check if the ball touch the paddle
  if (
    ball.y + ball.radius > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    // manage the speed and direction of the ball depend on the game level(for the speed) and the side of the paddle(for the speed and direction)
    const touche = (ball.x - paddle.x) / paddle.width - 0.5;
    ball.dx = touche *  10 + ((Math.random() - 0.5));
    ball.dy *= -1;
    bounceBall();
  }


}







// export to displayBrick and paddleAndBallMovement.js
export {collisionBrickBall, collisionPaddleWallBall};