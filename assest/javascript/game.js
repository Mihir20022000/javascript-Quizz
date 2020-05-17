const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const process = document.getElementById("process");

console.log(choices);
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
  ];

//constant
const correct_Bonus = 10;
const Max_questions = 3;



startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewquestion();
};

getNewquestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= Max_questions) {
      localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end.html");
      }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + Max_questions;
     var widthf = questionCounter/Max_questions * 100;
    process.style.width = widthf + "%";
    
      


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    console.log(questionIndex);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    console.log(choices);

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
      });

      availableQuestions.splice(questionIndex, 1);
      console.log(availableQuestions);
      acceptingAnswer = true;

};

    choices.forEach(choice => {
        choice.addEventListener("click", e => {
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
startGame();
 


