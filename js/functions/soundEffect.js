
/**
 * use to play the sound of a destoyed brick
 */
function breakBrick() {
     const breakBrickSound = new Audio("./assets/sounds/soundEffectBreak.mp3");
     
     // manage the volume
     breakBrickSound.volume = 1;
     
     //play the sound
     breakBrickSound.play();
}


/**
 * use to play the sound of the ball who bounce
 */
function bounceBall() {
     const bounceBallSound = new Audio("./assets/sounds/soundEffectBounce.mp3");
     
     // manage the volume
     bounceBallSound.volume = 0.3;
     
     //play the sound
     bounceBallSound.play();

     
     
}

// export to Brick.js and collision.js
export {bounceBall, breakBrick};




