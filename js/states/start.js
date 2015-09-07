function startState() {

  var startText = "Click the Circle to start";
  var startTextM = null;

  function _create() {

    temperature = -200;
    maxTemperature = 200;

    circles.push(new Circle(
      context,                   // canvas context
      100,                             // radius
      canvas.width/2,            // center x
      canvas.height/2,           // center y
      0,                              // start ball movement angle
      {r: 255, g: 0, b: 0},           // path and ball color
      8,                              // path width
      2000,                           // time for lap (in ms)
      300                              // degrees per lap
    ));

    context.font = "30px Sans-serif";
    startTextM = context.measureText(startText);
  }

  function _update() {
    console.log('temp', temperature);
    if (temperature < -200) {
    }
  }

  function drawStartText() {
    context.fillStyle = "#F0F0F0";
    context.fillText(startText, canvas.width/2 - startTextM.width/2, canvas.height-5);
  }

  return {
    create: _create,

    update: function() {
      _update()

      clearCanvas();      
      drawCircles();
      drawTemperatureIndicator();
      drawStartText();

    },

    destroy: function() {
      circles = [];
    }
  };
}