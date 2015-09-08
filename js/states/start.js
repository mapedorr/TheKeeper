function startState() {

  var titleText = {
    text: "THE KEEPER",
    font: "45px Sans-serif",
    color: "#00F"
  }

  var startText = {
    text: "Click the Circle to start",
    font: "30px Sans-serif",
    color: "#F0F0F0"
  }

  var temperature = 0;
  var maxTemperature = 200;

  function _create() {

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

    setTextWidth(titleText);
    setTextWidth(startText);
  }

  function _update() {
    temperature += calculateDeltaTemperature();

    if (Math.abs(temperature) > maxTemperature) {
      temperature = (temperature > 0) ? maxTemperature : -maxTemperature 
    }

    if (temperature == -maxTemperature) {
      switchGameState(INTRO_STATE);
    }
  }

  return {
    create: _create,

    update: function() {
      _update()

      clearCanvas();      
      drawCircles();

      fillText(titleText, canvas.width/2 - titleText.width/2, 50);

      drawTemperatureBar(temperature, maxTemperature);
      fillText(startText, canvas.width/2 - startText.width/2, canvas.height - 10);
    },

    destroy: function() {
      circles = [];
    }
  };
}