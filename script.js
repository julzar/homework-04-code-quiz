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
var timeInterval

// Append questions and answer choices to the page, and set id for the choice matching the correct answer
function getQuestion() {
    if (currentQuestion < questions.length) {
        var titleEL = document.createElement("h5");
    titleEL.textContent = questions[currentQuestion].title
    $("#question-title").html(titleEL)
    $("#question-choices").html("")
    questions[currentQuestion].choices.forEach(choice => {
        var choiceEl = document.createElement("button")

        var correctAnswer = questions[currentQuestion].answer

        choiceEl.textContent = choice

        choiceEl.className = "btn btn-primary btn-block choice-el"

        if (choice == correctAnswer) {
            choiceEl.id = "correct"
            
        }
        $("#question-choices").append(choiceEl)
    })
    }
}
// Add event listener to answer choice buttons and call correctChoice/ incorrectChoice functions
$("#question-choices").on('click', function(event) {
    event.stopPropagation()
    event.preventDefault()
    if (event.target.matches("button")) {
        if (event.target.id == "correct") {
            correctChoice()
            getQuestion()
            console.log(currentQuestion)
            console.log(`Correct!`)
            if (currentQuestion >= questions.length) {
                stopTimer()
                getScoreInput()
            }
        } 
        else {
            incorrectChoice()
            console.log('nope')
        }
    console.log(`clicked`)
    }
})


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
    timeInterval = setInterval(countdown, tickTime)
    $("#timer").text(formatTime(totalTime))
    function countdown() {
        formatTime(totalTime)
        tick()
        if (totalTime <= 0) {
            clearInterval(timeInterval)
        }
    }
}

// Stops the timer
function stopTimer() {
    clearInterval(timeInterval)
}

// Removes 10 seconds from the timer
function incorrectChoice() {
    totalTime -= penaltyTime
    formatTime(totalTime)
}

// Goes to the next question
function correctChoice() {
    if (currentQuestion < questions.length) {
        currentQuestion++
    }
}

// Calls several different fucntions needed to start the quiz
$("#start-quiz").on('click', function() {
    getQuestion()
    $("#timer").show()
    startTimer()
    $("#start-quiz").css({"display": "none"})
})

// Navigates to an input form to save score
function getScoreInput() {
    //window.location = "savescore.html"
    $("#question-title").html("Enter your innitials")
    $("#question-choices").html("")
    $("#timer").hide()
    var innitialsIn = document.createElement("input")
    var scoreTime = document.createElement("div")
    innitialsIn.placeholder = "AAA"
    innitialsIn.className = "form-control-inline mr-2"
    scoreTime.textContent = formatTime(totalTime)
    $("#question-choices").append(innitialsIn)
    $("#question-choices").append(scoreTime)

    
    
    
}



}) // final closing bracket


    // function startTimer() {
    //     var timeInterval = setInterval(countdown, 1000)
    //     $("#timer").text(formatTime(totalTime))
    //     function countdown() {
    //         formatTime(totalTime)
    //         tick()
    //         if (totalTime <= 0) {
    //             clearInterval(timeInterval)
    //         }
    //     }
    // }

    // function startTimer() {
//     $("#timer").text(formatTime(totalTime))
//     var myInterval = setInterval(tick, tickTime)
//     $("#timer").text(formatTime(totalTime))
//     console.log(totalTime)
//     if (totalTime <= 0) {
//         alert('test')
//         clearInterval(myInterval)
//     }
// }