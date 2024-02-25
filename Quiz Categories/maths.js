document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "What is the value of π (pi) approximately?",
      options: ["3.14", "2.71", "1.618", "4.669"],
      correctAnswer: "3.14",
    },
    {
      question: "What is the result of 5 * 8?",
      options: ["40", "45", "35", "50"],
      correctAnswer: "40",
    },
    {
      question: "What is the square root of 144?",
      options: ["12", "14", "10", "16"],
      correctAnswer: "12",
    },
    {
      question: "What is the value of 'x' in the equation 2x + 5 = 15?",
      options: ["5", "10", "7.5", "8"],
      correctAnswer: "5",
    },
    {
      question: "What is the result of 12 / 3?",
      options: ["4", "3", "2", "5"],
      correctAnswer: "4",
    },
    {
      question: "What is the sum of the first 10 natural numbers?",
      options: ["55", "45", "50", "60"],
      correctAnswer: "55",
    },
    {
      question: "What is the value of 3^4?",
      options: ["81", "64", "27", "12"],
      correctAnswer: "81",
    },
    {
      question: "What is the result of 7 - 3 * 2?",
      options: ["1", "4", "7", "10"],
      correctAnswer: "1",
    },
    {
      question:
        "What is the area of a rectangle with length 5 units and width 7 units?",
      options: [
        "35 square units",
        "12 square units",
        "25 square units",
        "42 square units",
      ],
      correctAnswer: "35 square units",
    },
    {
      question: "What is the value of 10 factorial (10!)?",
      options: ["3628800", "120", "720", "100"],
      correctAnswer: "3628800",
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
