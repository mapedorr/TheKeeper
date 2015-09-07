/* Test state */

function testState() {
  // Set the initial temperature
  var temperature = 70;
  var maxTemperature = 100;
  var temperatureRange = [-50, 10];

  return {

    create: function() {
      circles.push(new Circle(
        context,                   // canvas context
        200,                             // radius
        canvas.width/2,            // center x
        canvas.height/2,           // center y
        0,                              // start ball movement angle
        {r: 255, g: 0, b: 0},           // path and ball color
        8,                              // path width
        2000,                           // time for lap (in ms)
        20                               // degrees per lap
      ));
    },

    update: function() {
      // clear canvas
      clearCanvas();

      // draw the circles
      drawCircles();

      // draw temperature indicators
      // draw temperature objective range
      drawTemperatureRange(temperatureRange, maxTemperature);

      // calculate the temperature of the level
      temperature = calculateTemperature(temperature);
      if(Math.abs(temperature) > maxTemperature){
        temperature = (temperature < 0) ? maxTemperature*-1 : maxTemperature;
      }

      // update the moveable indicator
      drawMoveableTemperature(temperature, maxTemperature);

      // update the bar text and color
      drawTemperatureBar(temperature, maxTemperature);
    },

    destroy: function() {
      circles = [];
    }
  };
}
