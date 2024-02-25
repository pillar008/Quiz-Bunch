document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "In 'Naruto', what is the name of Naruto's rival?",
      options: [
        "Sasuke Uchiha",
        "Sakura Haruno",
        "Kakashi Hatake",
        "Itachi Uchiha",
      ],
      correctAnswer: "Sasuke Uchiha",
    },
    {
      question: "What is the name of the main character in 'One Piece'?",
      options: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp"],
      correctAnswer: "Monkey D. Luffy",
    },
    {
      question:
        "In 'Death Note', who is the owner of the Death Note initially?",
      options: ["Light Yagami", "L", "Ryuk", "Misa Amane"],
      correctAnswer: "Ryuk",
    },
    {
      question: "Who is known as the 'Strongest Hero' in 'One Punch Man'?",
      options: ["Saitama", "Genos", "Sonic", "King"],
      correctAnswer: "Saitama",
    },
    {
      question:
        "In 'Attack on Titan', what is the name of the main protagonist?",
      options: [
        "Eren Yeager",
        "Mikasa Ackerman",
        "Armin Arlert",
        "Levi Ackerman",
      ],
      correctAnswer: "Eren Yeager",
    },
    {
      question:
        "What is the name of the anime about a group of students trying to assassinate their teacher, who is also an alien?",
      options: [
        "Assassination Classroom",
        "My Hero Academia",
        "Tokyo Ghoul",
        "Fullmetal Alchemist",
      ],
      correctAnswer: "Assassination Classroom",
    },
    {
      question: "In 'Dragon Ball Z', what is the name of Goku's son?",
      options: ["Gohan", "Goten", "Trunks", "Vegeta"],
      correctAnswer: "Gohan",
    },
    {
      question: "Who is the main character in 'Sword Art Online'?",
      options: ["Kirito", "Asuna", "Sinon", "Yui"],
      correctAnswer: "Kirito",
    },
    {
      question:
        "What is the name of the popular anime about a young ninja named 'Ichigo' who gains the power of a Soul Reaper?",
      options: ["Naruto", "Bleach", "One Piece", "Fairy Tail"],
      correctAnswer: "Bleach",
    },
    {
      question:
        "In 'Fullmetal Alchemist', what is the name of the younger brother of Edward Elric?",
      options: ["Alphonse Elric", "Roy Mustang", "Winry Rockbell", "Scar"],
      correctAnswer: "Alphonse Elric",
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
