window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
  var canvasElement = document.getElementById("canvas13K");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  var _game = new Game();
  _game.init();
}

var TEST_STATE = 0;
var START_STATE = 1;

var Game = function(){
  this.canvas = null;
  this.context = null;
  this.circles = [];
  this.mouseX = null;
  this.mouseY = null;
  this.currentGameState = 0;
  this.currentGameStateFunction = null;
  
  // maybe this shoud go on the Level object
  this.temperature = 0;
  this.maxTemperature = 100;
  this.barColor = {
    r: 255, g: 255, b:255
  };

  this.stateObj = null;

  this.gameStates = [
    this.testState,
    this.startState
  ];

};

Game.prototype.init = function(){
  var _me = this;
  this.canvas = document.getElementById('canvas13K');
  if(!this.canvas || !this.canvas.getContext){
    return;
  }

  // create the context for drawing elements on the canvas
  this.context = this.canvas.getContext('2d');

  // add mouse listeners
  this.canvas.addEventListener("click", function(e){
    _me.onMouseClick(e);
  }, false);

  //just for now
  this.switchGameState(START_STATE);

  setInterval(function(){
    _me.stateObj.update.call(_me);
  }, 33);
};

Game.prototype.switchGameState = function(state) {

  if (this.stateObj) {
    this.stateObj.destroy.call(this);
  }

  //set the a new current state function
  this.stateObj = this.gameStates[state]();
  this.stateObj.create.call(this);
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

Game.prototype.drawCircles = function() {
  for(var i=0; i<this.circles.length; i++){
    this.circles[i].draw();
  }
}

Game.prototype.drawTemperatureIndicator = function(){
  // draw background
  this.context.fillStyle = getRGBText(this.barColor);
  this.context.fillRect(0, this.canvas.height - 40, this.canvas.width, this.canvas.height);

  // draw text
  this.context.font = "40px Sans-serif";
  this.context.fillStyle = "#F0F0F0";
  var text = this.temperature.toFixed(2) + "°C";
  var metrics = this.context.measureText(text);
  this.context.fillText(text, this.canvas.width/2 - metrics.width/2, this.canvas.height-5);
};

Game.prototype.clearCanvas = function() {
  this.context.fillStyle = '#FFFFFF';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};