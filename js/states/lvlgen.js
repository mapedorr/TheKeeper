function lvlgenState(){
  return {
    lifes: 0,
    repeat: false,

    create: function() {
      var cn = getRandomInt(2, 6);// Number of circles
      var dpl = getRandomInt(5, 20);// Degrees per lap
      var mt = 100;// Max temperature

      // generate temperature rate
      var tr = calculateTempRange(mt);// Objective temperature range

      var circles = [];
      for (var i = cn; i > 0; i--) {
        var _r = getRandomInt(50, 200);// radius
        var p = calculateCirclePos(_r);// (x,y) center point
        circles.push({x: p.x, y: p.y, r: _r, tmp: getRandomInt(0,1)});
      };

      var it = calculateInitTemp(tr, mt);// Initial temperature
      var irt = calculateTimeRange(circles, dpl, tr);// Time to keep inside range
      var lvlt = calculateTimeLvl(irt, it, tr);// Time for level

      this.lifes = getRandomInt(2,284);

      configLvl(it, mt, tr, 
        lvlt, irt, dpl, true,
        true, true, true, true, 
        circles);
    },

    update: function(){
    },

    finish: function(){
      console.log("Aquí es donde uno se pregunta, ¿vale la pena sufrir por un par de tetas?");
    },

    wonClick: function(){
      switchState(LVLGEN_STATE);
    },

    lostClick: function(){
      this.wonClick();
    }
  };
}