$(document).ready(function () {

var index = 0;  //used to determine which question we are on
var right = 0;
var wrong = 0;
var guessed;
var correctAnswer= "";
var hasGuessed= false;
var timer= 10;

//all correct answers are in index 0, we use a shuffle function to randomize where they appear
var questionSet = [

           { question: "1. What was Captain Wentworth's first ship?",
                answer: ["the Asp", "the Laconia", "the Thrush", "the Harville"]},                                   

           { question: "2. What is the name of the horse Willoughby gives to Marianne in Sense and Sensibility?",
                answer: ["Queen Mab ", "Lady Grey", "Guinnevere", "Brown Bess"]},

           { question: "3. How did Marianne Dashwood get injured? ",
                answer: ["By falling down a hill ", "In a horse riding accident", "At a dance", "Falling down the stairs"]},

           { question: "4. Where do the Bennets live?",
                answer: ["Hertfordshire", "Herefordshire", "Hampshire ", "Hartford"]},

           { question: "5. How many nieces and nephews does Emma have?",
                answer: ["5", "4", "3", "0"]},

           { question: "6. How many of Jane Austen's novels were published during her lifetime? ",
                answer: ["Four", "Two", "None", "All of them"]},

           { question: "7. Jane Austen's 'Northanger Abbey' contains one of the earliest printed references to what sport? ",
                answer: ["Baseball" , "Golf", "Football", "Cricket"]},

           { question: "8. What was Austen's first published novel? ",
                answer: ["Sense & Sensibility", "Lady Susan", "Pride and Prejudice", "Emma"]}

];// end question set array

// create copy of array so we can shuffle elements inside while leaving original alone
var questionSetCopy = JSON.parse(JSON.stringify( questionSet ));


//this function is to shuffle the answers so it's not the same every time
function shuffle(arr) {
    var counter = arr.length;
    while (counter > 0) {        
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

$("#status").hide();
$("#timer").hide();
$("#question").hide();
$("#answers").hide();

$("#start").on("click", function(){
  questionDisplay();
}); 

function questionDisplay(){
          

          $("#status").show();
          $("#timer").show();
          $("#question").show();
          $("#answers").show();
          $("#start").hide();

          hasGuessed=false;
        
          $("#status").hide();
          $("#timer").html("Time Remaining: " + timer);
        
          shuffle(questionSetCopy[index].answer);                 
          $("#question").html("Question "+ (questionSet[index].question));
          $("#answers").empty();
                    
          for (let j=0; j<4; j++){ 
           var answer = $("<li>");
           answer.attr("data-text", questionSetCopy[index].answer[j]);
           answer.text(questionSetCopy[index].answer[j]);
          $("#answers").append(answer);     
            

          }   

          correctAnswer = questionSet[index].answer[0]; // all correct answers are in index 0
           
          countDown();
          index++;

          $("li").on("click", function(){ 

           if(hasGuessed) {
             return false;
           } else {
          guessed =  $(this).attr("data-text");
          if (guessed == correctAnswer){
          
          $("li").addClass("incorrect");
          $(this).addClass("correct").removeClass("incorrect");
          }
          
          guess()
        }
        });                 
}

function countDown() {    
    var timeLeft= timer;
    $("#timer").show();    
    var count = setInterval(function() {
      timeLeft--;
      $("#timer").html("Time Remaining: " + timeLeft);
      
      if(timeLeft>0 && hasGuessed){
        clearInterval(count); 
        return false;
     }     
      
      if (timeLeft == 0) {
        
        clearInterval(count);
        setTimeout(function() {   //this is necessary to delay a bit to allow the time remaining to read 0

          if(!hasGuessed){
          
          $("#status").html("Times Up!"); 
          $("#status").show();           
          } 
          hasGuessed= true;                   
          wrongAnswer();          
        }, 250);
      }   

    }, 1000);  
  

  }// end countdown function

function guess()  {


  if( guessed === correctAnswer ){

    $("#status").removeClass("wrong");
    $("#status").html("Good Job!"); 
    $("#status").show();
    rightAnswer();

  }

  else {
  $("#status").addClass("wrong");  
  $("#status").html("Sorry that's wrong"); 
  $("#status").show();
  
  wrongAnswer();
  }
}


function wrongAnswer(){
       wrong++;

       if (index==8){
        displayEnd();
        return;
      } 

       hasGuessed = true;
        
      
       setTimeout(function() { 
        questionDisplay();          
      }, 2800);
    }

function rightAnswer(){  
       right++;

       if (index==8){
         displayEnd();
         return;
       } 

       hasGuessed = true; 
             
       setTimeout(function() { 
        questionDisplay();          
          }, 2800);
}

function displayEnd(){

  $("#start").on("click", function(){
    questionDisplay();
  });
  $("#status").removeClass("wrong");
  $("#status").html("Game Over");
  $("#question").html("<br>You got " + right + " correct and " + wrong + " wrong! Play again?");
  $("#status").show();
  $("#timer").hide();
  $("#question").show();
  $("#answers").hide();
  $("#start").show();
  index = 0;  
  right = 0;
  wrong = 0;
  guessed;
  correctAnswer= "";
  hasGuessed= false;
  questionSetCopy = JSON.parse(JSON.stringify( questionSet )); 
  return;
  

}


});//document ready function

