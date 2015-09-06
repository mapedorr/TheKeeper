window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
  var canvasElement = document.getElementById("canvas13K");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  
  init();
}

var START_STATE = 0;
var TEST_STATE = 1;

var canvas = null;
var context = null;
var circles = [];
var mouseX = null;
var mouseY = null;
var currentGameState = 0;
var currentGameStateFunction = null;

// maybe this shoud go on the Level object
var temperature = 0;
var maxTemperature = 100;
var barColor = {
  r: 255, g: 255, b:255
};

var stateObj = null;

var gameStates = [
  startState
  //testState,
];

function init (){
  canvas = document.getElementById('canvas13K');
  if(!canvas || !canvas.getContext){
    return;
  }

  // create the context for drawing elements on the canvas
  context = canvas.getContext('2d');

  // add mouse listeners
  canvas.addEventListener("click", function(e){
    onMouseClick(e);
  }, false);

  //just for now
  switchGameState(START_STATE);

  setInterval(function(){
    stateObj.update();
  }, 33);
};

function switchGameState(state) {

  if (stateObj) {
    stateObj.destroy();
  }

  //set the a new current state function
  stateObj = gameStates[state]();
  stateObj.create();
};

function onMouseClick(e){
  // update the mouse position
  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY - canvas.offsetTop;

  // verify if the click occurs inside the path of any of the circles in the level
  for(var i=0; i<circles.length; i++){
    circles[i].checkClick(mouseX, mouseY);
  }
};

function drawCircles() {
  for(var i=0; i<circles.length; i++){
    circles[i].draw();
  }
}

function drawTemperatureIndicator(){
  // draw background
  context.fillStyle = getRGBText(barColor);
  context.fillRect(0, canvas.height - 40, canvas.width, canvas.height);

  // draw text
  context.font = "40px Sans-serif";
  context.fillStyle = "#F0F0F0";
  var text = temperature.toFixed(2) + "°C";
  var metrics = context.measureText(text);
  context.fillText(text, canvas.width/2 - metrics.width/2, canvas.height-5);
};

function clearCanvas() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
};
