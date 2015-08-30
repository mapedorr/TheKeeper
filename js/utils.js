function lerp(a, b, u) {
  return (1 - u) * a + u * b;
}

function fade(target, startColor, endColor, duration) {
  var interval = 10;
  var steps = duration / interval;
  var step_u = 1.0 / steps;
  var u = 0.0;
  var theInterval = setInterval(function() {
      if (u >= 1.0) {
          clearInterval(theInterval);
      }
      var r = Math.round(lerp(startColor.r, endColor.r, u));
      var g = Math.round(lerp(startColor.g, endColor.g, u));
      var b = Math.round(lerp(startColor.b, endColor.b, u));
      target.color = {
        r: r,
        g: g,
        b: b
      };
      u += step_u;
  }, interval);
  return theInterval;
}