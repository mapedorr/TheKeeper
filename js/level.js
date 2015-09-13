var tmp = 0;  //temperature
var maxTmp = 0;   //max temperature
var range = [0, 0]; //range
var rangeT = 0; //range time
var levelT = 0; //level time
var circles = [];  //circles
var eTmpText = false;  //draw the degrees text
var eWinLvl = false;
var eLostLvl = false;
var eTimeBar = false;
var state = null;
var dgLap = 0;

var rmRangeT = 0; //current time into the range

var lvlTimer = null;

var lvlStatus = false;

var tempRestText = {
  t: "Temperature restored",
  f: "60px Sans-serif",
  c: "#FDFDFD"
};

var svdLifesText = {
  t: "saved species",
  f: "40px Sans-serif",
  c: "#F0F0F0"
};

var timeOverText = {
  t: "Time is over",
  f: "60px Sans-serif",
  c: "#D6990B"
};

var tryAgainText = {
  t: "Touch to try again",
  f: "45px Sans-serif",
  c: "#FFF"
};

function initLvl() {
  textWidth([
    tempRestText,
    svdLifesText,
    timeOverText,
    tryAgainText
  ]);
}

/**
 * Function that creates a level fot THE KEEPER.
 * 
 * @param  {int} t        The initial temperature for the level.
 * @param  {int} mt       The max temperature for the level.
 * @param  {Array} r      The initial and end limits of the range.
 * @param  {int} lt       The time for completing the level.
 * @param  {int} rt       The time the player have to KEEP inside the range.
 * @param  {Object} txt   The texts to show on the level.
 * @param  {Array} c      The Circles of the level.
 * @param  {function} cb  The function to call when the level finishes.
 */
function configLvl(t, mt, r, lt, rt, dl, win, lst, tBar, txt, c) {
  tmp = t;
  maxTmp = mt;
  range = r;
  rangeT = rmRangeT = rt;
  levelT = lt;
  dgLap = dl;

  eWinLvl = win;
  eLostLvl = lst;
  eTimeBar = tBar;
  eTmpText = txt;

  circles = [];
  createCircles(c);

  lvlStatus = 'PLAYING';

  lvlTimer = setInterval(function() {

    if(intoRange()){
      // initiate the timer of objective reached
      rmRangeT -= 1;
    }
    
    if (levelT){
      levelT -= 1;
    }

  }, 1000);
}

//@TODO improve: if c[x] is object use that params 
function createCircles(cs) {
  if (!cs) {
    return;
  }

  cs.forEach(function(c){
    if (typeof(c) == 'object') {
      circles.push(new Circle(
        ctx,                   // canvas context
        c.r,                             // radius
        c.x,            // center x
        c.y,           // center y
        0,                              // start ball movement angle
        c.tmp,           // path and ball color
        12,                              // path width
        calculateTFL(c.r),                           // time for lap (in ms)
        dgLap                               // degrees per lap
      ));
    }
  });
}

function updateLvl() {

  if (lvlStatus == 'LOST') {

    if (getClick()) {
      state.create();
    }
  }
  else if (lvlStatus == 'WON') {

    if (getClick()) {
      alert('aqui no hay nada mas que ver');
    }
  }
  else {

    if (levelT != null && levelT <= 0) {
      endLvl('LOST');
      return;
    }

    if(rmRangeT != null && rmRangeT <= 0){
      endLvl('WON');
      state.finish();
      return;
    }

    var click = getClick();
    if (click){
      for(var i=0; i<circles.length; i++){
        circles[i].checkClick(click.x, click.y);
      }
    }

    tmp += deltaTmp();

    if(Math.abs(tmp) > maxTmp){
      tmp = (tmp < 0) ? maxTmp*-1 : maxTmp;
    }
  }

  clearCanvas();
  drawCircles();
  drawTmpBar();
  eTimeBar && drawTimeBar();
  eTmpText && drawTmpText();
  drawRange();
  drawTmpIndicator();

  if (lvlStatus == 'WON') {
    winLvl();
  }
  else if (lvlStatus == 'LOST'){
    lostLvl();
  }

  state.update();
}

