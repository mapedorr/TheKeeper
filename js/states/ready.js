function readyState(step, msgTxt, nextLvl) {

  var tmpSpeed = 1.0;

  var youSeemText = {
    t: "You seem",
    f: "50px Sans-serif",
    c: "#FAFAFA"
  };

  var beReadyText = {
    t: "to be ready",
    f: "50px Sans-serif",
    c: "#FAFAFA"
  };

  var workText = {
    t: "Let's work",
    f: "90px Sans-serif",
    c: "#4DCC00"
  };

  var pleaseText = {
    t: "Please, do it well",
    f: "40px Sans-serif",
    c: "#FAFAFA"
  };

  return {
    create: function() {

      if (typeof(Storage) !== 'undefined') {
        //save the current tutorial step
        localStorage.setItem('keeper-tutorial', 4);
      }

      textWidth([
        youSeemText,
        beReadyText,
        workText,
        pleaseText
      ]);

      configLvl(-100, 100, [-100, 100], 
        null, null, null, false, 
        false, false, false, false, 
        null
      );
    },

    update: function() {
      tmp += tmpSpeed;

      if (tmp >= 100) {
        this.finish();
      }

      fillText(youSeemText, center(youSeemText.w, cnv.width), 100);
      fillText(beReadyText, center(beReadyText.w, cnv.width), 140);
      
      fillText(workText, center(workText.w, cnv.width), 320);
            
      fillText(pleaseText, center(pleaseText.w, cnv.width), 550);
    },

    finish: function() {
      switchState(LVLGEN_STATE)
    }
  };
}
