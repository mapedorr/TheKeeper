function lerp(a, b, u) {
  return (1 - u) * a + u * b;
}

function getRGBText(color){
  return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
}

function fade(color, startColor, endColor, duration) {
  var interval = 100;
  var steps = duration / interval;
  var step_u = 1.0 / steps;
  var u = 0.0;
  var theInterval = setInterval(function() {
    if (u >= 1.0) {
      clearInterval(theInterval);
      return;
    }

    color.r = Math.round(lerp(startColor.r, endColor.r, u));
    color.g = Math.round(lerp(startColor.g, endColor.g, u));
    color.b = Math.round(lerp(startColor.b, endColor.b, u));

    u += step_u;
  }, interval);
  return theInterval;
}

function calculateTemperature(temperature){
  for(var i=0; i<circles.length; i++){
    // update the temperature
    temperature += circles[i].temperatureSpeed;
    return temperature;
  }
}