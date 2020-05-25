var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
// var start = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
playSound(userChoosenColor);
  animatePress(userChoosenColor);

  checkAnswer(userClickedPattern.length - 1);
})



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
        nextSequence();
        }, 1000);
      }
    } else {
      console.log("fail");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
    }

  }

  function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

  function playSound(name) {
    var audioSong = new Audio("sounds/" + name + ".mp3");
    audioSong.play();
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function startOver() {
level = 0;
gamePattern = [];
started = false;
}
