$(document).ready(function() {

var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["a) strings", "b) booleans", "c) alerts", "d) numbers"],
      answer: "c) alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["a) quotes", "b) curly brackets", "c) parentheses", "d) square brackets"],
      answer: "c) parentheses"
    }
  ];
  
var currentQuestion = 0
var totalTime = 1 * 60 * 1000
var penaltyTime = 10 * 1000
var tickTime = 1000


function getQuestion() {
    var titleEL = document.createElement("h5");
    titleEL.textContent = questions[currentQuestion].title
    $("#question-title").html(titleEL)
    $("#question-choices").html("")
    questions[currentQuestion].choices.forEach(choice => {
        var choiceEl = document.createElement("button")
        var correctAnswer = questions[currentQuestion].answer
        choiceEl.textContent = choice
        choiceEl.className = "btn btn-primary btn-block choice-el"
        $("#question-choices").append(choiceEl)
        if (choice == correctAnswer) {
            $(".choice-el").on('click', function(event) {
                event.stopPropagation()
                console.log(`${choice} is Correct!`)
            })     
        } 
    })
}
// Nick's time format function
function formatTime(ms) {
    var minutes = Math.floor(ms / 60000)
    var seconds = ms % 60000
    seconds /= 1000
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    // My styles
    if (totalTime <= (30 * 1000)) {
        $("#timer").css({"font-size": "300%", "color": "orange"})
    }
    if (totalTime <= (10 * 1000)) {
        $("#timer").css({"font-size": "400%", "color": "red"})
    }
    if (totalTime <= 0) {
        $("#timer").html(`GAME OVER`)
    }
    else {
        var timerEl = document.getElementById('timer')
        timerEl.textContent = `${ minutes }:${ seconds }`
    }  
}

function tick() {
    totalTime -= tickTime
    formatTime(totalTime)
}

function startTimer() {
    $("#timer").text(formatTime(totalTime))
    var myInterval = setInterval(tick, tickTime)
    if (totalTime <= 0) {
        clearInterval(myInterval)
    }
}

// Calls several different fucntions needed to start the quiz
$("#start-quiz").on('click', function() {
    getQuestion()
    $("#timer").show()
    startTimer()

    //currentQuestion++
})
// testing wrong answer effect on timer
$("#wrong").on('click', function() {
    totalTime -= penaltyTime
    formatTime(totalTime)
})

// Add/remove scores from local storage

}) // final closing bracket


    // function startTimer() {
    //     var currentTime = setInterval(countdown, 1000)
    //     $("#timer").text(formatTime(totalTime))
    //     function countdown() {
    //         formatTime(totalTime)
    //         tick()
    //         if (totalTime <= 0) {
    //             clearInterval(currentTime)
    //         }
    //     }
    // }
