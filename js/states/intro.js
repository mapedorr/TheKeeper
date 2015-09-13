function introState() {

  var currentTutorial = 0;
  var tmpSpeed = 0.5;

  var messages = [
    "loading propulsors",
    "detecting user mood",
    "cleaning dishes",
    "preparing coffee",
    "taking nap pills",
    "asking for indications",
    "writing a song",
    "holding breath",
    "thinking a joke",
    "flirting with OS"
  ];
  var loadingText = null;

  /* first step texts */
  var hiText = {
    f: "70px Sans-serif",
    t: "Hi",
    c: "#FDFDFD"
  };

  var keeperText = {
    t: "keeper",
    f: "85px Sans-serif",
    c: "#FDFDFD"
  };

  var nickText = {
    t: "",
    f: "95px Sans-serif",
    c: "#F0F0F0"
  };

  return {
    create: function() {
      //check if localStorage is available
      if (typeof(Storage) !== "undefined") {

        //get nick if already exists
        var nick = localStorage.getItem("keeper-nick");

        if (!nick){ //check if doesnt exist a nick yet
          hiText.t = "Hi";  //greet for the first very
          nick = genNick(); //get a random nick
          localStorage.setItem("keeper-nick", nick);  //storage the nick
        }
        else {
          hiText.t = "Hi again";  //welcome back keeper
          firstTime = false;
        }
        
        currentTutorial = parseInt(localStorage.getItem("keeper-tutorial"));
        nickText.t = nick; //set the nick t
      }

      loadingText = {
        t: messages[Math.floor(Math.random(messages.length) * messages.length)],
        f: "40px Sans-serif",
        c: "#F0F0F0"
      };

      textWidth([
        hiText,
        keeperText,
        nickText,
        loadingText
      ]);

      configLvl(-70, 200, [-70, 70],  //temp, maxT, range
        null, null, null, false,//level time, range time, degress lap, is world
        false, false, false, false, //win, lose, time bar, degress txt flasg
        null  //circles
      );
    }, 

    update: function() {

      if (tmp >= 70) {
        this.finish();
        return;
      }

      tmp += tmpSpeed;

      // get loading message
      if(Math.abs(tmp%50) == 0) {
        loadingText.t = messages[Math.floor(Math.random(messages.length) * messages.length)];
        textWidth(loadingText);
      }

      fillText(hiText, center(hiText.w, cnv.width), 100);
      fillText(keeperText, center(keeperText.w, cnv.width), 210);
      fillText(nickText, center(nickText.w, cnv.width), 390);
      drawSquare(center(nickText.w + 90, cnv.width), 300, nickText.w + 90, 110, "#FDFDFD");
     
      fillText(loadingText, center(loadingText.w, cnv.width), cnv.height-5);
    },

    finish: function() {
      if (currentTutorial <= 3) {
        switchState(SKILL1_STATE+currentTutorial-1);
      }
      else {
        switchState(LVLGEN_STATE);
      }
    }
  };
}