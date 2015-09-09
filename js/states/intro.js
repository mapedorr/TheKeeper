function introState() {

  var maxTemperature = 200;
  var temperatureRange = [-70, 70];
  var temperature = temperatureRange[0];
  var messages = [
    "loading machine propulsors",
    "detecting user mood",
    "cleaning ship",
    "preparing coffee",
    "balancing -t- indicators",
    "loading nap pills",
    "asking for indications",
    "signing a song",
    "holding breath",
    "thinking a joke",
    "starting server",
    "being hypocritical",
    "flirting with OS"
  ];
  var loadingText = null;

  /* first step texts */
  var hiText = {
    text: "",
    font: "100px Sans-serif",
    text: "Hi",
    font: "70px Sans-serif",
    color: "#313131"
  };

  var keeperText = {
    text: "keeper!",
    font: "90px Sans-serif",
    color: "#313131"
  };

  var nickText = {
    text: "",
    font: "95px Sans-serif",
    color: "#000"
  };

  /* second step texts */
  var skillsText = {
    text: "Skills",
    font: "90px Sans-serif",
    color: "#313131"
  };

  var testsText = {
    text: "Tests",
    font: "90px Sans-serif",
    color: "#313131"
  };

  var step1Text = {
    text: "Step 1:",
    font: "60px Sans-serif",
    color: "#313131"
  };

  var msg1Text = {
    text: "Cold the room",
    font: "40px Sans-serif",
    color: "#313131"
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
    fillText(testsText, center(testsText.width, canvas.width) + 30, 200);

    context.fillRect(0, 230, canvas.width, 5);

    fillText(step1Text, center(step1Text.width, canvas.width), 300);
    fillText(msg1Text, center(msg1Text.width, canvas.width), 400);

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

      loadingText = {
        text: messages[Math.floor(Math.random(messages.length) * messages.length)],
        font: "40px Sans-serif",
        color: "#F0F0F0"
      };
      setTextWidth(loadingText);

    }, 
    update: function() {

      temperature += 1;

      if (temperature > maxTemperature) {
        temperature = -maxTemperature;
        // step += 1;

        if (step => steps.length) {
          switchGameState(LEVEL1_STATE);
        }
      }

      clearCanvas();

      steps[step]();

      drawTemperatureBar(temperature, maxTemperature);
      // get loading message
      if(Math.abs(temperature%50) == 0){
        loadingText.text= messages[Math.floor(Math.random(messages.length) * messages.length)];
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