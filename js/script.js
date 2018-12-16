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
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
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
//Asset Loadject
resources.load([
    './images/commando.png',
    './images/terrain.png',
    './images/running.png'
]);
resources.onReady(init);

//global variables
let terrainPattern;

//A vector for a 2d space
function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
/**
 * Creates a Spritesheet
 * @param {string} - Path to the image.
 * @param {number} - Width (in px) of each frame.
 * @param {number} - Height (in px) of each frame.
 */
//Create spritesheet animation for main character
function SpriteSheet(path, frameWidth, frameHeight) {
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    // calculate the number of frames in a row after the image loads
    let self = this;
    this.image.onload = function() {
      self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
    };
    this.image.src = path;
}
//create an animation from a spritesheet
function Animation(spritesheet, frameSpeed, startFrame, endFrame) {
    let animationSequence = [];  // array holding the order of the animation
    let currentFrame = 0;        // the current frame to draw
    let counter = 0;             // keep track of frame rate
    // create the sequence of frame numbers for the animation
    for (let frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
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
        let row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
        let col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
        ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight);
    };
}

//CREATE PLAYER
function Player(x,y){
    this.width = 144;
    this.height = 194;
    this.sheet = new SpriteSheet('./images/running.png', this.width, this.height);
    this.walk = new Animation (this.sheet, 20, 0,5);
    this.anim = this.walk;
    Vector.call(this, x, y);
    this.draw = function(){
        this.anim.draw(this.x, this.y);
    };
    this.run = function(){
        this.anim.update(this.x, this.y);
    }
}
Player.prototype = Object.create(Vector.prototype);


// spritesheet = new SpriteSheet('./images/running.png', 144, 194);
// walk = new Animation(spritesheet, 20, 0, 1);

// Game state
let player = new Player(15, 15)



 //render the image
function update(){
    ctx.fillStyle = terrainPattern;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Updating the frame 
    player.run();
    //Drawing the image 
    player.draw();
    // ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
}

