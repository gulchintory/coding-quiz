var questionText = document.querySelector(".question-text");
var questionOptions = document.querySelector(".question-options");
var result = document.querySelector(".result");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var quizIntro = $(".quiz-intro");
var questions = $(".questions");
var finalResult = $(".final-result");
var finalPoint = document.querySelector(".final-point");
var restartButton = document.querySelector(".restart-button");

var questionNumber = 0;
var chosenResult = "";
var timer;
var timerCount;


var myQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      '1- Hyperlinks and Text Markup Language',
      '2- Hyper Text Markup Language',
      '3- Home Tool Markup Language'
    ],
    correctAnswer: '2'
  },
  {
    question: "What is the correct HTML for adding a background color?",
    answers: [
      '1- <background>yellow</background>',
      '2- <body style="background-color:yellow;">',
      '3- <body bg="yellow">'
    ],
    correctAnswer: '2'
  },
  {
    question: "How can you make a numbered list?",
    answers: [
      '1-  <list>',
      '2-  <ul>',
      '3-  <dl>',
      '4-  <ol>'
    ],
    correctAnswer: '4'
  }
];

// The init function is called when the page loads 
function init() {
  questions.hide();
  finalResult.hide();
  renderQuestions;
}

function startQuiz() {
  timerCount = 75;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderQuestions();
  quizIntro.hide();
  questions.show();
  finalResult.hide();
  startTimer()
}

function endQuiz() {
  questions.hide();
  finalResult.show();
  finalPoint.innerHTML = timerCount;
}

function restartQuiz() {
  timerCount = 75;
  startButton.disabled = false;
  quizIntro.show();
  questions.hide();
  finalResult.hide();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
   
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function renderQuestions() {
  if(questionNumber < myQuestions.length) {

 
    questionText.innerHTML = myQuestions[questionNumber].question;
    questionOptions.innerHTML = "";
    for (var i = 0; i < myQuestions[questionNumber].answers.length; i++) {
      var answer = myQuestions[questionNumber].answers[i];
      var button = document.createElement("button");
      if (i === myQuestions[questionNumber].correctAnswer -1) {
        button.setAttribute("data-correct", "yes");
      } else {
        button.setAttribute("data-correct", "no");
      }
      
      button.textContent = answer;
      questionOptions.appendChild(button);
    }

    questionNumber++;
  }
  else {
    endQuiz();
  }

}

function checkAnswer() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}


// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);

restartButton.addEventListener("click", restartQuiz);

questionOptions.addEventListener("click", function(event) {
  var element = event.target;
  // TODO: Describe the functionality of the following `if` statement.
  if (element.matches("button") === true) {
    var correct = element.getAttribute("data-correct");
    if (correct === "yes") {
      result.innerHTML = "Correct!";
    } else {
      timerCount = timerCount - 10;
      result.innerHTML = "Wrong";
    }
    renderQuestions();
  }
});

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
// resetButton.addEventListener("click", resetGame);
