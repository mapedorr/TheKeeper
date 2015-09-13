function lvl2State() {
  return {
    repeat: true,
    lifes: 1,
    create: function() {
      configLvl(70, 100, [-20, 20], 
        25, 5, 30, true, 
        true, true, true, true, 
        [
          { x: cnv.width/2 -100, y: cnv.height/2, r: 120, tmp: 1 },
          { x: cnv.width/2 +100, y: cnv.height/2, r: 120, tmp: 1 }
        ]
      );
    },

    update: function() {
    },

    finish: function() {
    },

    wonClick: function() {
      switchState(SKILL3_STATE);
    },

    lostClick: function(){
      this.create();
    }
  };
}
