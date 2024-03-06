document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: "Canberra",
    },
    {
      question: "Who wrote the play 'Hamlet'?",
      options: [
        "William Shakespeare",
        "George Bernard Shaw",
        "Arthur Miller",
        "Anton Chekhov",
      ],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
      correctAnswer: "Nitrogen",
    },
    {
      question: "Who painted the famous artwork 'Starry Night'?",
      options: [
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: "Vincent van Gogh",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
      correctAnswer: "Jupiter",
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      options: ["China", "India", "Japan", "South Korea"],
      correctAnswer: "Japan",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
    },
    {
      question: "Who was the first person to step on the moon?",
      options: [
        "Neil Armstrong",
        "Buzz Aldrin",
        "Yuri Gagarin",
        "Alan Shepard",
      ],
      correctAnswer: "Neil Armstrong",
    },
    {
      question: "What is the tallest mammal?",
      options: ["Elephant", "Giraffe", "Horse", "Rhinoceros"],
      correctAnswer: "Giraffe",
    },
    {
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "O2", "H2SO4"],
      correctAnswer: "H2O",
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
