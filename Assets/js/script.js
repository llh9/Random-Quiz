// When the site loads
//references to buttons
var startBtn = document.querySelector("#startBtn");
var timer = document.querySelector("#timer");
var textArea = document.querySelector("#question");
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
//logic arrays
var qstnArray = ["What's my favorite color?","What is the name of the main character in the movie 'Nightmare Before Christmas?","Which weighs more? ","How much wood would a wood pecker peck if wood pecker could peck wood?","How tall was Abraham Lincoln"];
var numArray = ["#1","#2","#3","#4","#5"];
var rtAnsArray = ["d","c","d","d","a"];
var chAnsArray = ['','','','',''];
var aArray = ["blue","Cinderella","a lb of fish","none","6ft 4in"];
var bArray = ["white","Jack Black","a lb of rocks","all","6ft 1in"];
var cArray = ["purple","Jack Skelington","a lb of air","most","6ft 6in"];
var dArray = ["red & black","Landon","none of the above","as much as is needed to get them bugs out of there","6ft"];
var secondsLeft = 120;
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

    var timerInterval
    function setTime() {
        // Sets interval in variable
            timerInterval = setInterval(function() {
          secondsLeft--;
          timer.textContent = secondsLeft + "s";
      
          if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            alert("Your time has run out!");
            getResults();
          }
      
        }, 1000);
    }
    setTime();

    //Place first question and set of answers into txt areas
    var crntQ = 0;
    console.log(crntQ);
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

    console.log(crntQ);

    next.addEventListener("click", function(event){

        nxt();
    });

    prev.addEventListener("click", function(event){

        last();
        
    });



    //Calculate and Display Results
    function getResults(){
        document.getElementById("aBtn").disabled = true;
        document.getElementById("bBtn").disabled = true;
        document.getElementById("cBtn").disabled = true;
        document.getElementById("dBtn").disabled = true;
        document.getElementById("Previous").disabled = true;document.getElementById("Next").disabled = true;
        clearInterval(timerInterval);
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
        console.log(chAnsArray);
        console.log(rtAnsArray);
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





