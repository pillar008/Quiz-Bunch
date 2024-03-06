document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "What is the top selling electric car model as of 2021?",
      options: [
        "Tesla Model 3",
        "Nissan Leaf",
        "Chevrolet Bolt EV",
        "Hyundai Kona Electric",
      ],
      correctAnswer: "Tesla Model 3",
    },
    {
      question: "Which car manufacturer produces the Mustang?",
      options: ["Ford", "Chevrolet", "Dodge", "Chrysler"],
      correctAnswer: "Ford",
    },
    {
      question: "What does SUV stand for?",
      options: [
        "Sport Utility Vehicle",
        "Super Utility Vehicle",
        "Small Utility Vehicle",
        "Station Utility Vehicle",
      ],
      correctAnswer: "Sport Utility Vehicle",
    },
    {
      question: "What is the top selling pickup truck in the United States?",
      options: [
        "Ford F-Series",
        "Chevrolet Silverado",
        "Ram Pickup",
        "Toyota Tacoma",
      ],
      correctAnswer: "Ford F-Series",
    },
    {
      question: "What type of engine does a hybrid car have?",
      options: [
        "Combination of electric and gasoline",
        "Diesel",
        "Electric only",
        "Gasoline only",
      ],
      correctAnswer: "Combination of electric and gasoline",
    },
    {
      question: "Which country is known for producing the most cars?",
      options: ["China", "Germany", "United States", "Japan"],
      correctAnswer: "China",
    },
    {
      question: "What is the top speed of the Bugatti Chiron?",
      options: ["261 mph", "286 mph", "304 mph", "321 mph"],
      correctAnswer: "304 mph",
    },
    {
      question: "Which car brand has a logo that features a prancing horse?",
      options: ["Ferrari", "Lamborghini", "Maserati", "Alfa Romeo"],
      correctAnswer: "Ferrari",
    },
    {
      question: "What is the best selling car of all time?",
      options: [
        "Toyota Corolla",
        "Volkswagen Beetle",
        "Ford Model T",
        "Honda Civic",
      ],
      correctAnswer: "Toyota Corolla",
    },
    {
      question: "What company produces the 'Prius'?",
      options: ["Toyota", "Honda", "Nissan", "Subaru"],
      correctAnswer: "Toyota",
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
