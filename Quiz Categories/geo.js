document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "What is the capital of Canada?",
      options: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
      correctAnswer: "Ottawa",
    },
    {
      question: "Which river is the longest in the world?",
      options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correctAnswer: "Nile",
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Vatican City", "Monaco", "Maldives", "San Marino"],
      correctAnswer: "Vatican City",
    },
    {
      question: "Which continent is the largest by land area?",
      options: ["Asia", "Africa", "North America", "Europe"],
      correctAnswer: "Asia",
    },
    {
      question: "What is the capital of Australia?",
      options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
      correctAnswer: "Canberra",
    },
    {
      question: "Which desert is the largest in the world?",
      options: ["Sahara", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
      correctAnswer: "Sahara",
    },
    {
      question: "Which ocean is the largest in the world?",
      options: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      options: ["Japan", "China", "South Korea", "Vietnam"],
      correctAnswer: "Japan",
    },
    {
      question: "Which is the highest mountain in the world?",
      options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      correctAnswer: "Mount Everest",
    },
    {
      question: "What is the capital of Brazil?",
      options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      correctAnswer: "Brasília",
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
