document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Who lives in a pineapple under the sea?",
      options: [
        "SpongeBob SquarePants",
        "Patrick Star",
        "Squidward Tentacles",
        "Mr. Krabs",
      ],
      correctAnswer: "SpongeBob SquarePants",
    },
    {
      question: "Which cartoon character is known for saying 'What's up, Doc?'",
      options: ["Bugs Bunny", "Mickey Mouse", "Scooby-Doo", "Tom"],
      correctAnswer: "Bugs Bunny",
    },
    {
      question: "In 'Tom and Jerry', what kind of animal is Jerry?",
      options: ["Mouse", "Cat", "Dog", "Rabbit"],
      correctAnswer: "Mouse",
    },
    {
      question: "Who is the leader of the 'Teenage Mutant Ninja Turtles'?",
      options: ["Leonardo", "Michelangelo", "Raphael", "Donatello"],
      correctAnswer: "Leonardo",
    },
    {
      question: "What is the name of the town where 'The Simpsons' live?",
      options: ["Springfield", "Quahog", "Arlen", "South Park"],
      correctAnswer: "Springfield",
    },
    {
      question: "Which cartoon character lives in Jellystone Park?",
      options: ["Yogi Bear", "Scooby-Doo", "Bugs Bunny", "Popeye"],
      correctAnswer: "Yogi Bear",
    },
    {
      question: "What is the name of the family dog in 'Family Guy'?",
      options: ["Brian", "Stewie", "Peter", "Meg"],
      correctAnswer: "Brian",
    },
    {
      question: "Who is the main antagonist in 'The Powerpuff Girls'?",
      options: ["Mojo Jojo", "Him", "Fuzzy Lumpkins", "Princess Morbucks"],
      correctAnswer: "Mojo Jojo",
    },
    {
      question: "What kind of animal is Snoopy in 'Peanuts'?",
      options: ["Dog", "Cat", "Bird", "Rabbit"],
      correctAnswer: "Dog",
    },
    {
      question: "What is the name of the cat in 'Tom and Jerry'?",
      options: ["Tom", "Jerry", "Butch", "Spike"],
      correctAnswer: "Tom",
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
