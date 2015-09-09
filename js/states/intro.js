function introState() {

  var temperature = -200;
  var maxTemperature = 200;
  
  /* first step texts */
  var hiText = {
    text: "",
    font: "100px Sans-serif",
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

    }, 
    update: function() {

      temperature += 5;

      if (temperature > maxTemperature) {
        temperature = -maxTemperature;
        step += 1;

        if (step => steps.length) {
          switchGameState(LEVEL1_STATE);
        }
      }

      clearCanvas();

      steps[step]();

      drawTemperatureBar(temperature, maxTemperature);
      drawTemperatureText(temperature);
    },
    destroy: function() {

    }
  };
}