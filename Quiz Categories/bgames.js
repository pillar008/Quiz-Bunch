document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question:
        "In the game of Monopoly, which color are the properties of Boardwalk and Park Place?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correctAnswer: "Blue",
    },
    {
      question: "How many squares are on a standard Scrabble board?",
      options: ["225", "200", "250", "300"],
      correctAnswer: "225",
    },
    {
      question:
        "In the game of chess, how many pieces does each player start with?",
      options: ["16", "18", "20", "22"],
      correctAnswer: "16",
    },
    {
      question: "What is the highest number on a standard six-sided die?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "6",
    },
    {
      question:
        "Which game involves matching tiles with pictures of roads, cities, and fields?",
      options: [
        "Carcassonne",
        "Ticket to Ride",
        "Settlers of Catan",
        "Puerto Rico",
      ],
      correctAnswer: "Carcassonne",
    },
    {
      question:
        "In the game of Clue (or Cluedo), what is the character's name known as 'Mrs. White' called in the UK version?",
      options: ["Mrs. White", "Mrs. Peacock", "Mrs. Green", "Mrs. Scarlet"],
      correctAnswer: "Mrs. White",
    },
    {
      question:
        "Which board game involves trying to sink your opponent's fleet of ships?",
      options: ["Battleship", "Risk", "Stratego", "Axis & Allies"],
      correctAnswer: "Battleship",
    },
    {
      question:
        "What is the name of the board game where players try to guess the secret word based on clues given by their teammates?",
      options: ["Codenames", "Taboo", "Scattergories", "Pictionary"],
      correctAnswer: "Codenames",
    },
    {
      question:
        "Which game involves placing settlers, roads, and cities to build a civilization on the island of Catan?",
      options: [
        "Settlers of Catan",
        "Ticket to Ride",
        "Carcassonne",
        "Pandemic",
      ],
      correctAnswer: "Settlers of Catan",
    },
    {
      question:
        "In the game of Risk, what color are the territories controlled by the player?",
      options: ["Different colors", "Red", "Blue", "Yellow"],
      correctAnswer: "Different colors",
    },
  ];
  let currentQuestionIndex = 0;
  let score = 0;

  renderQuestion();

  function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question", "active");
    questionElement.innerHTML = `
              <h2>Question ${currentQuestionIndex + 1}</h2>
              <p>${question.question}</p>
              <div class="options">
                  ${question.options
                    .map(
                      (option) => `
                      <label>
                          <input type="radio" name="answer" value="${option}">
                          <span>${option}</span>
                      </label><br>
                  `
                    )
                    .join("")}
              </div>
              <button onclick="nextQuestion()">Next</button>
          `;
    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionElement);

    // Add event listeners to radio buttons
    const radioButtons = quizContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((button) => {
      button.addEventListener("change", function () {
        const selectedLabel = this.closest("label");
        clearTicks(questionElement); // Clear previous ticks
        if (this.checked) {
          const tickElement = document.createElement("span");
          tickElement.classList.add("tick");
          tickElement.textContent = "✓";
          selectedLabel.appendChild(tickElement);
        }
      });
    });
  }

  window.nextQuestion = function () {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      // Check if user's answer is correct
      if (userAnswer === correctAnswer) {
        score++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        showScore();
      }
    } else {
      alert("Please select an answer.");
    }
  };

  function clearTicks(questionElement) {
    const ticks = questionElement.querySelectorAll(".tick");
    ticks.forEach((tick) => {
      tick.remove();
    });
  }

  function showScore() {
    const scorePercentage = (score / questions.length) * 100;
    drawScoreRing(scorePercentage);
    const scoreMessage = document.createElement("div");
    scoreMessage.innerHTML = `
          <h2>Quiz Completed!</h2>
          <p>Your score: ${score} out of ${questions.length}</p>
      `;
    scoreScreen.appendChild(scoreMessage);
  }

  function drawScoreRing(percentage) {
    const ctx = scoreCanvas.getContext("2d");
    const x = scoreCanvas.width / 2;
    const y = scoreCanvas.height / 2;
    const radius = 80;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (percentage / 100) * (Math.PI * 2);
    ctx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 20;
    ctx.stroke();
  }
});
