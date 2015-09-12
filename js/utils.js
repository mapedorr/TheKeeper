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

function deltaTmp(){
  var dt = 0;
  //add the temperature for each circle
  for(var i=0; i<circles.length; i++){
    dt += circles[i].temperatureSpeed;
  }
  return dt;
}

function textWidth(objs) {
  if (!objs.length) {
    objs = [objs];
  }

  objs.forEach(function(obj){
    ctx.font = obj.f;
    obj.w = ctx.measureText(obj.t).width;
  });
}

function fillText(obj, x, y) {
  ctx.fillStyle = obj.c;
  ctx.font = obj.f;
  ctx.fillText(obj.t, x, y)
}

function center(c, p) {
  return p/2 - c/2;
}

function genNick() {
  var t = Date.now();
  return 'K'+t%1000+String.fromCharCode(t%10+65); 
}

function drawTriangle(mdX, color){
  ctx.fillStyle = getRGBText(color);
  ctx.lineWidth = 2;
  ctx.lineCap = 'square';
  ctx.beginPath();
  ctx.moveTo(mdX - 10, cnv.height - 60);
  ctx.lineTo(mdX, cnv.height - 40);
  ctx.lineTo(mdX + 10, cnv.height - 60);
  ctx.lineTo(mdX - 10, cnv.height - 60);
  ctx.fill();
  ctx.closePath();
}

function drawSquare(x, y, w, h){
  ctx.strokeStyle = "#FDFDFD";
  ctx.lineCap = 'square';
  ctx.lineWidth = 6;
  ctx.strokeRect(x, y, w, h);
}
