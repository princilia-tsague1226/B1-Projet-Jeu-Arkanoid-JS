class Paddle {
     constructor(canvas) {

          this.width = 120;
          this.height = 15;
          this.x = canvas.width / 2 - this.width / 2;
          this.y = canvas.height - 30;
          
          // speed and direction of the paddle 
          this.speed = 10;
          this.moveLeft = false;
          this.moveRight = false;
          
          this.canvas = canvas;
          
     }
     
     // use to detecte the player key
     movePaddle() {
          // control the paddle with the keyboard
          document.addEventListener('keydown', e => {
               if (e.key === 'ArrowLeft') {this.moveLeft = true}
               if (e.key === 'ArrowRight') {this.moveRight = true}
          });
          
          document.addEventListener('keyup', e => {
               if (e.key === 'ArrowLeft') {this.moveLeft = false}
               if (e.key === 'ArrowRight') {this.moveRight = false}
          });
          
     }
     
     // use to move the paddle
     update() {
          // horizontal movement of the paddle
          if (this.moveLeft) {this.x -= this.speed}
          if (this.moveRight) {this.x += this.speed}
          
          // prevent to g ooutside the canvas
          this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x));
     }
     
     //draw the paddle
     draw(ctx) {
          
          ctx.fillStyle = '#5C8AFF';
          ctx.fillRect(this.x, this.y, this.width, this.height);
     }
}

// export to the object paddle.js
export default Paddle;
