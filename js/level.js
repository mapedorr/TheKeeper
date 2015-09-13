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
var inRangeTimer = null;
var ftir = null;// First time inside range
var lockAll = null;// Lock all circles on level?

var lvlStatus = false;
var isWorldLvl = false;

var savedWorlds = 0;
var savedLifes = 0;
var lostWorlds = 0;
var lostLifes = 0;

var tempRest1Text = {
  t: "Temperature",
  f: "60px Sans-serif",
  c: "#FDFDFD"
};

var tempRest2Text = {
  t: "restored",
  f: "60px Sans-serif",
  c: "#FDFDFD"
};

var touchConTxt = {
  t: "touch to continue",
  f: "30px Sans-serif",
  c: "#D6990B"
}

var svdWorldsTxt = {
  t: "",
  dt: "saved species",
  f: "35px Sans-serif",
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

var nextLvlText = {
  t: "Touch to try another world",
  f: "35px Sans-serif",
  c: "#FFF"
};

function initLvl() {
  /* set the text width for all the text */
  textWidth([
    tempRest1Text,
    tempRest2Text,
    timeOverText,
    tryAgainText,
    nextLvlText,
    touchConTxt
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
 * @param  {???} dl       ???
 * @param  {???} win      ???
 * @param  {???} lst      ???
 * @param  {???} tBar     ???
 * @param  {???} txt      ???
 * @param  {Array} c      The Circles of the level.
 * @param  {function} cb  The function to call when the level finishes.
 */
function configLvl(t, mt, r, lt, rt, dl, isW, win, lst, tBar, txt, c, cb) {
  tmp = t;
  maxTmp = mt;
  range = r;
  rangeT = rmRangeT = rt;
  levelT = lt;
  dgLap = dl;

  isWorldLvl = isW;

  eWinLvl = win;
  eLostLvl = lst;
  eTimeBar = tBar;
  eTmpText = txt;

  circles = [];
  createCircles(c);

  lvlStatus = 'PLAYING';

  if(lvlTimer){
    clearInterval(lvlTimer);
    lvlTimer = null;
  }

  lvlTimer = setInterval(function() {
    if (levelT){
      levelT -= 1;
    }
  }, 1000);

  ftir = false;
  lockAll = false;
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
    if(getClick() && state.lostClick) {
      state.lostClick();
    }
  }else if (lvlStatus == 'WON') {
    if(getClick() && state.wonClick){
      state.wonClick();
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
        var clicked = circles[i].checkClick(click.x, click.y);
        if(clicked && ftir){
          lockAll = true;
          break;
        }
      }
      if(lockAll){
        for(var i=0; i<circles.length; i++){
          circles[i].listenClicks = false;
        }
      }
    }

    tmp += deltaTmp();

    if(Math.abs(tmp) > maxTmp){
      tmp = (tmp < 0) ? maxTmp*-1 : maxTmp;
    }

    if(intoRange()){
      // initiate the timer of objective reached
      inRangeTimer = inRangeTimer || setInterval(function(){
        rmRangeT -= 1;
      }, 1000);

      // unlock all the circles on first entrance
      if(!ftir){
        ftir = true;
        for(var i=0; i<circles.length; i++){
          circles[i].listenClicks = true;
        }
      }
    }else{
      // restart the timer for objective reached
      clearInterval(inRangeTimer);
      inRangeTimer = null;
      rmRangeT = rangeT;
      ftir = false;
      if(lockAll){
        for(var i=0; i<circles.length; i++){
          circles[i].listenClicks = true;
        }
        lockAll = false;
      }
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

    fillText(tempRest1Text, center(tempRest1Text.w, cnv.width), cnv.height/2);
    fillText(tempRest2Text, center(tempRest2Text.w, cnv.width), cnv.height/2 + 60);

    svdWorldsTxt.t = state.lifes + " " + svdWorldsTxt.dt;
    textWidth(svdWorldsTxt);
    fillText(svdWorldsTxt, center(svdWorldsTxt.w, cnv.width), cnv.height/2 + 110);
    
    fillText(touchConTxt, center(touchConTxt.w, cnv.width), cnv.height/2 + 140);
  }
}

function lostLvl() {
  if (eLostLvl) {
    fillText(timeOverText, center(timeOverText.w, cnv.width), cnv.height/2);
    if(state.repeat){
      fillText(tryAgainText, center(tryAgainText.w, cnv.width), cnv.height/2 + 50);
    }else if(!state.repeat){
      fillText(nextLvlText, center(nextLvlText.w, cnv.width), cnv.height/2 + 50);
    }
  }
}

function endLvl(status) {
  lvlStatus = status;
  stopCircles();
  clearInterval(lvlTimer);
  clearInterval(inRangeTimer);
  inRangeTimer = null;
  lvlTimer = null;

  if (isWorldLvl) {

    if (status == 'WON') {
      savedWorlds += 1;
      savedLifes += state.lifes;
    }
    else if (status == 'LOST') {
      lostWorlds += 1;
      lostLifes += state.lifes;
    }
    savedWorldsInfo();
  }
}

function intoRange() {
  return rangeT && tmp <= range[1] && tmp >= range[0];
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

