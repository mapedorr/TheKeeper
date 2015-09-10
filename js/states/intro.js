function introState() {

  var maxTemperature = 200;
  var temperatureRange = [-70, 70];
  var temperature = temperatureRange[0];
  var temperatureSpeed = 0.5;
  var objectiveTemperature = temperatureRange[1];
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
    text: "",
    font: "70px Sans-serif",
    text: "Hi",
    color: "#FDFDFD"
  };

  var keeperText = {
    text: "keeper",
    font: "85px Sans-serif",
    color: "#FDFDFD"
  };

  var nickText = {
    text: "",
    font: "95px Sans-serif",
    color: "#F0F0F0"
  };

  /* second step texts */
  var skillsText = {
    text: "Skills",
    font: "80px Sans-serif",
    color: "#FAFAFA"
  };

  var testsText = {
    text: "Tests",
    font: "80px Sans-serif",
    color: "#FAFAFA"
  };

  var step1Text = {
    text: "Step 1:",
    font: "60px Sans-serif",
    color: "#FAFAFA"
  };

  var msg1Text = {
    text: "Cold the room",
    font: "40px Sans-serif",
    color: "#FAFAFA"
  };

  var objectiveText = {
    text: "-100°C < t < -10°C",
    font: "35px Sans-serif",
    color: "#FAFAFA"
  };

  var step = 0;
  var steps = [
    firstStep,
    secondStep
  ];

  function firstStep() {
    fillText(hiText, center(hiText.width, canvas.width), 100);
    fillText(keeperText, center(keeperText.width, canvas.width), 210);
    fillText(nickText, center(nickText.width, canvas.width), 390);
    drawSquare(center(nickText.width + 90, canvas.width), 300, nickText.width + 90, 110);
  }

  function secondStep() {
    fillText(skillsText, center(skillsText.width, canvas.width) - 30, 100);
    fillText(testsText, center(testsText.width, canvas.width) + 30, 180);

    context.fillRect(0, 230, canvas.width, 5);

    fillText(step1Text, center(step1Text.width, canvas.width), 350);
    fillText(msg1Text, center(msg1Text.width, canvas.width), 450);
    fillText(objectiveText, center(objectiveText.width, canvas.width), 510);
    drawSquare(center(msg1Text.width + 90, canvas.width), 395, msg1Text.width + 90, 140);

  }

  return {
    create: function() {
      //check if localStorage is available
      if (typeof(Storage) !== "undefined") {

        //get nick if already exists
        var nick = localStorage.getItem("keeper-nick");

        if (!nick){ //check if doesnt exist a nick yet
          hiText.text = "Hi";  //greet for the first very
          nick = genNick(); //get a random nick
          localStorage.setItem("keeper-nick", nick);  //storage the nick
        }
        else {
          hiText.text = "Hi again";  //welcome back keeper
        }
        
        nickText.text = nick; //set the nick text
      }

      setTextWidth(hiText);
      setTextWidth(keeperText);
      setTextWidth(nickText);

      setTextWidth(skillsText);
      setTextWidth(testsText);
      setTextWidth(step1Text);
      setTextWidth(msg1Text);
      setTextWidth(objectiveText);

      loadingText = {
        text: messages[Math.floor(Math.random(messages.length) * messages.length)],
        font: "40px Sans-serif",
        color: "#F0F0F0"
      };
      setTextWidth(loadingText);

    }, 
    update: function() {

      temperature += temperatureSpeed;

      if (Math.abs(temperature) > Math.abs(objectiveTemperature)) {
        step += 1;
        temperatureSpeed = -1.5;
        objectiveTemperature = temperatureRange[0];

        if (step >= steps.length) {
          switchGameState(LEVEL1_STATE);
          return;
        }
      }

      clearCanvas();

      steps[step]();

      drawTemperatureBar(temperature, maxTemperature);
      // get loading message
      if(step == 0){
        if(Math.abs(temperature%50) == 0){
          loadingText.text= messages[Math.floor(Math.random(messages.length) * messages.length)];
          setTextWidth(loadingText);
        }
      }else{
        loadingText.text = "prepare to start";
        setTextWidth(loadingText);
      }
      fillText(loadingText, center(loadingText.width, canvas.width), canvas.height-5);
      // drawTemperatureText(temperature);

      // draw temperature objective range
      drawTemperatureRange(temperatureRange, maxTemperature);

      // update the moveable indicator
      drawMoveableTemperature(temperature, maxTemperature);
    },
    destroy: function() {

    }
  };
}