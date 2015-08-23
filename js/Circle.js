// Object that draws a circle an its ball
var Circle = function(context, radius, centerX, centerY, angle, color, pathWidth, ballSpeed){
  this.context = context;
  this.radius = radius;
  this.centerX = centerX;
  this.centerY = centerY;
  this.pathWidth = pathWidth;
  this.angle = angle;
  this.color = color;
  this.ball = {
    x: 0,
    y: 0,
    speed: ballSpeed
  };

  // calculate distance to inner edge
  var edgeInnX2 = Math.pow((centerX + (radius - (this.pathWidth - this.pathWidth / 2)) - centerX), 2);
  this.distanceToEdgeInn = Math.sqrt(edgeInnX2);

  // calculate distance to outer edge
  var edgeOutX2 = Math.pow((centerX + (radius + (this.pathWidth - this.pathWidth / 2))) - centerX, 2);
  this.distanceToEdgeOut = Math.sqrt(edgeOutX2);
};

// Method that draws the circle and its ball
Circle.prototype.draw = function(){
  // draw debug
  // this.drawDebug();

  // draw path
  this.context.beginPath();
  this.context.strokeStyle = 'rgb(' + this.color.r +
    ',' + this.color.g +
    ',' + this.color.b + ')';
  this.context.lineWidth = this.pathWidth;
  this.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI*2, true);
  this.context.stroke();
  this.context.closePath();

  this.ball.x = this.centerX + Math.cos(this.angle) * this.radius;
  this.ball.y = this.centerY + Math.sin(this.angle) * this.radius;
  this.angle += this.ball.speed;

  // draw moving ball
  this.context.fillStyle = 'rgb(' + this.color.r +
    ',' + this.color.g +
    ',' + this.color.b + ')';
  this.context.beginPath();
  this.context.arc(this.ball.x, this.ball.y, 15, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
};

// Method that verifies if the mouse is inside the area of the path
Circle.prototype.checkClick = function(mouseX, mouseY){
  // check if the mouse is inside the path
  var disX2 = Math.pow(this.centerX - mouseX, 2);
  var disY2 = Math.pow(this.centerY - mouseY, 2);
  var distanceToCenter = Math.sqrt(disX2 + disY2);

  if(distanceToCenter >= this.distanceToEdgeInn
      && distanceToCenter <= this.distanceToEdgeOut){
    var startColor = this.color;  // red
    if(this.ball.speed > 0){
      var endColor   = {r: 0, g:255, b: 0};  // green
      fade(this, startColor, endColor, 2000);
    }else{
      var endColor   = {r: 255, g:0, b: 0};  // green
      fade(this, startColor, endColor, 2000);
    }
    this.ball.speed *= -1;
  }
};

// Method that draws things for debugging
Circle.prototype.drawDebug = function(){
  // draw the center of the circle
  this.context.fillStyle = "blue";
  this.context.beginPath();
  this.context.arc(this.centerX, this.centerY, 1, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();

  // draw a point in the outer edge and a point in the inner edge
  this.context.fillStyle = "blue";
  this.context.beginPath();
  this.context.arc(this.centerX + this.radius + (this.pathWidth - this.pathWidth / 2),
    this.centerY, 1, 0, Math.PI*2, true);// inner edge
  this.context.arc(this.centerX + this.radius - (this.pathWidth - this.pathWidth / 2),
    this.centerY, 1, 0, Math.PI*2, true);// outer edge
  this.context.closePath();
  this.context.fill();
};