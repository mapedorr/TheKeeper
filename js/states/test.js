/* Test state */

Game.prototype.testState = function() {

  return {

    create: function() {
      // create the circle
      this.circles.push(new Circle(this.context,
        200,                            // radius
        this.canvas.width/2,            // center x
        this.canvas.height/2,           // center y
        0,                              // start ball movement angle
        {r: 255, g: 0, b: 0},           // path and ball color
        8,                              // path width
        500                              // time for lap (in ms)
      ));

    },

    update: function() {
      // clear canvas
      this.clearCanvas();
      
      // draw temperature indicator
      this.drawTemperatureIndicator();

      // draw the circles
      this.drawCircles();
    },

    destroy: function() {
      this.circles = [];
    }
  }
  
};
