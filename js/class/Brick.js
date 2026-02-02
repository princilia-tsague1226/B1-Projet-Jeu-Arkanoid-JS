import {breakBrick, bounceBall} from "../functions/soundEffect.js";
import game from "../objects/game.js";


class Brick {
     constructor(x,y,width,heigth,health,color) {
          this._posX = x;
          this._posY = y;
          this._width = width;
          this._heigth = heigth;
          this.health = health;
          this._brickColor = ["#B8DBFF","#0B83F4","#053C70"]; // list of color who depend of the health of the brick
          this._colors = this._brickColor[color]; // take the color depend on the health
          
          this.isDestroyed = false;
          
          
          
     }
     
     
     // use to draw all the brick
     draw(ctx) {
          
          ctx.fillStyle = this._brickColor[this.health - 1];
          ctx.fillRect(this._posX, this._posY, this._width, this._heigth);
     }
     
     
     // use to check if the ball touch the brick and play the sound of the bounce
     isColliding(ball) {
          
          if (
               ball.x + ball.radius >= this._posX && 
               ball.x - ball.radius <= this._posX + this._width &&
               
               
               ball.y + ball.radius >= this._posY && 
               ball.y - ball.radius <= this._posY + this._heigth 
               
          ) {
               //play the sound of the bounce
               bounceBall();
               
               return true;
          } 
     }
     
     
     // remove 1 health of the brick and destroyed become true if health <= 0 play the sound of the breack
     handleCollision() {
          
               
               // remove 1 HP
               this.health--;
               
               // check if the brick has health left
               if (this.health <= 0) {
                    
                    // destroy the brick
                    this.isDestroyed = true;
                    
                    
                    // play the sound of the bounce
                    breakBrick();
                    
                    // add score for eac brick destroyed
                    game.playerScore += 10;
                    
               }
               

          
          
          
     }
     
}


// export to displayBrick.js
export default Brick;