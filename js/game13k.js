window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
  var canvasElement = document.getElementById("canvas13K");
  canvasElement.width = (window.innerWidth > 480) ? 480 :  window.innerWidth;
  canvasElement.style.left = (window.innerWidth/2 - canvasElement.width/2) + "px";
  canvasElement.height = window.innerHeight;
  
  init();
}

var START_STATE = 0;
var INTRO_STATE = 1;
var LEVEL1_STATE = 2;
var LVLGEN_STATE = 3;

var cnv = null;
var ctx = null;
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
  introState,
  lvl1State,
  lvlgenState
];

function init (){
  cnv = document.getElementById('canvas13K');
  if(!cnv || !cnv.getContext){
    return;
  }

  // create the ctx for drawing elements on the cnv
  ctx = cnv.getContext('2d');

  // add mouse listeners
  cnv.addEventListener("click", function(e){
    onMouseClick(e);
  }, false);

  initLvl();
  switchState(START_STATE);

  setInterval(function(){
    updateLvl();
    mouseX = mouseY = null; //clean the last click
  }, 33);
}

function onMouseClick(e){
  // update the mouse position
  mouseX = e.clientX - cnv.offsetLeft;
  mouseY = e.clientY - cnv.offsetTop;
}

function getClick() {
  if (mouseX && mouseY) {
    return { x: mouseX, y: mouseY} ;
  }

  return null;
}

function clearCanvas() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}
