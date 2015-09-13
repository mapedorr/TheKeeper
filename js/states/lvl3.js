function lvl3State() {
  return {
    repeat: true,
    lifes: 16,
    create: function() {
      configLvl(-150, 200, [-100, 100], 
        25, 5, 30, true, 
        true, true, true, true, 
        [
          { x: cnv.width/2, y: cnv.height/2-150, r: 70, tmp: 1 },
          
          { x: cnv.width/2 +80, y: cnv.height/2+100, r: 140, tmp: 0 },
          { x: cnv.width/2 -80, y: cnv.height/2+100, r: 140, tmp: 0 }
        ]
      );
    },

    update: function() {
    },

    finish: function() {
    },

    wonClick: function() {
      switchState(READY_STATE);
    },

    lostClick: function(){
      this.create();
    }
  };
}
