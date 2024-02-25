document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question:
        "Which TV series features characters such as Jon Snow, Daenerys Targaryen, and Tyrion Lannister?",
      options: [
        "Game of Thrones",
        "Breaking Bad",
        "Friends",
        "Stranger Things",
      ],
      correctAnswer: "Game of Thrones",
    },
    {
      question:
        "In which TV show does the character Walter White become a methamphetamine manufacturer?",
      options: ["Breaking Bad", "The Sopranos", "The Wire", "Mad Men"],
      correctAnswer: "Breaking Bad",
    },
    {
      question: "Who is the creator of 'The Simpsons'?",
      options: [
        "Matt Groening",
        "Seth MacFarlane",
        "Mike Judge",
        "Trey Parker",
      ],
      correctAnswer: "Matt Groening",
    },
    {
      question:
        "Which TV series is set in the fictional town of Hawkins, Indiana?",
      options: [
        "Stranger Things",
        "The Walking Dead",
        "Westworld",
        "Black Mirror",
      ],
      correctAnswer: "Stranger Things",
    },
    {
      question:
        "Who plays the character of Tony Soprano in the TV series 'The Sopranos'?",
      options: ["James Gandolfini", "Robert De Niro", "Al Pacino", "Joe Pesci"],
      correctAnswer: "James Gandolfini",
    },
    {
      question:
        "Which TV show features a high school teacher turned methamphetamine manufacturer?",
      options: ["Breaking Bad", "The Wire", "Narcos", "Better Call Saul"],
      correctAnswer: "Breaking Bad",
    },
    {
      question:
        "What is the name of the group of survivors in 'The Walking Dead'?",
      options: ["Rick's Group", "The Survivors", "The Walkers", "The Saviors"],
      correctAnswer: "Rick's Group",
    },
    {
      question:
        "Which TV series is set in the fictional Sterling Cooper advertising agency in the 1960s?",
      options: ["Mad Men", "Downton Abbey", "The Crown", "Boardwalk Empire"],
      correctAnswer: "Mad Men",
    },
    {
      question:
        "Who is known for his role as Barney Stinson in the TV series 'How I Met Your Mother'?",
      options: [
        "Neil Patrick Harris",
        "Jason Segel",
        "Josh Radnor",
        "Alyson Hannigan",
      ],
      correctAnswer: "Neil Patrick Harris",
    },
    {
      question:
        "Which TV show follows the lives of a group of friends living in New York City?",
      options: ["Friends", "Seinfeld", "Cheers", "The Office"],
      correctAnswer: "Friends",
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
