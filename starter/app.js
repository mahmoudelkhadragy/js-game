/*
global console

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, lastDice,
    btnRoll = document.querySelector(".btn-roll"),
    btnHold = document.querySelector(".btn-hold"),
    btnNew = document.querySelector(".btn-new"),
    finalScore,
    btnScore = document.querySelector(".btn-score");// it will be alwayes from 1 to 6 


//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.getElementById("current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var x = document.querySelector("#score-0").textContent;
//console.log(x);

function init() {
    "use strict";
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    document.getElementById("score-0").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    
    document.querySelector(".player-0-panel").classList.add("active");
    
    
}


init();    

btnRoll.addEventListener("click", function () {
    "use strict";
    
    if (gamePlaying) {// it is for to see it the game is still playing then do this function and if not don't do anything 
        
        // random number as we click roll button 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // display the resul
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = 'dice-' + dice1 + ".png";
        document.getElementById("dice-2").src = 'dice-' + dice2 + ".png";
        
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
     
    //update the round score if the rolled number not the 1
        /*if (lastDice === 6 && dice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = 0;
            nextPlayer();
            
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        
        }*/
        
        lastDice = dice;
        
    }
    
    
    
    
});

btnHold.addEventListener("click", function () {
    "use strict";
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;
    
        // update the ui
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector("#finalScore").value,
            winningScore;
        //check if the player won the game
        
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
    
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // next player 
            nextPlayer();
        }
    }
    
    
});


function nextPlayer() {
    "use strict";
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    //add and remove class active from the current player
    document.querySelector('.player-0-panel').classList.toggle("active");
    document.querySelector('.player-1-panel').classList.toggle("active");
        
    //document.querySelector('.player-0-panel').classList.remove("active");
    //document.querySelector('.player-1-panel').classList.add("active");
        
    //hide the dice from the game if it is 1
    diceDom.style.display = "none";
}


btnNew.addEventListener("click", init);











