function introState() {

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

  /* second step texts */
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
    t: "Step 1:",
    f: "60px Sans-serif",
    c: "#FAFAFA"
  };

  var msg1Text = {
    t: "Cold the room",
    f: "40px Sans-serif",
    c: "#FAFAFA"
  };

  var objectiveText = {
    t: "-100°C < t < -10°C",
    f: "35px Sans-serif",
    c: "#FAFAFA"
  };

  var step = 0;
  var steps = [
    firstStep,
    secondStep
  ];

  function firstStep() {
    if (tmp >= 70) {
      nextStep()  
    }

    fillText(hiText, center(hiText.w, cnv.width), 100);
    fillText(keeperText, center(keeperText.w, cnv.width), 210);
    fillText(nickText, center(nickText.w, cnv.width), 390);
    drawSquare(center(nickText.w + 90, cnv.width), 300, nickText.w + 90, 110, "#FDFDFD");
  }

  function secondStep() {
    if (tmp <= -70) {
      nextStep();
    }

    fillText(skillsText, center(skillsText.w, cnv.width) - 30, 100);
    fillText(testsText, center(testsText.w, cnv.width) + 30, 180);

    ctx.fillRect(0, 230, cnv.width, 5);

    fillText(step1Text, center(step1Text.w, cnv.width), 350);
    fillText(msg1Text, center(msg1Text.w, cnv.width), 450);
    fillText(objectiveText, center(objectiveText.w, cnv.width), 510);
    drawSquare(center(msg1Text.w + 90, cnv.width), 395, msg1Text.w + 90, 140, "#FDFDFD");

  }

  function nextStep() {
    step += 1;

    if (step == 1){
      tmpSpeed = -1.5;
      //set time in range
    }

    if (step >= steps.length) {
      switchState(LEVEL1_STATE);
    }
  }

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
        }
        
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
        skillsText,
        testsText,
        step1Text,
        msg1Text,
        objectiveText, 
        loadingText
      ]);

      configLvl(-70, 200, [-70, 70],  //temp, maxT, range
        null, null, null, false,//level time, range time, degress lap, is world
        false, false, false, false, //win, lose, time bar, degress txt flasg
        null  //circles
      );
    }, 

    update: function() {

      tmp += tmpSpeed;
      steps[step]();

      // get loading message
      if(step == 0){
        if(Math.abs(tmp%50) == 0){
          loadingText.t = messages[Math.floor(Math.random(messages.length) * messages.length)];
          textWidth(loadingText);
        }
      }else{
        loadingText.t = "prepare to start";
        textWidth(loadingText);
      }

      fillText(loadingText, center(loadingText.w, cnv.width), cnv.height-5);
    },

    finish: function() {
    }
  };
}