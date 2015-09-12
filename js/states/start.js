function startState() {

  var title1 = {
    t: "The",
    f: "65px Sans-serif",
    c: "#FFF"
  }

  var title2 = {
    t: "Keeper",
    f: "70px Sans-serif",
    c: "#FFF"
  }

  var startTxt = {
    t: "Click the circle to start",
    f: "30px Sans-serif",
    c: "#F0F0F0"
  }

  return {
    create: function() {
      textWidth([title1, title2, startTxt]);

      configLvl(0, 200, [-200, -150], 
        null, 1, 200, 
        false, false, false, false,
        [{ x: cnv.width/2, y: cnv.height/2 + 50, r: 150, tmp: 1 }]
      )
    },

    update: function() {

      fillText(title1, cnv.width/2 - title1.w/2, 90);
      fillText(title2, cnv.width/2 - title2.w/2, 170);

      fillText(startTxt, cnv.width/2 - startTxt.w/2, cnv.height - 10);
    },

    finish: function() {
      console.log('que paso')
      switchState(INTRO_STATE);
    }
  };
}