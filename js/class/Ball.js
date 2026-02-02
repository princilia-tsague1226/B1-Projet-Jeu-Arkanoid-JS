import game from "../objects/game.js";


class Ball {
  constructor(canvas) {
    
    this.radius = 8;
    this.x = canvas.width / 2;
    this.y = canvas.height - 45;
    
    // initiale speed depend on the game level
    this.dx = 0 + (Math.random() - 0.5);
    this.dy = 2 + game.gameLevel * 3;
    
    
  }
  
  // use to change the position of the ball (create mouvement)
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
  
  
  // use to draw the ball
  draw(ctx) {
    
    //draw ball 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD166';
    ctx.fill();
    ctx.closePath();
  }
  
  // check if the ball touch the bottom of the canvas
  isBallBottom(canvas) {
    
    if (this.y + this.radius >= canvas.height) {
      return true;
    }
    
  }
  
  
  
}

// export to the object ball.js
export default Ball;