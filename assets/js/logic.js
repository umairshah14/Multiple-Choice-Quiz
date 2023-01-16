// LOGIC
var questions = [
  {
    questionTitle: "Fav football team",
    choices: ["Arsenal", "Man Utd", "Man City", "Chelsea"],
    answer: "Arsenal",
  },
  {
    questionTitle: "Best color combo",
    choices: ["Red + White", "Green + Red", "Yellow + Green", "Blue + Blue"],
    answer: "Red + White",
  },
  {
    questionTitle: "Worst football team",
    choices: ["Arsenal", "Man Utd", "Man City", "Spurs"],
    answer: "Spurs",
  },
  {
    questionTitle: "Whos an Ex Arsenal Player",
    choices: ["Thierry Henry", "John Terry", "Alan Shearer"],
    answer: "Thierry Henry",
  },
];
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector(".timer");
var finalScoreEl = document.querySelector("#final-score");
var questionsEl = document.querySelector("#questions");
var submitEl = document.querySelector("#submit");
var initialScoreEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var choicesEl = document.querySelector("#choice");
var startScreenEl = document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen");

var quizIndex = 0;
var timeAmount = questions.length * 5;

var choicesHolder = document.querySelectorAll("choices");

var sfxCorrect = new Audio("./assets/sfx/correct.wav");
var sfxIncorrect = new Audio("./assets/sfx/incorrect.wav");
var timerId 

// HIGHSCORES
var highscoresEl = document.querySelector("#highscores");


var finalScore = 0
// Function to start quiz
function startQuiz() {
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerEl.textContent = timeAmount;
  timerId = setInterval(timer, 1000);
  getQuestion();
}

// Function to get the questions
function getQuestion() {
  var currentQuestion = questions[quizIndex];
  var question = document.querySelector("#question-title");
  var choicesHolder = document.querySelector("#choices");
  question.textContent = currentQuestion.questionTitle;
  
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choices");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choicesHolder.appendChild(choiceBtn);
    choiceBtn.addEventListener("click", function () {

      if (quizIndex === questions.length - 1 ) {
        if (choiceBtn.value === currentQuestion.answer) {
            finalScore ++
            sfxCorrect.play();
          }
          finalScoreEl.textContent = finalScore + "/" + questions.length
          questionsEl.setAttribute("class", "hide")
          endScreenEl.setAttribute("class", "visible");
          console.log(finalScore);
          clearInterval(timerId)
        return
      }

      if (choiceBtn.value === currentQuestion.answer ) {
        finalScore ++
        console.log(finalScore);
        question.textContent = questions[quizIndex].questionTitle;
        sfxCorrect.play();
        quizIndex++;
        choicesHolder.innerHTML = "";
        getQuestion();
        
      } else if (choiceBtn.value !== currentQuestion.answer){
        question.textContent = questions[quizIndex].questionTitle;
        console.log(finalScore);
        sfxIncorrect.play();
        quizIndex++;
        choicesHolder.innerHTML = "";
        getQuestion();
      }
    });
  });
}
function timer() {
  timeAmount--;
  timerEl.textContent = timeAmount;
}


// Function to check if you've pressed enter and for saving the high score


submitEl.addEventListener('click', function(){
    
    // append the score to the high score page
    var highscoresItem = document.createElement("li");
    highscoresItem.textContent = finalScore;
    highscoresEl.appendChild(highscoresItem);

})

startBtn.onclick = startQuiz;
