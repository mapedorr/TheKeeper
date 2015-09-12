/* Test state */

function testState() {
  // Set the initial temperature
  var temperature = 70;
  var maxTemperature = 100;
  var temperatureRange = [-100, -10];
  var inRangeTimer = null;
  var reqTimeInsideRange = null;// in ms
  var secInsideRange = 0;
  var timeForLvl = 0;// in s
  var lvlTimer = null;
  var objectiveReached = false;

  /* level completed */
  var tempRestText = {
    text: "Temperature restored",
    font: "60px Sans-serif",
    color: "#FDFDFD"
  };
  var svdLifesText = {
    text: "saved species",
    font: "40px Sans-serif",
    color: "#F0F0F0"
  };
  var timeOverText = {
    text: "Time is over",
    font: "60px Sans-serif",
    color: "#D6990B"
  };

  return {

    create: function() {
      reqTimeInsideRange = 5;
      timeForLvl = 25;
      circles.push(new Circle(
        context,                   // canvas context
        200,                             // radius
        canvas.width/2,            // center x
        canvas.height/2,           // center y
        0,                              // start ball movement angle
        {r: 255, g: 0, b: 0},           // path and ball color
        12,                              // path width
        2000,                           // time for lap (in ms)
        30                               // degrees per lap
      ));

      // configure texts for level completed
      setTextWidth(tempRestText);
      setTextWidth(svdLifesText);
      setTextWidth(timeOverText);

      lvlTimer = setInterval(function() {
        if(!objectiveReached && timeForLvl > 0){
          timeForLvl--;
        }
      }, 1000);
    },

    update: function() {
      // clear canvas
      clearCanvas();

      // draw level timer indicator
      drawTimeBar(reqTimeInsideRange - secInsideRange, timeForLvl, (inRangeTimer!=null));

      // draw the circles
      if(objectiveReached || timeForLvl == 0){
        for(var i=0; i<circles.length; i++){
          // console.log("circles[i]", circles[i]);
          circles[i].ball.speed = 0;
          circles[i].listenClicks = false;
        }
      }
      drawCircles();

      // draw temperature indicators
      // calculate the temperature of the level
      if(!objectiveReached && timeForLvl > 0){
        temperature += calculateDeltaTemperature();
      }

      if(Math.abs(temperature) > maxTemperature){
        temperature = (temperature < 0) ? maxTemperature*-1 : maxTemperature;
      }

      // update the moveable indicator
      drawMoveableTemperature(temperature, maxTemperature);

      // update the bar text and color
      drawTemperatureBar(temperature, maxTemperature);
      drawTemperatureText(temperature);

      // draw temperature objective range
      drawTemperatureRange(temperatureRange, maxTemperature);

      // verify if the moveable indicator is inside the temperature range limits
      if(temperature <= temperatureRange[1]
          && temperature >= temperatureRange[0]){
        // initiate the timer of objective reached
        inRangeTimer = inRangeTimer || setInterval(this.increaseTimeInRange, 1000);
      }else{
        // secInsideRange = 0;
      }

      if(objectiveReached){
        // draw texts of level completed
        fillText(tempRestText, center(tempRestText.width, canvas.width), canvas.height/2);
        fillText(svdLifesText, center(svdLifesText.width, canvas.width), canvas.height/2 + 70);
      }

      if(!objectiveReached && timeForLvl == 0){
        // draw texts of level losed
        fillText(timeOverText, center(timeOverText.width, canvas.width), canvas.height/2);
      }
    },

    destroy: function() {
      circles = [];
    },

    increaseTimeInRange: function(){
      if(!objectiveReached && timeForLvl > 0){
        secInsideRange++;
      }

      if(secInsideRange >= reqTimeInsideRange){
        objectiveReached = true;
      }
    }
  };
}
