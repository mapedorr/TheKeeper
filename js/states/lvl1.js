function lvl1State() {
  return {
    repeat: true,
    create: function() {
      configLvl(70, 100, [-100, -10], 
        25, 5, 100, true, true, true, true, 
        [{x: cnv.width/2, y: cnv.height/2, r: 200, tmp: 1 }]
      );
    },

    update: function() {
    },

    finish: function() {
    },

    wonClick: function() {
      switchState(LVLGEN_STATE);
    },

    lostClick: function(){
      this.create();
    }
  };
}
