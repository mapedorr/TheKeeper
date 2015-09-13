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

function drawSquare(x, y, w, h, c){
  ctx.strokeStyle = c;
  ctx.lineCap = 'square';
  ctx.lineWidth = 6;
  ctx.strokeRect(x, y, w, h);
}

/**
 * Function that calculates time required to make a lap in a circle with the
 * received radius.
 * 
 * @param  {int} radius     The radius of the circle.
 * @return {int}            Time (in seconds) to complete a lap in the circle.
 */
function calculateTFL(radius){
  return radius*10;
}

/**
 * Function that generates the position for a circle in a level.
 * 
 * @param  {int} radius   The radius of the circle.
 * @return {Object}       An object with the X and Y position for the circle.
 */
function calculateCirclePos(radius){
  // the circle must be inside the visible space for the level
  return {
    x: getRandomInt(radius+5, (cnv.width-5)-(radius)),
    y: getRandomInt(((cnv.height - (cnv.height - 45)) + (radius)), (cnv.height-45)-(radius))
  };
}

/**
 * Function that calculates the range of objective temperature for a level
 * based on its max temperature.
 * 
 * @param  {int} maxT     The max temperature of the level.
 * @return {Array}        The initial and end limits of the range.
 */
function calculateTempRange(maxT){
  var min = getRandomInt(-maxT+10, maxT-10);
  var max = getRandomInt(min+40, min+60);
  if(max >= maxT-10){
    max = min;
    min = getRandomInt(max-60, max-40);
  }
  return [min, max];
}

/**
 * Function that calculates the initial temperature for a level based on its
 * max temperature and the objective range.
 * 
 * @param  {Array} tempRange    The initial and end limits of the range.
 * @param  {int} maxT           The max temperature of the level.
 * @return {int}                The initial temperature for the level.
 */
function calculateInitTemp(tempRange, maxT){
  var t = 0;
  do{
    if(Math.abs(-maxT-tempRange[0]) > maxT-tempRange[1]){
      // if left limit is further from min temp than right limit from max temp
      t = getRandomInt(-maxT - 10, tempRange[0] - 10);
    }else{
      // if right limit is further from max temp than left limit from min temp
      t = getRandomInt(tempRange[1] + 10, maxT - 10);
    }
  }while(t < -maxT || t > maxT);
  return t;
}

/**
 * Calculate the required time the player has to KEEP inside the temperature range.
 * 
 * @param  {array} circles      The circles in the level.
 * @param  {int} dpl            Degrees per lap.
 * @return {int}                Time to KEEP inside range.
 */
function calculateTimeRange(circles, dpl, tempRange, timeForLvl){
  var t = 0;
  circles.forEach(function(circle) {
    // Sum the impact of the circle on the temperature
    t += calculateTFL(circle.r)/dpl;
  });

  // get the average of time required to keep the temperature inside the range
  // based on the circles of the level
  t = t/circles.length;

  // calculate the amount of time required to complete the temperature
  // range based on the calculated time (t)
  t = Math.floor((t * (tempRange[1] - tempRange[0]))/1000);

  // 1 second the achieve the objective, THAT'S BORING
  if(t<=1){
    t = 2;
  }

  return t;
}

/**
 * Function that calculates the time limit for completing the level.
 * 
 * @param  {int} reqTimeInsideRange     Average of time (in seconds) required to keep the temperature inside the range.
 * @param  {int} temperature            Initial temperature of the level.
 * @param  {Array} temperatureRange     The initial and end limits of the range.
 * @return {int}                        Time (in seconds) fot completing the level.
 */
function calculateTimeLvl(reqTimeInsideRange, temperature, temperatureRange){
  // dtnl >> degrees to nearest limit
  var dtnl = 0;
  if(Math.abs(temperature - temperatureRange[0]) < Math.abs(temperature - temperatureRange[1])){
    // init temperature is near to left limit
    dtnl = Math.abs(temperature - temperatureRange[0]);
  }else{
    // init temperature is near to right limit
    dtnl = Math.abs(temperature - temperatureRange[1]);
  }

  // time to reach the nearest limit
  var ttl = Math.floor((dtnl*reqTimeInsideRange)/(temperatureRange[1] - temperatureRange[0]));
  if(ttl <= 3){
    ttl = 4;
  }

  // generate a random number for the time of the level based on the previous calculations
  ttl += getRandomInt(ttl + 2, ttl + 5);

  return ttl;
}

/**
 * Function that generates a random int between the received limits.
 * 
 * @param  {int} min    The initial limit.
 * @param  {int} max    The end limit.
 * @return {int}        The generated number.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function savedWorldsInfo() {
  if (typeof(localStorage) === 'undefined') return;

  localStorage.setItem('keeper-saved', savedWorlds);
  localStorage.setItem('keeper-saved-l', savedLifes);
  localStorage.setItem('keeper-lost', lostWorlds);
  localStorage.setItem('keeper-lost-l', lostLifes);
}

function drawDashedLine(x, c){
  ctx.strokeStyle = getRGBText(c);
  ctx.lineWidth = 2;
  ctx.setLineDash([6]);
  ctx.beginPath();
  ctx.moveTo(x, cnv.height - 40);
  ctx.lineTo(x, cnv.height);
  ctx.stroke();
  ctx.closePath();
}