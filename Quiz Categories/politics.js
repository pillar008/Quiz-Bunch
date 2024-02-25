document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who is the current Prime Minister of India?",
      options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Manmohan Singh"],
      correctAnswer: "Narendra Modi",
    },
    {
      question: "Who is known as the 'Iron Lady of India'?",
      options: ["Indira Gandhi", "Sonia Gandhi", "Mamata Banerjee", "Mayawati"],
      correctAnswer: "Indira Gandhi",
    },
    {
      question: "Which political party is currently in power in Maharashtra?",
      options: ["Shiv Sena", "BJP", "Congress", "NCP"],
      correctAnswer: "Shiv Sena",
    },
    {
      question: "Who is the President of the Indian National Congress?",
      options: [
        "Sonia Gandhi",
        "Rahul Gandhi",
        "Priyanka Gandhi",
        "Manmohan Singh",
      ],
      correctAnswer: "Sonia Gandhi",
    },
    {
      question: "Who was the first woman Chief Minister of an Indian state?",
      options: [
        "Sucheta Kriplani",
        "Indira Gandhi",
        "Mamata Banerjee",
        "Mayawati",
      ],
      correctAnswer: "Sucheta Kriplani",
    },
    {
      question: "Who was the first President of India?",
      options: [
        "Dr. Rajendra Prasad",
        "Jawaharlal Nehru",
        "Sardar Patel",
        "Indira Gandhi",
      ],
      correctAnswer: "Dr. Rajendra Prasad",
    },
    {
      question: "Who is the Chief Minister of Delhi?",
      options: [
        "Arvind Kejriwal",
        "Manohar Lal Khattar",
        "Yogi Adityanath",
        "Nitish Kumar",
      ],
      correctAnswer: "Arvind Kejriwal",
    },
    {
      question: "Which political party is symbolized by a hand?",
      options: ["Indian National Congress", "BJP", "AAP", "Shiv Sena"],
      correctAnswer: "Indian National Congress",
    },
    {
      question: "Who is the Vice President of India?",
      options: [
        "Venkaiah Naidu",
        "Amit Shah",
        "Nirmala Sitharaman",
        "Rajnath Singh",
      ],
      correctAnswer: "Venkaiah Naidu",
    },
    {
      question: "Who founded the Aam Aadmi Party (AAP)?",
      options: [
        "Arvind Kejriwal",
        "Rahul Gandhi",
        "Narendra Modi",
        "Mamata Banerjee",
      ],
      correctAnswer: "Arvind Kejriwal",
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
