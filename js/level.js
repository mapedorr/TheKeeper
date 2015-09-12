var tmp = 0;  //temperature
var maxTmp = 0;   //max temperature
var range = [0, 0]; //range
var rangeT = 0; //range time
var levelT = 0; //level time
var circles = [];  //circles
var tmpTxt = true;  //draw the degrees text
var state = null;
var dgLap = 0;

var inRangeT = 0; //current time into the range

/**
 * [configLvl description]
 * @param  {[type]} t  [temperature]
 * @param  {[type]} mt [max temperature]
 * @param  {[type]} r  [range]
 * @param  {[type]} lt [level time]
 * @param  {[type]} rt [range time]
 * @param  {[type]} txt  [draw temp txt]
 * @param  {[type]} c  [circles]
 * @param  {[type]} cb [finish callback]
 * @return {[type]}    [description]
 */
function configLvl(t, mt, r, lt, rt, dl, txt, c) {

  tmp = t;
  maxTmp = mt;
  range = r;
  rangeT = rt;
  levelT = lt;
  tmpTxt = txt;
  dgLap = dl;

  circles = [];
  createCircles(c);
}

//@TODO improve: if c[x] is object use that params 
function createCircles(cs) {
  cs.forEach(function(c){
    if (typeof(c) == 'object') {
      circles.push(new Circle(
        ctx,                   // canvas context
        c.r,                             // radius
        c.x,            // center x
        c.y,           // center y
        0,                              // start ball movement angle
        {r: 255*(c.tmp), g:0, b: 255*(1-c.tmp)},           // path and ball color
        12,                              // path width
        c.r*10,                           // time for lap (in ms)
        dgLap                               // degrees per lap
      ));
    }
  });
}

function updateLvl(delta) {
  tmp += deltaTmp();

  if(Math.abs(tmp) > maxTmp){
    tmp = (tmp < 0) ? maxTmp*-1 : maxTmp;
  }

  if(tmp <= range[1] && tmp >= range[0]){
    // initiate the timer of objective reached
    inRangeT += delta;

    if(inRangeT >= rangeT){
      state.finish();
    }
  }

  clearCanvas();
  drawCircles();
  drawTmpBar();
  tmpTxt && drawTmpText();
  drawTmpIndicator();
  drawRange();

  state.update();
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

function drawSquare(x, y, w, h){
  ctx.strokeStyle = "#FDFDFD";
  ctx.lineCap = 'square';
  ctx.lineWidth = 6;
  ctx.strokeRect(x, y, w, h);
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

function drawTimeBar(rangeT, levelT){
  ctx.fillStyle = (inRangeT>0) ? "#4DBF00" : "#464D4D";
  ctx.fillRect(0, 0, cnv.width/2, cnv.height - (cnv.height - 40));
  ctx.fillStyle = "#2E3333";
  ctx.fillRect(cnv.width/2, 0, cnv.width/2, cnv.height - (cnv.height - 40));
  ctx.font = "40px Sans-serif";
  ctx.fillStyle = "#F0F0F0";
  if(rangeT >= 0){
    var text = rangeT + " sec";
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

