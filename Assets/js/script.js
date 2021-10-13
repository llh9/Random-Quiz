//set of variables to reference html items
/*    //local storage variables
var timer = document.querySelector("#timer");
var qNum = document.querySelector("#QNum");
var textArea = document.querySelector("#question");
var startBtn = document.querySelector("#startBtn");
var ansSec = document.querySelector(".btn");
var aBtn = document.querySelector("#aBtn");
var bBtn = document.querySelector("#bBtn");
var cBtn = document.querySelector("#cBtn");
var dBtn = document.querySelector("#dBtn");
var aBtn = document.querySelector("#aTxt");
var bBtn = document.querySelector("#bTxt");
var cBtn = document.querySelector("#cTxt");
var dBtn = document.querySelector("#dTxt");

//set of logic variables 
var numArray = ["#!","#2","#3","#4","#5"];
var qstnArray = ["q1","q2","q3","q4","q5"];
var rtAnsArray = ["b","b","b","b","b"];
var aArray = ["a","a","a","a","a"];
var bArray = ["b","b","b","b","b"];
var cArray = ["c","c","c","c","c"];
var dArray = ["d","d","d","d","d"];
var scoreTally = [0,0,0,0,0];*/


// When the site loads
var startBtn = document.querySelector("#startBtn");
var timer = document.querySelector("#timer");
var secondsLeft = 20;
var textArea = document.querySelector("#question");
var qstnArray = ["What's your favorite color?","What is the name of the main character in the movie 'Nightmare Before Christmas?","Which weighs more? ","How much wood would a wood pecker peck if wood pecker could peck wood?","How tall was Abraham Lincoln"];
var numArray = ["#1","#2","#3","#4","#5"];
var rtAnsArray = ["b","b","b","b","b"];
var chAnsArray = ['','','','',''];
var qNum = document.querySelector("#QNum");
var aTxt = document.querySelector("#aTxt");
var bTxt = document.querySelector("#bTxt");
var cTxt = document.querySelector("#cTxt");
var dTxt = document.querySelector("#dTxt");
var aBtn = document.querySelector("#aBtn");
var bBtn = document.querySelector("#bBtn");
var cBtn = document.querySelector("#cBtn");
var dBtn = document.querySelector("#dBtn");
var prev = document.querySelector("#Previous");
var next = document.querySelector("#Next");
var aArray = ["blue","a","a","a","a"];
var bArray = ["white","b","b","b","b"];
var cArray = ["red","c","c","c","c"];
var dArray = ["black","d","d","d","d"];
//when the start button is clicked
startBtn.addEventListener("click", function(event){
    event.preventDefault();

    //Ask user for a user name. Store respinse in "var user;"
    var user = prompt("Please enter your User Name");

    //If user is retaking the quiz, access thier user file.
    var userSearcher = localStorage.getItem(user);

    //If user is taking the quiz for the first time then make a new user file who's key is their given User Name 
    if(userSearcher == null){
        var initUser = {
            timesTaken: "0", 
            highScore: "0", 
            currentScore: "0"
        };

        //Setup New User File
        localStorage.setItem(user, JSON.stringify(initUser));
    }

    //Place first question and set of answers into txt areas
    var crntQ = 0;
    if(crntQ == 0){
        textArea.textContent = qstnArray[crntQ];
        qNum.textContent = numArray[crntQ];
        aTxt.textContent = aArray[crntQ];
        bTxt.textContent = bArray[crntQ];
        cTxt.textContent = cArray[crntQ];
        dTxt.textContent = dArray[crntQ];
        crntQ = crntQ + 1;
    }

    //when an answer button is clicked. 
    aBtn.addEventListener("click", function(event){
        chAnsArray[crntQ - 1] = 'a';
        //if answering last question, calculate & display results
        if(crntQ == 5){
            getResults();
        }else{
        nxt();
        }
    });

    bBtn.addEventListener("click", function(event){
        chAnsArray[crntQ - 1] = 'b';
        //if answering last question, calculate & display results
        if(crntQ == 5){
            getResults();
        }else{
        nxt();
        }
    });   

    cBtn.addEventListener("click", function(event){
        chAnsArray[crntQ - 1] = 'c';
        //if answering last question, calculate & display results
        if(crntQ == 5){
            getResults();
        }else{
        nxt();
        }
    });    

    dBtn.addEventListener("click", function(event){
        chAnsArray[crntQ - 1] = 'd';
        //if answering last question, calculate & display results
        if(crntQ == 5){
            getResults();
            return;
        }else{
        nxt();
        }
    });

    next.addEventListener("click", function(event){

        //if answering last question, calculate & display results
        if(crntQ == 5){
            getResults();
            return;
        }else{
        nxt();
        }
    });

    prev.addEventListener("click", function(event){

        //if answering last question, calculate & display results
        if(crntQ == 1){
            return;
        }else{
        last();
        }
    });



    //Calculate and Display Results
    function getResults(){
        document.getElementById("aBtn").disabled = true;
        document.getElementById("bBtn").disabled = true;
        document.getElementById("cBtn").disabled = true;
        document.getElementById("dBtn").disabled = true;
        document.getElementById("Previous").disabled = true;document.getElementById("Next").disabled = true;

        //extract local storage values and update them 
        //extract entire object
        var userUpdate = JSON.parse(localStorage.getItem(user));

        //target and update quiz attempts value
        var timesTook = parseInt(userUpdate.timesTaken);
        timesTook = timesTook + 1;

        //target high score value
        var hScore = parseInt(userUpdate.highScore);
        console.log(hScore);
        var score = 0;
        //calculate score
        for(i = 0; i < 5; i++){
            if(chAnsArray[i] == rtAnsArray[i] ){
                score++;
            };
        };
        //compare previous high score to current score. Update if score is the new high score 
        if(score > hScore){
            hScore = score;
        }
        console.log(score);
        console.log(hScore);
        //Restore user stats
        var updatedUser = {
            timesTaken: JSON.stringify(timesTook), 
            highScore: JSON.stringify(hScore), 
            currentScore: JSON.stringify(score)
        };  
        localStorage.setItem(user, JSON.stringify(updatedUser));
        console.log(localStorage.getItem(user));

        //Display Results
        textArea.textContent = "User: " + user + ", Last Score: " + score + ", High Score: " + hScore + ", Attempts: " + timesTook;
            
    }

   

    function nxt(){
        textArea.textContent = qstnArray[crntQ];
        qNum.textContent = numArray[crntQ];
        aTxt.textContent = aArray[crntQ];
        bTxt.textContent = bArray[crntQ];
        cTxt.textContent = cArray[crntQ];
        dTxt.textContent = dArray[crntQ];
        crntQ = crntQ + 1;

    }

    function last(){
        crntQ = crntQ - 1;
        textArea.textContent = qstnArray[crntQ];
        qNum.textContent = numArray[crntQ];
        aTxt.textContent = aArray[crntQ];
        bTxt.textContent = bArray[crntQ];
        cTxt.textContent = cArray[crntQ];
        dTxt.textContent = dArray[crntQ];

    }
    //when nav button is clicked 
    //when highlighted submit button is cliked 
  
});





