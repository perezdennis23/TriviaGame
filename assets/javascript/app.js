$(document).ready(function(){

    $("#start-button").on("click", userChoices.startTimer);
  
  });
  var quizQuestions =
  [
    {
      question: "Which of the following is a day of the week?",
      answers: ["Tacoday", "Friday", "Lazyday"],
      correct: "Friday"
    },
  
    {
      question: "Which of the following is a type of bird?",
      answers: ["Goose", "Camel", "Taco"],
      correct: "Goose"
    },
    {
      question: "Which of the following is safe to eat?",
      answers: ["Photo Albums", "Shoe Laces", "Tacos"],
      correct: "Tacos"
    },
    {
      question: "Which of the following is a form of measurement?",
      answers: ["Meters", "Tacos", "Dinosaurs"],
      correct: "Meters"
    }
  ]
  
  var userChoices = {
  
    timeRemaining : 60,
  
    startTimer: function() {
      $("#timer").text("Time remaining: " + userChoices.timeRemaining);
      setInterval(userChoices.countdown, 1000);
      $("#start-page").hide();
      questions.displayQuestions();
    },
  
    countdown: function() {
      userChoices.timeRemaining--;
      $("#timer").text("Time remaining: " + userChoices.timeRemaining);
      if (userChoices.timeRemaining === 0) {
        userChoices.stopTimer();
        $("#timer").empty();
      }
    },
  
    stopTimer: function() {
      clearInterval();
      questions.checkAnswers();
    },
  
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers (Good Job): " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers (Wrong): " + numIncorrect);
    }
  }
  
  var questions = {
  
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < quizQuestions.length; i++) {
  
        divContainer.append('<div id="question">' + quizQuestions[i].question + '</div>');
  
        var answer1 = quizQuestions[i].answers[0];
        var answer2 = quizQuestions[i].answers[1];
        var answer3 = quizQuestions[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }

      var finishButton = '<button class="btn btn-primary" id="finish-button" type="submit">Finished</button>';
      divContainer.append(finishButton);
      $("#finish-button").on("click", userChoices.stopTimer);
    },

    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;

      for (var i = 0; i < quizQuestions.length; i++) {
        correctAnswer = quizQuestions[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }

      userChoices.showEndPage(numCorrect, numIncorrect);
    },
  }
  