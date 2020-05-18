const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const process = document.getElementById("process");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch("assest/javascript/questions.json").then(res => {
  return res.json();
})
.then(loadedQuestions =>{
  questions = loadedQuestions;
  startGame();
});

//constant
const correct_Bonus = 10;
const Max_questions = 5;



startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewquestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    
};

getNewquestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= Max_questions) {
      localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
      }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + Max_questions;
     var widthf = questionCounter/Max_questions * 100;
    process.style.width = widthf + "%";
    
      


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
      });

      availableQuestions.splice(questionIndex, 1);
      acceptingAnswer = true;

};

    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            game.classList.remove("hidden");
            loader.classList.add("hidden");
            if(!acceptingAnswer) return;

            acceptingAnswer = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
  
            if(selectedAnswer == currentQuestion.answer){
              choice.parentElement.classList.add("correct");
              incrementScore(correct_Bonus);  
            };
           
          
            setTimeout(function(){
              choice.parentElement.classList.remove("correct");
      
              getNewquestion();
              

            },700);
      
        });
    });

    incrementScore = num => {
      score += num;
      scoreText.innerText = score;
    };
 


