// Object that draws a circle an its ball
var Circle = function(ctx, radius, centerX, centerY, angle, direction, pathWidth, timeForLap, degreesPerLap){
  // calculate the length of the circle
  var pathLength = 2*Math.PI*radius;

  // calculate the necessary divisions needed for calculating the speed
  var pathDivisions = pathLength/(timeForLap/33);
  this.ball = {
    x: 0,
    y: 0,
    speed: (360/(pathLength/pathDivisions) * (Math.PI/180)) * (direction == 0 ? -1 : 1)
  };

  // calculate distance to inner edge
  var edgeInnX2 = Math.pow((centerX + (radius - (pathWidth - pathWidth / 2)) - centerX), 2);
  var distanceToEdgeInn = Math.sqrt(edgeInnX2);

  // calculate distance to outer edge
  var edgeOutX2 = Math.pow((centerX + (radius + (pathWidth - pathWidth / 2))) - centerX, 2);
  var distanceToEdgeOut = Math.sqrt(edgeOutX2);

  var fadeInterval = null;

  this.color = {r:255, g:0, b:0};
  if(direction == 0){
    this.color = {r:0, g:0, b:255};
  }
  this.temperatureSpeed = ((33*degreesPerLap)/timeForLap) * (direction == 0 ? -1 : 1);
  this.listenClicks = true;

  // Method that draws the circle and its ball
  this.draw = function(){
    // draw debug
    // this.drawDebug();

    // draw path
    ctx.beginPath();
    ctx.strokeStyle = getRGBText(this.color);
    ctx.lineWidth = pathWidth;
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.closePath();

    this.ball.x = centerX + Math.cos(angle) * radius;
    this.ball.y = centerY + Math.sin(angle) * radius;
    angle += this.ball.speed;

    // draw moving ball
    ctx.fillStyle = getRGBText(this.color);
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, 15, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    if(!this.listenClicks){
      // draw lock
      ctx.strokeStyle = "#313131";
      ctx.setLineDash([1]);
      ctx.lineWidth = pathWidth+1;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, (Math.PI/180)*315, true);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, (Math.PI/180)*180, (Math.PI/180)*135, true);
      ctx.stroke();
      ctx.closePath();
    }
  };

  // Method that verifies if the mouse is inside the area of the path
  this.checkClick = function(mouseX, mouseY){
    if(this.listenClicks == true){
      // check if the mouse is inside the path
      var disX2 = Math.pow(centerX - mouseX, 2);
      var disY2 = Math.pow(centerY - mouseY, 2);
      var distanceToCenter = Math.sqrt(disX2 + disY2);

      if(distanceToCenter >= distanceToEdgeInn
          && distanceToCenter <= distanceToEdgeOut){
        clearInterval(fadeInterval);
        var startColor = this.color;
        var endColor = null;
        if(this.ball.speed > 0){
          endColor = {r: 0, g:0, b: 255};  // blue
        }else{
          endColor = {r: 255, g:0, b: 0};  // red
        }
        fadeInterval = fade(this.color, startColor, endColor, 2000);
        this.ball.speed *= -1;
        this.temperatureSpeed *= -1;
        this.listenClicks = false;
      }
    }
  };

  // Method that draws things for debugging
  this.drawDebug = function(){
    // draw the center of the circle
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 1, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    // draw a point in the outer edge and a point in the inner edge
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(centerX + radius + (pathWidth - pathWidth / 2),
      centerY, 1, 0, Math.PI*2, true);// inner edge
    ctx.arc(centerX + radius - (pathWidth - pathWidth / 2),
      centerY, 1, 0, Math.PI*2, true);// outer edge
    ctx.closePath();
    ctx.fill();
  };

};