function stopCircles() {
  for(var i=0; i<circles.length; i++){
    // console.log("circles[i]", circles[i]);
    circles[i].ball.speed = 0;
    circles[i].listenClicks = false;
  }
}

function switchState(index) {
  state = gameStates[index]();
  state.create();
};

function drawCircles() {
  for(var i=0; i<circles.length; i++){
    circles[i].draw();
  }
}

function winLvl() {
  if (eWinLvl) {
    stopCircles();

    fillText(tempRestText, center(tempRestText.w, cnv.width), cnv.height/2);
    fillText(svdLifesText, center(svdLifesText.w, cnv.width), cnv.height/2 + 70);
  }
}

function lostLvl() {

  if (eLostLvl) {

    fillText(timeOverText, center(timeOverText.w, cnv.width), cnv.height/2);
    fillText(tryAgainText, center(tryAgainText.w, cnv.width), cnv.height/2 + 50);
  }
}

function endLvl(status) {
  lvlStatus = status;
  stopCircles();
  clearInterval(lvlTimer);
}

function intoRange() {
  return rangeT && tmp <= range[1] && tmp >= range[0]
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

function drawRange(){
  for (var i = range.length - 1; i >= 0; i--) {
    var triangleXPos = (Math.abs(range[i]) * (cnv.width/2))/maxTmp;
    var triangleColor = {
      r: Math.floor((255*range[i])/maxTmp),
      g: 0,
      b: Math.floor((255*range[i])/(maxTmp*-1))
    };
    if(range[i] <= 0){
      triangleXPos = (cnv.width/2) - triangleXPos;
    }else{
      triangleXPos = (cnv.width/2) + triangleXPos;
    }

    drawTriangle(triangleXPos, {r:230,g:230,b:230});
    drawDashedLine(triangleXPos, {r:21,g:21,b:21});
  };
}

function drawTmpIndicator(){
  var triangleXPos = (Math.abs(tmp.toFixed(2)) * (cnv.width/2))/maxTmp;
  if(tmp <= 0){
    triangleXPos = (cnv.width/2) - triangleXPos;
  }else{
    triangleXPos = (cnv.width/2) + triangleXPos;
  }
  drawTriangle(triangleXPos, barColor);
}

function drawTmpBar(){
  // update the bar color
  barColor = {
    r: Math.floor(123 + (tmp*(123/maxTmp))),
    g: 0,
    b: Math.floor(123 - (tmp*(123/maxTmp))) 
  };

  ctx.fillStyle = getRGBText(barColor);
  ctx.fillRect(0, cnv.height - 40, cnv.width, cnv.height);
}

function drawTimeBar(){
  ctx.fillStyle = intoRange() ? "#4DBF00" : "#464D4D";
  ctx.fillRect(0, 0, cnv.width/2, cnv.height - (cnv.height - 40));
  ctx.fillStyle = "#2E3333";
  ctx.fillRect(cnv.width/2, 0, cnv.width/2, cnv.height - (cnv.height - 40));
  ctx.font = "40px Sans-serif";
  ctx.fillStyle = "#F0F0F0";
  if(rmRangeT >= 0){
    var text = rmRangeT + " sec";
    var m = ctx.measureText(text);
    ctx.fillText(text, cnv.width*0.25 - m.width/2, 35);
  }

  if(levelT >= 0){
    var text = levelT + " sec";
    var m = ctx.measureText(text);
    ctx.fillText(text, cnv.width*0.75 - m.width/2, 35);
  }
}

function drawTmpText() {
  ctx.font = "40px Sans-serif";
  ctx.fillStyle = "#F0F0F0";
  var text = tmp.toFixed(2) + "°C";
  var m = ctx.measureText(text);
  ctx.fillText(text, cnv.width/2 - m.width/2, cnv.height-5);
}

