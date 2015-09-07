/* Test state */

function testState() {
  // Set the initial temperature
  var temperature = 70;
  var maxTemperature = 100;
  var temperatureRange = [-90, 10];
  var inRangeTimer = null;
  var reqTimeInsideRange = null;// in ms
  var msInsideRange = 0;
  var objectiveReached = false;

  return {

    create: function() {
      reqTimeInsideRange = 5000;
      circles.push(new Circle(
        context,                   // canvas context
        200,                             // radius
        canvas.width/2,            // center x
        canvas.height/2,           // center y
        0,                              // start ball movement angle
        {r: 255, g: 0, b: 0},           // path and ball color
        8,                              // path width
        2000,                           // time for lap (in ms)
        30                               // degrees per lap
      ));
    },

    update: function() {
      // clear canvas
      clearCanvas();

      // draw the circles
      drawCircles();

      // draw temperature indicators
      // calculate the temperature of the level
      if(!objectiveReached){
        temperature = calculateTemperature(temperature);
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
        // msInsideRange = 0;
      }
    },

    destroy: function() {
      circles = [];
    },

    increaseTimeInRange: function(){
      msInsideRange+=1000;
      if(msInsideRange >= reqTimeInsideRange){
        objectiveReached = true;
      }
    }
  };
}
