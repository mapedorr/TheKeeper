function startState() {

  var titleText = {
    text: "The Keeper",
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
  var temperatureRange = [-200, 0];

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

      // draw temperature indicators
      // calculate the temperature of the level
      // if(!objectiveReached){
      //   temperature += calculateDeltaTemperature();
      // }

      temperature += calculateDeltaTemperature();
      if(Math.abs(temperature) > maxTemperature){
        temperature = (temperature < 0) ? maxTemperature*-1 : maxTemperature;
      }

      // update the moveable indicator
      drawMoveableTemperature(temperature, maxTemperature);

      // update the bar text and color
      // drawTemperatureBar(temperature, maxTemperature);
      // drawTemperatureText(temperature);

      // draw temperature objective range
      drawTemperatureRange(temperatureRange, maxTemperature);

      drawTemperatureBar(temperature, maxTemperature);
      fillText(startText, canvas.width/2 - startText.width/2, canvas.height - 10);
    },

    destroy: function() {
      circles = [];
    }
  };
}