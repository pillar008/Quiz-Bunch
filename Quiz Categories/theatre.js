document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Arthur Miller",
        "Tennessee Williams",
        "Anton Chekhov",
      ],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "In which city is the Broadway theatre district located?",
      options: ["New York City", "London", "Chicago", "Los Angeles"],
      correctAnswer: "New York City",
    },
    {
      question: "Which Greek playwright wrote 'Oedipus Rex'?",
      options: ["Sophocles", "Euripides", "Aeschylus", "Aristophanes"],
      correctAnswer: "Sophocles",
    },
    {
      question: "Who directed the musical 'The Phantom of the Opera'?",
      options: [
        "Andrew Lloyd Webber",
        "Stephen Sondheim",
        "Lin-Manuel Miranda",
        "Richard Rodgers",
      ],
      correctAnswer: "Andrew Lloyd Webber",
    },
    {
      question:
        "Which play by Arthur Miller features the character Willy Loman?",
      options: [
        "Death of a Salesman",
        "The Crucible",
        "A Streetcar Named Desire",
        "Cat on a Hot Tin Roof",
      ],
      correctAnswer: "Death of a Salesman",
    },
    {
      question: "In which Shakespeare play does the character Hamlet appear?",
      options: ["Hamlet", "Macbeth", "Othello", "King Lear"],
      correctAnswer: "Hamlet",
    },
    {
      question: "Who wrote the play 'A Streetcar Named Desire'?",
      options: [
        "Tennessee Williams",
        "Edward Albee",
        "Arthur Miller",
        "Lorraine Hansberry",
      ],
      correctAnswer: "Tennessee Williams",
    },
    {
      question: "Which musical features the song 'Memory'?",
      options: [
        "Cats",
        "Les Misérables",
        "The Phantom of the Opera",
        "Chicago",
      ],
      correctAnswer: "Cats",
    },
    {
      question: "Who wrote the play 'Long Day's Journey into Night'?",
      options: [
        "Eugene O'Neill",
        "Harold Pinter",
        "Samuel Beckett",
        "Tennessee Williams",
      ],
      correctAnswer: "Eugene O'Neill",
    },
    {
      question:
        "In which Shakespeare play does the character Lady Macbeth appear?",
      options: ["Macbeth", "Romeo and Juliet", "Hamlet", "King Lear"],
      correctAnswer: "Macbeth",
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
