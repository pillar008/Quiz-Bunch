document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "What is the best-selling video game of all time?",
      options: ["Minecraft", "Tetris", "Grand Theft Auto V", "Wii Sports"],
      correctAnswer: "Minecraft",
    },
    {
      question: "Which video game features a plumber named Mario?",
      options: [
        "Super Mario Bros.",
        "The Legend of Zelda",
        "Pokémon",
        "Sonic the Hedgehog",
      ],
      correctAnswer: "Super Mario Bros.",
    },
    {
      question: "What is the main currency used in the game 'Fortnite'?",
      options: ["V-Bucks", "Gold Coins", "Credits", "Gems"],
      correctAnswer: "V-Bucks",
    },
    {
      question:
        "Who is the main protagonist in the game 'The Legend of Zelda'?",
      options: ["Link", "Zelda", "Ganondorf", "Ganon"],
      correctAnswer: "Link",
    },
    {
      question:
        "Which video game series is set in the fantasy world of Azeroth?",
      options: [
        "World of Warcraft",
        "Final Fantasy",
        "The Elder Scrolls",
        "Diablo",
      ],
      correctAnswer: "World of Warcraft",
    },
    {
      question: "Which video game console is produced by Sony?",
      options: ["PlayStation", "Xbox", "Nintendo Switch", "Sega Genesis"],
      correctAnswer: "PlayStation",
    },
    {
      question:
        "What is the name of the protagonist in the game 'The Witcher 3: Wild Hunt'?",
      options: ["Geralt of Rivia", "Ezio Auditore", "Kratos", "Nathan Drake"],
      correctAnswer: "Geralt of Rivia",
    },
    {
      question:
        "Which video game franchise features the character Master Chief?",
      options: ["Halo", "Call of Duty", "Destiny", "Battlefield"],
      correctAnswer: "Halo",
    },
    {
      question: "What type of game is 'League of Legends'?",
      options: ["MOBA", "MMORPG", "First-person shooter", "Survival"],
      correctAnswer: "MOBA",
    },
    {
      question: "Which game introduced the concept of 'bullet time'?",
      options: ["Max Payne", "Doom", "Half-Life", "Quake"],
      correctAnswer: "Max Payne",
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
    // After the user finishes the quiz and gets the results
    const resultsQueryString = questions
      .map((question, index) => {
        return question.correctAnswer === questions[index].options[0]
          ? "true"
          : "false";
      })
      .join(",");
    window.location.href = `quiz-results.html?results=${resultsQueryString}`;
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
