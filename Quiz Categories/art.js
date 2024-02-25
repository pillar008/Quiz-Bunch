document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Michelangelo",
      ],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "Which artist is known for cutting off his own ear?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: "Vincent van Gogh",
    },
    {
      question: "Who painted The Starry Night?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: "Vincent van Gogh",
    },
    {
      question: "Who sculpted the statue of David?",
      options: [
        "Michelangelo",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Vincent van Gogh",
      ],
      correctAnswer: "Michelangelo",
    },
    {
      question: "Who painted The Scream?",
      options: [
        "Edvard Munch",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
      ],
      correctAnswer: "Edvard Munch",
    },
    {
      question: "Which artist is famous for his drip painting technique?",
      options: [
        "Jackson Pollock",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
      ],
      correctAnswer: "Jackson Pollock",
    },
    {
      question: "Who painted Guernica?",
      options: [
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: "Pablo Picasso",
    },
    {
      question: "Which artist is known for creating the sculpture The Thinker?",
      options: [
        "Auguste Rodin",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
      ],
      correctAnswer: "Auguste Rodin",
    },
    {
      question:
        "Who painted The Persistence of Memory, featuring melting clocks?",
      options: [
        "Salvador Dalí",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
      ],
      correctAnswer: "Salvador Dalí",
    },
    {
      question:
        "Which artist is associated with the creation of the artwork Campbell's Soup Cans?",
      options: [
        "Andy Warhol",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
      ],
      correctAnswer: "Andy Warhol",
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
