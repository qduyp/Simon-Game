
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence(){
  level++;
  userClickedPattern = [];

  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColor[randomNumber];
  gamePattern.push(randomColor);

  $("."+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).bind('keypress',function(){
  if(!started){
    nextSequence();
    started = true;
  }
})

$(".btn").bind('click',function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

  animatePress(userChosenColour);
  playSound(userChosenColour);
})

function playSound(sound){
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100)
}
