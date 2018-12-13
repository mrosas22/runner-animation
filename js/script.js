var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1050;
canvas.height = 350; 
document.body.appendChild(canvas);

function main() {

    update();
    requestAnimFrame(main);
};

function init() {
    terrainPattern = ctx.createPattern(resources.get('./images/terrain.png'), 'repeat');

    main();
}

resources.load([
    './images/commando.png',
    './images/terrain.png',
    './images/running.png'
]);
resources.onReady(init);

//global variables
var terrainPattern;

function SpriteSheet(path, frameWidth, frameHeight) {
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    // calculate the number of frames in a row after the image loads
    var self = this;
    this.image.onload = function() {
      self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
    };
   
    this.image.src = path;

}

function Animation(spritesheet, frameSpeed, startFrame, endFrame) {
 
    var animationSequence = [];  // array holding the order of the animation
    var currentFrame = 0;        // the current frame to draw
    var counter = 0;             // keep track of frame rate
   
    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
      animationSequence.push(frameNumber);
   
    // Update the animation
    this.update = function() {
   
      // update to the next frame if it is time
      if (counter == (frameSpeed - 1))
        currentFrame = (currentFrame + 1) % animationSequence.length;
   
      // update the counter
      counter = (counter + 1) % frameSpeed;
    };
   
    // draw the current frame
    this.draw = function(x, y) {
      // get the row and col of the frame
      var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
      var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
   
      ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight);
    };
  }

//CREATE PLAYER
spritesheet = new SpriteSheet('./images/running.png', 144, 194);
walk = new Animation(spritesheet, 10, 0, 5);

 //render the image
function update(){
    ctx.fillStyle = terrainPattern;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Updating the frame 
    walk.update();
    //Drawing the image 
    walk.draw(12.5, 12.5);
    // ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
}
// function moveRight(){
//     right = true; 
//    }
//  setInterval(draw, 120);