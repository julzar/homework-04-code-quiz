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

// function renderStartScreen() {
//     $("#question-title").text(`Rules:`)
//     $("#rules-text").text(`Answer multiple choice questions about coding!
//         The timer starts at one minute. Each wrong answer
//         reduces the remaining time by 10 seconds.
//         If the timer reaches zero, the game is over!`)
//     $("#start-quiz").text(`Start`)
// }
// renderStartScreen()

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
    $("#question-choices").text("")
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
    return `${ minutes }:${ seconds }`
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
    $("#question-title").html("Quiz Complete!")
    $("#question-choices").text("")
    $("#timer").hide()
    var submitBtn = document.createElement("button")
    var innitialsIn = document.createElement("input")
    var scoreTime = document.createElement("span")
    var timeString = formatTime(totalTime)
    innitialsIn.placeholder = "AAA"
    innitialsIn.className = "form-control-inline mr-2"
    submitBtn.className = "btn btn-primary btn-lg"
    submitBtn.textContent = 'Submit'
    scoreTime.textContent = `Score: ${timeString}`
    $("#question-choices").append(innitialsIn)
    $("#question-choices").append(scoreTime)
    $("#btn-row").append(submitBtn)
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        // create user object from submission
        var userScore = {
            Name: innitialsIn.value,
            score: formatTime(totalTime)
        }
        var storedScores = JSON.parse(localStorage.getItem("scoreBoard"))
        storedScores.push(userScore)
        localStorage.setItem("scoreBoard", JSON.stringify(storedScores))
        $(submitBtn).hide()
        // renderStartScreen()
    })
}

function renderScores () {
    var scoreBoardParsed = JSON.parse(localStorage.getItem("scoreBoard"))
    scoreBoardParsed.forEach(name => {
        var scoreBoardEntry = document.createElement("li")
        scoreBoardEntry.textContent = `${name.Name}-----${name.score}`
        $("#score-list").prepend(scoreBoardEntry)
    });
}

$(document).ready(function() {
    renderScores()
})

}) // final closing bracket
