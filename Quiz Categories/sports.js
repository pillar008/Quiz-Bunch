document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Which sport is known as 'The Beautiful Game'?",
      options: ["Soccer", "Basketball", "Tennis", "Golf"],
      correctAnswer: "Soccer",
    },
    {
      question: "Who has won the most Wimbledon titles in tennis?",
      options: [
        "Roger Federer",
        "Rafael Nadal",
        "Novak Djokovic",
        "Pete Sampras",
      ],
      correctAnswer: "Roger Federer",
    },
    {
      question: "Which country won the first ever FIFA World Cup in 1930?",
      options: ["Uruguay", "Brazil", "Italy", "Germany"],
      correctAnswer: "Uruguay",
    },
    {
      question: "Which NBA player is known as 'The King'?",
      options: [
        "LeBron James",
        "Michael Jordan",
        "Kobe Bryant",
        "Magic Johnson",
      ],
      correctAnswer: "LeBron James",
    },
    {
      question: "Who holds the record for the most Olympic gold medals?",
      options: [
        "Michael Phelps",
        "Usain Bolt",
        "Carl Lewis",
        "Larisa Latynina",
      ],
      correctAnswer: "Michael Phelps",
    },
    {
      question: "In which sport do players use a shuttlecock?",
      options: ["Badminton", "Table Tennis", "Squash", "Tennis"],
      correctAnswer: "Badminton",
    },
    {
      question:
        "Which team has won the most Super Bowl championships in NFL history?",
      options: [
        "New England Patriots",
        "Pittsburgh Steelers",
        "Dallas Cowboys",
        "San Francisco 49ers",
      ],
      correctAnswer: "New England Patriots",
    },
    {
      question: "Who won the FIFA Women's World Cup in 2019?",
      options: ["United States", "Netherlands", "Sweden", "Germany"],
      correctAnswer: "United States",
    },
    {
      question: "Which country has won the most Olympic medals in total?",
      options: ["United States", "Russia", "China", "Germany"],
      correctAnswer: "United States",
    },
    {
      question: "Who holds the record for the fastest 100m sprint?",
      options: ["Usain Bolt", "Carl Lewis", "Justin Gatlin", "Yohan Blake"],
      correctAnswer: "Usain Bolt",
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
