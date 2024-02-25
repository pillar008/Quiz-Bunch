document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who directed the movie 'Inception'?",
      options: [
        "Christopher Nolan",
        "Steven Spielberg",
        "Martin Scorsese",
        "Quentin Tarantino",
      ],
      correctAnswer: "Christopher Nolan",
    },
    {
      question: "Which film won the Academy Award for Best Picture in 2020?",
      options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"],
      correctAnswer: "Parasite",
    },
    {
      question:
        "Who won the Academy Award for Best Actor in 2019 for his role in 'Joker'?",
      options: [
        "Joaquin Phoenix",
        "Leonardo DiCaprio",
        "Brad Pitt",
        "Tom Hanks",
      ],
      correctAnswer: "Joaquin Phoenix",
    },
    {
      question: "Which movie features a character named 'Forrest Gump'?",
      options: [
        "Forrest Gump",
        "The Shawshank Redemption",
        "The Godfather",
        "Schindler's List",
      ],
      correctAnswer: "Forrest Gump",
    },
    {
      question:
        "Who played the role of Tony Stark in the Marvel Cinematic Universe?",
      options: [
        "Robert Downey Jr.",
        "Chris Evans",
        "Chris Hemsworth",
        "Mark Ruffalo",
      ],
      correctAnswer: "Robert Downey Jr.",
    },
    {
      question: "Which film won the Academy Award for Best Picture in 1994?",
      options: [
        "Forrest Gump",
        "Pulp Fiction",
        "The Shawshank Redemption",
        "Schindler's List",
      ],
      correctAnswer: "Forrest Gump",
    },
    {
      question: "Which actor portrayed the character of Neo in 'The Matrix'?",
      options: ["Keanu Reeves", "Tom Cruise", "Matt Damon", "Brad Pitt"],
      correctAnswer: "Keanu Reeves",
    },
    {
      question: "Who directed the movie 'The Dark Knight'?",
      options: [
        "Christopher Nolan",
        "Martin Scorsese",
        "Steven Spielberg",
        "Quentin Tarantino",
      ],
      correctAnswer: "Christopher Nolan",
    },
    {
      question: "Which movie is based on the life of mathematician John Nash?",
      options: [
        "A Beautiful Mind",
        "The Theory of Everything",
        "Good Will Hunting",
        "The Imitation Game",
      ],
      correctAnswer: "A Beautiful Mind",
    },
    {
      question: "Which film features characters named Marlin and Dory?",
      options: ["Finding Nemo", "Toy Story", "The Lion King", "Shrek"],
      correctAnswer: "Finding Nemo",
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
