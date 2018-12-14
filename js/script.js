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
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
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
let terrainPattern;



  function SpriteSheet(path, spriteWidth, spriteHeight) {
    //the with and height of our spritesheet
    this.spriteWidth = spriteWidth; 
    this.spriteHeight = spriteHeight; 

    this.image = new Image();
    // calculate the number of frames in a row after the image loads
    // var self = this;
    this.image.onload = function() {
    //   self.framesPerRow = (self.image.width / self.frameWidth);
    };
   
    this.image.src = path;
  }

  function Animation(spritesheet, speed, curFrame, frameCount) {

    //we are having two rows and 8 cols in the current sprite sheet
    let rows = 1; 
    let cols = 6; 
    let width = spritesheet.spriteWidth/cols; 
    //Same for the height we divided the height with number of rows 
    let height = spritesheet.spriteHeight/rows;
   
    //x and y coordinates to render the sprite 
    let x=0;
    let y=0; 
    //x and y coordinates of the canvas to get the single frame 
    let srcX=0; 
    let srcY=0; 
    //Assuming that at start the character will move right side 
    // let left = false; 
    let right = true;
    this.update = function() {
        curFrame = ++curFrame % frameCount; 
        srcX = curFrame * width; 
        ctx.clearRect(x,y,width,height);	
        if(right && x < canvas.width - width){
            // srcY = trackRight * height; 
            x += speed; 
        }
    };
    this.draw = function(){
        ctx.drawImage(spritesheet.image,srcX,srcY, width,height,x,y,width,height)
    }
   
  }


spritesheet = new SpriteSheet('./images/running.png', 997, 206);
walk = new Animation(spritesheet, 10, 0, 5);

// Game state
// let player = new Player(15, 15)



 //render the image
function update(){
    ctx.fillStyle = terrainPattern;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Updating the frame 
    // player.run();
    // walk.update();
    //Drawing the image 
    // player.draw();
    walk.draw();
    // ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
}

function moveRight(){
    right = true; 
   }