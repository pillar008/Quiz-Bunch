document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who is known as 'The King of Pop'?",
      options: [
        "Michael Jackson",
        "Elvis Presley",
        "Justin Timberlake",
        "Bruno Mars",
      ],
      correctAnswer: "Michael Jackson",
    },
    {
      question:
        "Which actress played the lead role in the movie 'Pretty Woman'?",
      options: [
        "Julia Roberts",
        "Meryl Streep",
        "Angelina Jolie",
        "Jennifer Aniston",
      ],
      correctAnswer: "Julia Roberts",
    },
    {
      question: "Who is the founder of Facebook?",
      options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Jeff Bezos"],
      correctAnswer: "Mark Zuckerberg",
    },
    {
      question: "Which singer is known as 'Queen Bey'?",
      options: ["Beyoncé", "Rihanna", "Adele", "Taylor Swift"],
      correctAnswer: "Beyoncé",
    },
    {
      question: "Who is the highest-paid actor in Hollywood?",
      options: [
        "Dwayne Johnson",
        "Robert Downey Jr.",
        "Chris Hemsworth",
        "Brad Pitt",
      ],
      correctAnswer: "Dwayne Johnson",
    },
    {
      question:
        "Who is the first self-made female billionaire according to Forbes?",
      options: ["Oprah Winfrey", "Kylie Jenner", "Madonna", "Ellen DeGeneres"],
      correctAnswer: "Kylie Jenner",
    },
    {
      question: "Which actor starred in the 'Mission: Impossible' film series?",
      options: ["Tom Cruise", "Brad Pitt", "Leonardo DiCaprio", "Johnny Depp"],
      correctAnswer: "Tom Cruise",
    },
    {
      question:
        "Who played the character of Captain Jack Sparrow in the 'Pirates of the Caribbean' film series?",
      options: [
        "Johnny Depp",
        "Orlando Bloom",
        "Brad Pitt",
        "Leonardo DiCaprio",
      ],
      correctAnswer: "Johnny Depp",
    },
    {
      question: "Who is known as the 'Material Girl'?",
      options: ["Madonna", "Lady Gaga", "Britney Spears", "Christina Aguilera"],
      correctAnswer: "Madonna",
    },
    {
      question:
        "Which actor won an Oscar for his role in the movie 'The Revenant'?",
      options: [
        "Leonardo DiCaprio",
        "Tom Hanks",
        "Matthew McConaughey",
        "Christian Bale",
      ],
      correctAnswer: "Leonardo DiCaprio",
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
