function startState() {
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
    },

    update: function() {
      clearCanvas();      
      drawCircles();
    },

    destroy: function() {
      circles = [];
    }
  };
}