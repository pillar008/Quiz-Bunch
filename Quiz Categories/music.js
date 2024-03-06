document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Who is known as the 'King of Pop'?",
      options: [
        "Michael Jackson",
        "Elvis Presley",
        "Prince",
        "Justin Timberlake",
      ],
      correctAnswer: "Michael Jackson",
    },
    {
      question: "Which band released the album 'The Dark Side of the Moon'?",
      options: ["Pink Floyd", "The Beatles", "Led Zeppelin", "Queen"],
      correctAnswer: "Pink Floyd",
    },
    {
      question: "Who sang the hit song 'Bohemian Rhapsody'?",
      options: ["Queen", "The Beatles", "Led Zeppelin", "AC/DC"],
      correctAnswer: "Queen",
    },
    {
      question: "Which famous singer is known as the 'Material Girl'?",
      options: ["Madonna", "Britney Spears", "Lady Gaga", "Taylor Swift"],
      correctAnswer: "Madonna",
    },
    {
      question: "Who is the lead vocalist of the band 'The Rolling Stones'?",
      options: ["Mick Jagger", "John Lennon", "Paul McCartney", "Bob Dylan"],
      correctAnswer: "Mick Jagger",
    },
    {
      question: "Which artist released the album 'Thriller'?",
      options: [
        "Michael Jackson",
        "Elton John",
        "David Bowie",
        "Stevie Wonder",
      ],
      correctAnswer: "Michael Jackson",
    },
    {
      question: "Who is known as the 'Queen of Soul'?",
      options: [
        "Aretha Franklin",
        "Whitney Houston",
        "Diana Ross",
        "Tina Turner",
      ],
      correctAnswer: "Aretha Franklin",
    },
    {
      question: "Which band performed the song 'Stairway to Heaven'?",
      options: [
        "Led Zeppelin",
        "The Beatles",
        "Pink Floyd",
        "The Rolling Stones",
      ],
      correctAnswer: "Led Zeppelin",
    },
    {
      question: "Who is the lead singer of the band 'Nirvana'?",
      options: ["Kurt Cobain", "Dave Grohl", "Eddie Vedder", "Chris Cornell"],
      correctAnswer: "Kurt Cobain",
    },
    {
      question: "Which famous singer was known as the 'King of Rock and Roll'?",
      options: ["Elvis Presley", "Buddy Holly", "Chuck Berry", "Johnny Cash"],
      correctAnswer: "Elvis Presley",
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
