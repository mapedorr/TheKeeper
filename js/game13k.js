window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
  var canvasElement = document.getElementById("canvas13K");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  
  init();
}

var START_STATE = 0;
var LEVEL1_STATE = 1;
var INTRO_STATE = 2;

var canvas = null;
var context = null;
var circles = [];
var mouseX = null;
var mouseY = null;
var currentGameState = 0;
var currentGameStateFunction = null;

var barColor = {
  r: 255, g: 255, b:255
};

var stateObj = null;

var gameStates = [
  startState,
  testState,
  introState
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
}

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
}

function drawCircles() {
  for(var i=0; i<circles.length; i++){
    circles[i].draw();
  }
}

function clearCanvas() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTriangle(middlePosX, color){
  context.fillStyle = getRGBText(color);
  context.lineWidth = 2;
  context.lineCap = 'square';
  context.beginPath();
  context.moveTo(middlePosX - 10, canvas.height - 60);
  context.lineTo(middlePosX, canvas.height - 40);
  context.lineTo(middlePosX + 10, canvas.height - 60);
  context.lineTo(middlePosX - 10, canvas.height - 60);
  context.fill();
  context.closePath();
}

function drawDashedLine(xPos, color){
  context.strokeStyle = getRGBText(color);
  context.lineWidth = 2;
  context.setLineDash([6]);
  context.beginPath();
  context.moveTo(xPos, canvas.height - 40);
  context.lineTo(xPos, canvas.height);
  context.stroke();
  context.closePath();
}

function drawSquare(xPos, yPos, width, height){
  context.strokeStyle = "#000";
  context.lineCap = 'square';
  context.lineWidth = 6;
  context.strokeRect(xPos, yPos, width, height);
}

function drawTemperatureRange(limits, maxTemperature){
  for (var i = limits.length - 1; i >= 0; i--) {
    var triangleXPos = (Math.abs(limits[i]) * (canvas.width/2))/maxTemperature;
    var triangleColor = {
      r: Math.floor((255*limits[i])/maxTemperature),
      g: 0,
      b: Math.floor((255*limits[i])/(maxTemperature*-1))
    };
    if(limits[i] <= 0){
      triangleXPos = (canvas.width/2) - triangleXPos;
    }else{
      triangleXPos = (canvas.width/2) + triangleXPos;
    }

    drawTriangle(triangleXPos, {r:31,g:31,b:31});
    drawDashedLine(triangleXPos, {r:31,g:31,b:31});
  };
}

function drawMoveableTemperature(temperature, maxTemperature){
  var triangleXPos = (Math.abs(temperature.toFixed(2)) * (canvas.width/2))/maxTemperature;
  if(temperature <= 0){
    triangleXPos = (canvas.width/2) - triangleXPos;
  }else{
    triangleXPos = (canvas.width/2) + triangleXPos;
  }
  drawTriangle(triangleXPos, barColor);
}

function drawTemperatureBar(temperature, maxTemperature){
  // update the bar color
  barColor = {
    r: Math.floor(123 + (temperature*(123/maxTemperature))),
    g: 0,
    b: Math.floor(123 - (temperature*(123/maxTemperature))) 
  };

  context.fillStyle = getRGBText(barColor);
  context.fillRect(0, canvas.height - 40, canvas.width, canvas.height);
}

function drawTemperatureText(temperature) {
  context.font = "40px Sans-serif";
  context.fillStyle = "#F0F0F0";
  var text = temperature.toFixed(2) + "°C";
  var metrics = context.measureText(text);
  context.fillText(text, canvas.width/2 - metrics.width/2, canvas.height-5);
}
