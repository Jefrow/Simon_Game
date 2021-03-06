let buttonColours = ['red', 'blue', 'green', 'yellow'];
let userClickPattern = [];
let gamePattern = []; 
let Levels = [];

var level = 0;
var started = false;                //states that the game has not started yet. 

function startGame(){
    if(!started){                                       //used if state ment to make sure that the game starts with only one keypress. 
        $("#level-title").text("Level " + level);      
        nextSequence();
        started=true;
    }
}

$(document).keydown(function(){         //Event Listener to start the game by pressing keyboard.
    startGame();
})

$(".startBtn").click(function(){       //EventListener to start the game by clicking on title. 
    startGame();
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userClickPattern.push(userChosenColour);
    
    playSound(userChosenColour);        //refactor the code so that playSound() will work when the user clicks the buttons. 
    animatePress(userChosenColour);     //calls animatePress() and passes the userChosenColor as a parameter.
    checkAnswer(userClickPattern.length-1);  //calls checkAnswer() passing the chosen color as a parameter. 
});


function nextSequence (){
    userClickPattern = [];
    level++
    var randomNumber = Math.floor(Math.random()*4);          //generates a number from 0-4. 
    var randomChosenColour = buttonColours[randomNumber];       
    gamePattern.push(randomChosenColour);

    $ ("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour); 

    $("#level-title").text("Level " + level);
    
    console.log(gamePattern);
    
    Levels.push(level);
    console.log(Levels);
}


function playSound(name){   // Create a new fucntion called playSound() that takes a single input parameter called name.

    //Take the colde we use to play sound in the nextSequence() function and add it to new fucntion playSound().
    var audio = new Audio('sounds/'+ name +'.mp3');
    audio.play();

}


function animatePress(currentColour){ //create a new function animatedPressed() that takes in a single parameter called currentColour

    $("#" + currentColour).addClass("pressed");        //adds pressed class to the button that gets clicekd. 
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed"); //removes pressed class from the button after a 100millisecond delay. 
    },100);
}



// How the game works. 
// 1.Firstly, the game shows the first colour in th esequence (i.e. Blue). the user clicks on th blue button. 
// 2.Next, the game shows the next colour (red), the user has to remember the sequence is blue, red and so on and so forth. 
// If the user messes up the sequence, then the game ends. 


function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){  //checks the the last index of the array on the current level is the same. 
        console.log("success");    //if indexes match, then its a success. 
        
        if(gamePattern.length === userClickPattern.length){   //check the inedexes of gamePattern[] and userClickPattern[] to see if they match. 
             
            setTimeout(function(){    //if they are, then the game will call the next secquence function after a 10000millisecond delay. 
                nextSequence();
            },1000); 
            console.log(userClickPattern); 
        }
        
    }else{ //if the player clicks on the wrong color...
        var audio = new Audio('sounds/wrong.mp3');      //play the "wrong" audio. 
        audio.play();
        $('body').addClass("game-over");            //turn the background red.
        $("#level-title").text("Game Over, Click here or any key to Restart");   //changes from current level to "Game Ove, Press any key to restart"
        $(".highestLevel").text("Best: " + Math.max(...Levels));
        
        console.log("Highscore: " + Math.max(...Levels));
        
        setTimeout(function(){
            $('body').removeClass("game-over");     //remove red background. 
        },200);

        startOver();                //start the game over.
    }
    
}



function startOver(){           //start over function to reset all arrays to 0, game level to 0 and started variable to false. 
    level = 0;
    gamePattern = [];
    userClickPattern = [];
    started = false;
}

