function lvl1State() {
  return {
    repeat: true,
    lifes: 1,
    create: function() {
      configLvl(70, 100, [-100, -10], 
        25, 5, 30, true, 
        true, true, true, true, 
        [{x: cnv.width/2, y: cnv.height/2, r: 200, tmp: 1 }]
      );
    },

    update: function() {
    },

    finish: function() {
    },

    wonClick: function() {
      switchState(SKILL2_STATE);
    },

    lostClick: function(){
      this.create();
    }
  };
}
