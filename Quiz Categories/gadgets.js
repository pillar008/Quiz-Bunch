document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Who is the CEO of Tesla, Inc.?",
      options: ["Elon Musk", "Jeff Bezos", "Tim Cook", "Mark Zuckerberg"],
      correctAnswer: "Elon Musk",
    },
    {
      question: "Which company developed the iPhone?",
      options: ["Apple", "Samsung", "Google", "Microsoft"],
      correctAnswer: "Apple",
    },
    {
      question: "What is the name of Amazon's virtual assistant?",
      options: ["Alexa", "Siri", "Cortana", "Google Assistant"],
      correctAnswer: "Alexa",
    },
    {
      question: "Which gaming console is developed by Sony?",
      options: ["PlayStation", "Xbox", "Nintendo Switch", "PC"],
      correctAnswer: "PlayStation",
    },
    {
      question: "Who developed the Android operating system?",
      options: ["Google", "Apple", "Microsoft", "Samsung"],
      correctAnswer: "Google",
    },
    {
      question: "Which company produces the Kindle e-reader?",
      options: ["Amazon", "Apple", "Samsung", "Microsoft"],
      correctAnswer: "Amazon",
    },
    {
      question: "What is the name of Google's VR platform?",
      options: [
        "Google Cardboard",
        "Oculus Rift",
        "HTC Vive",
        "PlayStation VR",
      ],
      correctAnswer: "Google Cardboard",
    },
    {
      question: "Which company produces the Xbox gaming console?",
      options: ["Microsoft", "Sony", "Nintendo", "Google"],
      correctAnswer: "Microsoft",
    },
    {
      question: "What is the name of Apple's wireless earbuds?",
      options: ["AirPods", "Galaxy Buds", "Pixel Buds", "Bose QuietComfort"],
      correctAnswer: "AirPods",
    },
    {
      question: "Which company produces the Galaxy series of smartphones?",
      options: ["Samsung", "Apple", "Google", "Microsoft"],
      correctAnswer: "Samsung",
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
