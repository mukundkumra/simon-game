var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function gameOver(){
    $("body").addClass("game-over");
    
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    
    $("#" + randomChosenColor).delay(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        gameOver();
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
    }
}