
import Ball from '../class/Ball.js';

const canvas = document.querySelector("canvas");

// create the object ball
let ball = new Ball(canvas);

// export to paddleAndBallMovement.js, collision.js and main.js
export default ball;

