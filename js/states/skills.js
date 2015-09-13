function skillState(step, msgTxt, nextLvl) {

  var tmpSpeed = 1.5;

  var skillsText = {
    t: "Skills",
    f: "80px Sans-serif",
    c: "#FAFAFA"
  };

  var testsText = {
    t: "Tests",
    f: "80px Sans-serif",
    c: "#FAFAFA"
  };

  var step1Text = {
    t: "Step "+step+":",
    f: "60px Sans-serif",
    c: "#FAFAFA"
  };

  var msg1Text = {
    t: msgTxt,
    f: "40px Sans-serif",
    c: "#FAFAFA"
  };

  var pStartTxt = {
    t: "Prepare to start",
    f: "40px Sans-serif",
    c: "#F0F0F0"
  };

  return {
    create: function() {

      if (typeof(Storage) !== 'undefined') {
        //save the current tutorial step
        localStorage.setItem('keeper-tutorial', step);
      }

      textWidth([
        skillsText,
        testsText,
        step1Text,
        msg1Text,
        pStartTxt
      ]);

      configLvl(70, 200, [-70, 70], 
        null, null, null, false, 
        false, false, false, false, 
        null
      );
    },

    update: function() {
      tmp -= tmpSpeed;

      if (tmp <= -70) {
        this.finish();
      }

      fillText(skillsText, center(skillsText.w, cnv.width) - 30, 100);
      fillText(testsText, center(testsText.w, cnv.width) + 30, 180);

      ctx.fillRect(0, 230, cnv.width, 5);

      fillText(step1Text, center(step1Text.w, cnv.width), 350);

      fillText(msg1Text, center(msg1Text.w, cnv.width), 480);
      drawSquare(center(msg1Text.w + 90, cnv.width), 420, msg1Text.w + 90, 100, "#FDFDFD");

      fillText(pStartTxt, center(pStartTxt.w, cnv.width), cnv.height-5);      
    },

    finish: function() {
      switchState(nextLvl)
    }
  };
}
