// Questions and answers Array
var questions = [
  {
    question: "What is the Minnesota state flower?",
    answers: [
      { answer: "A. Rose", value: false },
      { answer: "B. Tulip", value: false },
      { answer: "C. Lady Slipper", value: true },
      { answer: "D. Dandelion", value: false }
    ]
  },
  {
    question: "What is the Minnesota state bird?",
    answers: [
      { answer: "Eagle", value: false },
      { answer: "Mallard", value: false },
      { answer: "Great Horned Owl", value: false },
      { answer: "Loon", value: true }
    ]
  },
  {
    question: "What is the Minnesota state insect?",
    answers: [
      { answer: "Grasshopper", value: false },
      { answer: "Monarch Butterfly", value: true },
      { answer: "Black Beatle", value: false },
      { answer: "Black Widow Spider", value: false }
    ]
  },
  {
    question: "What is the Minnesota state fish?",
    answers: [
      { answer: "Northern", value: false },
      { answer: "Muskie", value: false },
      { answer: "Walleye", value: true },
      { answer: "Sunfish", value: false }
    ]
  },
  {
    question: "What is the Minnesota state beverage?",
    answers: [
      { answer: "Milk", value: true },
      { answer: "Beer", value: false },
      { answer: "Wine", value: false },
      { answer: "Orange Juice", value: false }
    ]
  },
  {
    question: "What is the Minnesota state muffin?",
    answers: [
      { answer: "Poppyseed", value: false },
      { answer: "Lemon", value: false },
      { answer: "Chocolate", value: false },
      { answer: "Blueberry", value: true }
    ]
  },
  {
    question: "What is the Minnesota state tree?",
    answers: [
      { answer: "Pine Tree", value: true },
      { answer: "Walnut Tree", value: false },
      { answer: "Oak Tree", value: false },
      { answer: "Birch Tree", value: false }
    ]
  }
];

// variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    // console.log($(this));
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.first-answer').css('background-color', 'green');
        $('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 6) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}

// Timer function
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

// Finishing the game
function finishGame() {
  var final = $('.main')
    .html("<p>All done, here's how you did!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}