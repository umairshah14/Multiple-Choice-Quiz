var startBtn = document.querySelector("#start");
var timerEl = document.querySelector(".timer");
var finalScoreEl = document.querySelector("#final-score");
var questionsEl = document.querySelector("#questions");
var submitEl = document.querySelector("#submit");
var initialScoreEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var choicesEl = document.querySelector("#choice");
var startScreenEl = document.querySelector("#start-screen");
var quizIndex = 0;
var timeAmount = 30; //questions.length * 5;
// var timerID;
var gameState = false;

var sfxCorrect = new Audio("./assets/sfx/correct.wav");
var sfxIncorrect = new Audio("./assets/sfx/incorrect.wav");

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

// Function to start quiz
function startQuiz() {
  gameState = true;
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerEl.textContent = timeAmount;
  setInterval(timer, 1000);
  getQuestion();
}

// Function to get the questions
function getQuestion() {
  var currentQuestion = questions[quizIndex];
  var question = document.querySelector("#question-title");
  question.textContent = currentQuestion.questionTitle;

  currentQuestion.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choices");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    document.body.appendChild(choiceBtn);
    choiceBtn.addEventListener("click", function () {
      console.log("in event listener");
      if (choiceBtn.value === currentQuestion.answer) {
        question.textContent = questions[quizIndex].questionTitle;
        sfxCorrect.play();
        quizIndex++;
        currentQuestion.innerHTML = ""
        getQuestion();
      } else {
        sfxIncorrect.play();
      }
    });
  });
}

// One tip I can give is to write code that removes the answers from the last question, possibly a condition that checks if the you are on the next question
function timer() {
  timeAmount--;
  timerEl.textContent = timeAmount;
}

// Function to end the quiz

// Function for saving the high score

// Function to check if you've pressed enter

startBtn.onclick = startQuiz;
