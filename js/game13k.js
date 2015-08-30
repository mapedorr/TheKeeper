window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
  var canvasElement = document.getElementById("canvas13K");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  var _game = new Game();
  _game.init();
}

var Game = function(){
  this.canvas = null;
  this.context = null;
  this.circles = [];
  this.mouseX = null;
  this.mouseY = null;
  this.currentGameState = 0;
  this.currentGameStateFunction = null;
};

Game.prototype.init = function(){
  var _me = this;
  this.canvas = document.getElementById('canvas13K');
  if(!this.canvas || !this.canvas.getContext){
    return;
  }

  // create the context for drawing elements on the canvas
  this.context = this.canvas.getContext('2d');

  // create the circle
  this.circles.push(new Circle(this.context,
    200,                            // radius
    this.canvas.width/2,            // center x
    this.canvas.height/2,           // center y
    0,                              // start ball movement angle
    {r: 255, g: 0, b: 0},           // path and ball color
    8,                              // path width
    2000                              // time for lap (in ms)
  ));

  // add mouse listeners
  this.canvas.addEventListener("click", function(e){
    _me.onMouseClick(e);
  }, false);
  // this.canvas.addEventListener("mousemove", function(e){
  //   _me.onMouseMove(e);
  // }, false);

  setInterval(function(){
    _me.drawScreen();
  }, 33);
};

Game.prototype.drawScreen = function(){
  // draw world
  this.context.fillStyle = '#FFFFFF';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // draw temperature indicator
  this.drawTemperatureIndicator();

  // draw the circles
  for(var i=0; i<this.circles.length; i++){
    this.circles[i].draw();
  }
};

Game.prototype.onMouseClick = function(e){
  // update the mouse position
  this.mouseX = e.clientX - this.canvas.offsetLeft;
  this.mouseY = e.clientY - this.canvas.offsetTop;

  // verify if the click occurs inside the path of any of the circles in the level
  for(var i=0; i<this.circles.length; i++){
    this.circles[i].checkClick(this.mouseX, this.mouseY);
  }
};

Game.prototype.drawTemperatureIndicator = function(){
  // draw background
  this.context.fillStyle = getRGBText({r:255,g:0,b:0});
  this.context.fillRect(0, this.canvas.height - 40, this.canvas.width, this.canvas.height);

  // draw text
  this.context.font = "40px Sans-serif";
  this.context.fillStyle = "#F0F0F0";
  var text = "1°C";
  var metrics = this.context.measureText(text);
  this.context.fillText(text, this.canvas.width/2 - metrics.width/2, this.canvas.height-5);
};