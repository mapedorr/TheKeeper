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
var LVLGEN_STATE = 2;

var SKILL1_STATE = 3;
var SKILL2_STATE = 4;
var SKILL3_STATE = 5;

var LEVEL1_STATE = 6;
var LEVEL2_STATE = 7;
var LEVEL3_STATE = 8;

var READY_STATE = 9;

var cnv = null;
var ctx = null;
var mouseX = null;
var mouseY = null;

var barColor = {
  r: 255, g: 255, b:255
};

var gameStates = [
  startState,
  introState,
  lvlgenState,
  skillState.bind(null, 1, "Reversed warming", LEVEL1_STATE),
  skillState.bind(null, 2, "Now keep it!", LEVEL2_STATE),
  skillState.bind(null, 3, "Touch them together", LEVEL3_STATE),
  lvl1State,
  lvl2State,
  lvl3State,
  readyState
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
