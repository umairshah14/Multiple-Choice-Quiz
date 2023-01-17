// LOGIC
var questions = [
  {
    questionTitle: "Which built-in method returns the length of the string?",
    choices: ["length()", "size()", "index()", "None of the above"],
    answer: "length()",
  },
  {
    questionTitle: "Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?",
    choices: ["toExponential()", "toFixed()", "toPrecision()", "toLocaleString()"],
    answer: "toFixed()",
  },
  {
    questionTitle: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
    choices: ["toSource()", "valueOf()", "toString()", "None of the above"],
    answer: "toSource()",
  },
  {
    questionTitle: "Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?",
    choices: ["slice()", "split()", "replace()", "search()"],
    answer: "split()",
  },
  {
    questionTitle: "Which of the following function of String object returns the calling string value converted to lower case?",
    choices: ["toLocaleLowerCase()", "toLowerCase()", "toString()", "substring()"],
    answer: "toLowerCase()",
  },
  {
    questionTitle: "Which of the following function of String object causes a string to be displayed as a subscript, as if it were in a <sub> tag?",
    choices: ["sup()", "small()", "strike()", "sub()"],
    answer: "sub()",
  },
  {
    questionTitle: "Which of the following function of Array object joins all elements of an array into a string?",
    choices: ["concat()", "join()", "pop()", "map()"],
    answer: "join()",
  },  
  {
    questionTitle: "Which of the following function of Array object represents the source code of an object?",
    choices: ["toSource()", "splice()", "toString()", "unshift()"],
    answer: "toSource()",
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
var ticker = 0

var choicesHolder = document.querySelectorAll("choices");

var sfxCorrect = new Audio("./assets/sfx/correct.wav");
var sfxIncorrect = new Audio("./assets/sfx/incorrect.wav");
var timerId 
var gameState = false

// HIGHSCORES
var highscoresEl = document.querySelector("#highscores");
var initialsEl = document.querySelector("#initials");


var finalScore = 0
// Function to start quiz
function startQuiz() {
  gameState = true
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
          gameState = false
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

  if (gameState === true && timeAmount === 0) {
    alert("ran out of time, GAME OVER")
    clearInterval(timerId)
    window.location.href = "index.html";
    return
  }
}

// Function to check if you've pressed enter and for saving the high score


function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      // format new score object for current user
      var newScore = {
        score: finalScore,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
            window.location.href = "highscores.html";

    }
}

submitEl.onclick = saveHighscore;
startBtn.onclick = startQuiz;
