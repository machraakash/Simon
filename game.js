var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  if (started = true) {
    $("h1").text("Level " + gamePattern.length + ".");
  }
  $("#" + randomChosenColor)
    .animate({ opacity: 0.2 }, 100)
    .animate({ opacity: 1.0 }, 100);
  playSound(randomChosenColor);
}

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

$("body").on("keypress", function () {
  nextSequence();
  started = true;
});

function playSound(name) {
  var buttonAudio = new Audio("sounds/" + name + ".mp3");
  buttonAudio.play();
  console.log(buttonAudio);
}

function animatePress(currentColor) {
  $(".btn").on("click", function (event) {
    var userClickedButton = event.target.id;
    $("#" + userClickedButton).addClass("pressed", 1000);
    setTimeout(function () {
      $("#" + userClickedButton).removeClass("pressed");
    }, 100);
  });
}

function checkAnswer() {
  if (
    userClickedPattern[userClickedPattern.length - 1] ===
    gamePattern[userClickedPattern.length - 1]
  ) {
    console.log("Correct click.");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Incorrect");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  $("body").addClass("game-over", 2000);
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("h1").text("Game Over!!! Press any key to restart.");
  started = false;
}