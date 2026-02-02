let game = {
     brickWidth:80,
     brickHeigth:30,
     canvasWidth:"800",
     canvasHeigth:"600",
     isGameStarted:false, // true if the game has started
     isGamePause:false, // true if the game is pause
     isGameOver:false, // true if the game is over
     isGameWin:false, // true if the player win
     playerScore:0, // the score of the player
     gameLevel:2 // the dificulty (1=easy, 2=normal 3=hard)
     
     
};


// export to displayBrick.js, Brick.js, paddleAndBallMovement.js, main.js and Ball.js
export default game;