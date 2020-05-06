var color=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameStart=false;
function nextSequence(){
    var randomNumber=Math.floor(4*Math.random());
    var randomChosenColor=color[randomNumber];
    level++;
    $("h1").text("Level "+level);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
}
function playSound(name)
{
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor)
{
    currentColor.addClass("pressed");
    setTimeout(()=>{
        currentColor.removeClass("pressed");
    },100)
}
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        console.log("correct");
        if(currentLevel+1==gamePattern.length)
        {
            setTimeout(nextSequence,1000);
            userClickedPattern=[];
        }
    }else{
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    gameStart=false;
    userClickedPattern=[];
}
$(".btn").on("click",(e)=>{
    var userChosenColor=e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress($("#"+userChosenColor));
    checkAnswer(userClickedPattern.length-1)
})

$(document).on("keydown",()=>{
    if(gameStart===false)
    {
        gameStart=true;
        nextSequence();
    }
})
$(document).on("touchmove",()=>{
    if(gameStart===false)
    {
        gameStart=true;
        nextSequence();
    }
})
