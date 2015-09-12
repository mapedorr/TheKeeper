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

  return {

    create: function() {

      configLvl(70, 100, [-100, -10], 
        10, 5, 100, true, true, true, true, 
        [{x: cnv.width/2, y: cnv.height/2, r: 200, tmp: 1 }]
      )
    },

    update: function(){

    },

    finish: function() {
      console.log('buena campeon');
    }
  };
}
