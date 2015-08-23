window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
  var canvasElement = document.getElementById("canvas13K");
  var canvasContainerElement = document.getElementById("canvasContainer");
  canvasElement.setAttribute("width", canvasContainerElement.clientWidth - 20);
  canvasElement.setAttribute("height", canvasContainerElement.clientHeight - 20);
  var _game = new Game();
  _game.init();
}

var Game = function(){
  this.canvas = null;
  this.context = null;
  this.circles = [];
  this.mouseX = null;
  this.mouseY = null;
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
    100,// radius
    250,// center x
    250,// center y
    0,// angle
    {
      r: 255,
      g: 0,
      b: 0
    },// path and ball color
    8,// path width
    .18));// ball speed

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