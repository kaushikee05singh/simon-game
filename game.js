var buttoncolors = ["red", "blue", "green", "yellow"];

var userClickPattern= [];

var gamePattern = [];
var started = false;
var level = 0;



$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started= true;
    }
});

$( ".btn" ).click( function() {

    var userChosencolour = $(this).attr("id");
    userClickPattern.push(userChosencolour);
    playSound(userChosencolour);
    animatePress(userChosencolour);
    checkAnswer(userClickPattern.length-1);

});


function nextSequence() {

    userClickPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

    var randomnumber =  Math.floor(Math.random()*4);
    var randomChosencolor = buttoncolors[randomnumber];
    gamePattern.push(randomChosencolor);

    $("#"+ randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosencolor);
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();


  }

function animatePress(currentColor) {
    
    $("#" + currentColor ).addClass( "pressed" );
    setTimeout(function () {
        $("#" + currentColor ).removeClass( "pressed" );
    }, 100);

}

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel]=== gamePattern[currentLevel]) {
        console.log("success");

    if (userClickPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();            
        },1000)
    }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            
            $("body").removeClass("game-over");
        },200)

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();

    }
}
  
function startover() {
    level=0;
    gamePattern=[];
    started= false;
}
