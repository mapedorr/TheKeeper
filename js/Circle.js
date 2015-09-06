// Object that draws a circle an its ball
var Circle = function(context, radius, centerX, centerY, angle, color, pathWidth, timeForLap, degreesPerLap){
  var context = context;
  var radius = radius;
  var centerX = centerX;
  var centerY = centerY;
  var pathWidth = pathWidth;
  var angle = angle;
  var color = color;
  var timeForLap = timeForLap;
  var degreesPerLap = degreesPerLap;
  var temperatureSpeed = (33*degreesPerLap)/timeForLap;

  // calculate the length of the circle
  var pathLength = 2*Math.PI*radius;

  // calculate the necessary divisions needed for calculating the speed
  var pathDivisions = pathLength/(timeForLap/33);
  var ball = {
    x: 0,
    y: 0,
    speed: 360/(pathLength/pathDivisions) * (Math.PI/180)
  };

  // calculate distance to inner edge
  var edgeInnX2 = Math.pow((centerX + (radius - (pathWidth - pathWidth / 2)) - centerX), 2);
  var distanceToEdgeInn = Math.sqrt(edgeInnX2);

  // calculate distance to outer edge
  var edgeOutX2 = Math.pow((centerX + (radius + (pathWidth - pathWidth / 2))) - centerX, 2);
  var distanceToEdgeOut = Math.sqrt(edgeOutX2);

  var fadeInterval = null;

  // Method that draws the circle and its ball
  this.draw = function(){
    // draw debug
    // this.drawDebug();

    // draw path
    context.beginPath();
    context.strokeStyle = getRGBText(color);
    context.lineWidth = pathWidth;
    context.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    context.stroke();
    context.closePath();

    ball.x = centerX + Math.cos(angle) * radius;
    ball.y = centerY + Math.sin(angle) * radius;
    angle += ball.speed;

    // draw moving ball
    context.fillStyle = getRGBText(color);
    context.beginPath();
    context.arc(ball.x, ball.y, 15, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    // update the temperature
    temperature += temperatureSpeed;

    // update the bar color
    if(temperature > maxTemperature){
      return;
    }
    barColor = {
      r: Math.floor((255*temperature)/maxTemperature),
      g: 0,
      b: Math.floor((255*temperature)/(maxTemperature*-1))
    };
  };

  // Method that verifies if the mouse is inside the area of the path
  this.checkClick = function(mouseX, mouseY){
    // check if the mouse is inside the path
    var disX2 = Math.pow(centerX - mouseX, 2);
    var disY2 = Math.pow(centerY - mouseY, 2);
    var distanceToCenter = Math.sqrt(disX2 + disY2);

    if(distanceToCenter >= distanceToEdgeInn
        && distanceToCenter <= distanceToEdgeOut){
      clearInterval(fadeInterval);
      var startColor = color;
      var endColor = null;
      if(ball.speed > 0){
        endColor = {r: 0, g:0, b: 255};  // blue
      }else{
        endColor = {r: 255, g:0, b: 0};  // red
      }
      fadeInterval = fade( startColor, endColor, 2000);
      ball.speed *= -1;
      temperatureSpeed *= -1;
    }
  };

  // Method that draws things for debugging
  this.drawDebug = function(){
    // draw the center of the circle
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(centerX, centerY, 1, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    // draw a point in the outer edge and a point in the inner edge
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(centerX + radius + (pathWidth - pathWidth / 2),
      centerY, 1, 0, Math.PI*2, true);// inner edge
    context.arc(centerX + radius - (pathWidth - pathWidth / 2),
      centerY, 1, 0, Math.PI*2, true);// outer edge
    context.closePath();
    context.fill();
  };

};
