/* Test state */

function testState() {

  return {

    create: function() {

      configLvl(70, 100, [-100, -10], 
        10, 5, 100, true, true, true, true, 
        [{x: cnv.width/2, y: cnv.height/2, r: 200, tmp: 1 }]
      )
    },

    update: function() {

    },

    finish: function() {
      console.log('buena campeon');
    }
  };
}
