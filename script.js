$(document).ready(function() {

    // Variables
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
    
    var currentQuestion = 0 // The index of the currently displayed question
    var totalTime = 1 * 60 * 1000
    var penaltyTime = 10 * 1000
    var tickTime = 1000
    var timeInterval
    
    // Nick's time format function. Displayes the timer in digital clock style
    function formatTime(ms) {
        var minutes = Math.floor(ms / 60000)
        var seconds = ms % 60000
        seconds /= 1000
        
        if (seconds < 10) {
        seconds = '0' + seconds
        }
        // My styles. Changes the timer display based on the remaining time
        if (totalTime > (30 * 1000)) {
            $("#timer").css({"font-size": "200%", "color": "limegreen"})
        }
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
            $("#timer").text(`${ minutes }:${ seconds }`)
        }  
        return `${ minutes }:${ seconds }`
    }

    // Tells the timer how much time to remove each time it 'ticks.'
    function tick() {
        totalTime -= tickTime
        formatTime(totalTime)
    }

    // Stops the timer
    function stopTimer() {
        clearInterval(timeInterval)
    }

    //Starts the timer and stops it once it reaches 0
    function startTimer() {
        timeInterval = setInterval(countdown, tickTime)
        $("#timer").text(formatTime(totalTime))
        
        function countdown() {
            formatTime(totalTime)
            tick()
            
            if (totalTime <= 0) {
                stopTimer()
                $("#quiz-content").hide()
                $("#title").hide()
            }
        }
    }

    // Renders the innitial page layout
    function renderStartScreen() {
        currentQuestion = 0
        totalTime = 1 * 60 * 1000
        $("#nav-col").html("")
        
        var viewScoreEL =document.createElement("div")
        viewScoreEL.className = "text-link view-scores"
        viewScoreEL.textContent = "View Scores"
        
        $("#nav-col").append(viewScoreEL)
        $("#title").text(`Rules:`)
        $("#quiz-content").html(`<p>Answer multiple choice questions
        about coding! The timer starts at one minute. Each wrong answer
        reduces the remaining time by 10 seconds. If the timer reaches zero, 
        the game is over!</p>`)
        $("#start-quiz").show()
        $("#timer").hide()
    }
    // layout is rendered on page load
    renderStartScreen()

    // Append questions and answer choices to the page, and set 'correct' id for the choice matching the correct answer
    function getQuestion() {
        if (currentQuestion < questions.length) {
        $("#title").text(questions[currentQuestion].title)
        $("#quiz-content").text("")
        
        questions[currentQuestion].choices.forEach(choice => {
            var choiceEl = document.createElement("button")
            var correctAnswer = questions[currentQuestion].answer
            choiceEl.textContent = choice
            choiceEl.className = "btn btn-primary btn-block choice-el"
    
            if (choice == correctAnswer) {
                choiceEl.id = "correct"   
            }
            $("#quiz-content").append(choiceEl)
        })
        }
    }

    // Removes the penalty time (10 seconds) from the timer
    function incorrectChoice() {
        totalTime -= penaltyTime
        formatTime(totalTime)
        
        if (totalTime <= 0) {
            stopTimer()
            $("#quiz-content").html("")
            $("#title").html("")

            // Create link to navigate to quiz start screen
            var backToStart = document.createElement("div")
            backToStart.textContent = "Back to start"
            backToStart.className = "text-link"
            backToStart.addEventListener('click', function() {
                renderStartScreen()
            })
            $("#quiz-content").append(backToStart)
        }
    }
    
    // Goes to the next question
    function correctChoice() {
        if (currentQuestion < questions.length) {
            currentQuestion++
        }
    }

    // Add event listener to answer choice buttons and call correctChoice/ incorrectChoice functions
    $("#quiz-content").on('click', function(event) {
        event.stopPropagation()
        event.preventDefault()
        if (event.target.matches("button")) {
            if (event.target.id == "correct") {
                correctChoice()
                getQuestion()
              
                if (currentQuestion >= questions.length) {
                    stopTimer()
                    renderScoreInput()
                }
            } 
            else {
                incorrectChoice()
            }
        }
    })

    // Renders the score input and save layout
    function renderScoreInput() {
        $("#title").text("Quiz Complete!")
        $("#quiz-content").text("")
        $("#timer").hide()
        // Create score input elements
        var submitBtn = document.createElement("button")
        var innitialsIn = document.createElement("input")
        var scoreTime = document.createElement("span")
        
        innitialsIn.placeholder = "AAA"
        innitialsIn.className = "form-control-inline mr-2"
        submitBtn.className = "btn btn-primary btn-lg"
        submitBtn.textContent = 'Submit'
        scoreTime.textContent = `Score: ${formatTime(totalTime)}`

        $("#quiz-content").append(innitialsIn)
        $("#quiz-content").append(scoreTime)
        $("#btn-row").append(submitBtn)

        submitBtn.addEventListener("click", function(event) {
            event.preventDefault();
            // create user object from innitials and score and save in local storage
            var userScore = {
                Name: innitialsIn.value,
                score: formatTime(totalTime)
            }
            var storedScores = JSON.parse(localStorage.getItem("scoreBoard"))
            
            storedScores.push(userScore)
            localStorage.setItem("scoreBoard", JSON.stringify(storedScores))
            
            $(submitBtn).hide()
            $(innitialsIn).hide()
            $(scoreTime).hide()
            $("#title").text("Submitted!")
            // Create link to navigate to quiz start screen
            var backToStart = document.createElement("div")
            backToStart.textContent = "Back to start"
            backToStart.className = "text-link"
            backToStart.addEventListener('click', function() {
                renderStartScreen()
            })
            $("#quiz-content").append(backToStart)
        })
    }

    // Displays saved scores
    function renderScoreScreen() {
        $("#nav-col").html("")
        $("#quiz-content").text("")
        $("#title").text("Scores: most to least recent")
        $("#start-quiz").hide()
        $("#timer").hide()

        var toQuizEl = document.createElement("div")
        toQuizEl.className = "text-link to-quiz"
        toQuizEl.textContent = "Back to Quiz"

        $("#nav-col").append(toQuizEl)
        // Get saved scores from local storage and display them in list
        var scoreBoardParsed = JSON.parse(localStorage.getItem("scoreBoard"))
        
        scoreBoardParsed.forEach(entry => {
            var scoreBoardEntry = document.createElement("li")
            scoreBoardEntry.textContent = `${entry.Name}-----${entry.score}`
            $("#quiz-content").prepend(scoreBoardEntry)
        });
    }

    // Add event listener to the view scores and back to quiz links in the upper right corner
    $("#nav-col").on('click', function(event) {
        event.stopPropagation()
        if ( $(event.target).hasClass("view-scores") ) {
            renderScoreScreen()
        }
        if ( $(event.target).hasClass("to-quiz") ) {
            renderStartScreen()
        }
    })

    // Calls multiple fucntions needed to start the quiz
    $("#start-quiz").on('click', function() {
        $("#start-quiz").hide()
        $("#timer").show()
        startTimer()
        getQuestion()   
    })

}) // End of script