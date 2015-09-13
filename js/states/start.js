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

  var worldsText = {
    t: "",
    f: "30px Sans-serif",
    c: "#FFF"
  }

  function drawWorldsInfo() {
    drawSquare(3,3,103,53, "#4DBF00");
    drawSquare(cnv.width-103,3,100,50, "#F00");

    worldsText.t = ''+savedWorlds;
    textWidth(worldsText);
    fillText(worldsText, center(worldsText.w/2, 100), 40);

    worldsText.t = ''+lostWorlds;
    textWidth(worldsText);
    fillText(worldsText, center(worldsText.w/2, 100) + cnv.width-110, 40);

  }

  return {
    create: function() {

      //ask if local storage is available
      if (typeof(Storage) !== 'undefined') {
        //get the saved and lost worlds
        savedWorlds = parseInt(localStorage.getItem('keeper-saved')) || 0;
        lostWorlds = parseInt(localStorage.getItem('keeper-lost')) || 0;
      }

      textWidth([title1, title2, startTxt]);

      configLvl(0, 200, [-200, -150], 
        null, 1, 200, false,
        false, false, false, false,
        [{ x: cnv.width/2, y: cnv.height/2 + 50, r: 150, tmp: 1 }]
      )
    },

    update: function() {

      fillText(title1, cnv.width/2 - title1.w/2, 90);
      fillText(title2, cnv.width/2 - title2.w/2, 170);

      fillText(startTxt, cnv.width/2 - startTxt.w/2, cnv.height - 10);

      drawWorldsInfo();
    },

    finish: function() {
      switchState(INTRO_STATE);
    }
  };
}

function savedWorldsInfo() {
  if (typeof(localStorage) === 'undefined') return;

  localStorage.setItem('keeper-saved', savedWorlds);
  localStorage.setItem('keeper-lost', lostWorlds);
}