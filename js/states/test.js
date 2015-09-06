/* Test state */

function testState() {

  return {

    create: function() {
      // create the circle
      circles.push(new Circle(
        context,                   // canvas context
        50,                             // radius
        canvas.width/2,            // center x
        canvas.height/2,           // center y
        0,                              // start ball movement angle
        {r: 255, g: 0, b: 0},           // path and ball color
        8,                              // path width
        2000,                           // time for lap (in ms)
        10                               // degrees per lap
      ));

      circles.push(new Circle(
        context,                   // canvas context
        200,                             // radius
        canvas.width/2,            // center x
        canvas.height/2,           // center y
        0,                              // start ball movement angle
        {r: 255, g: 0, b: 0},           // path and ball color
        8,                              // path width
        5000,                           // time for lap (in ms)
        15                               // degrees per lap
      ));

    },

    update: function() {
      // clear canvas
      clearCanvas();
      
      // draw temperature indicator
      drawTemperatureIndicator();

      // draw the circles
      drawCircles();
    },

    destroy: function() {
      circles = [];
    }
  };
}
