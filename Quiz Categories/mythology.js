document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who is the god of creation in Hindu mythology?",
      options: ["Brahma", "Vishnu", "Shiva", "Indra"],
      correctAnswer: "Brahma",
    },
    {
      question:
        "Who is the goddess of wealth and prosperity in Hindu mythology?",
      options: ["Lakshmi", "Saraswati", "Parvati", "Durga"],
      correctAnswer: "Lakshmi",
    },
    {
      question: "Who is the monkey god in Hindu mythology?",
      options: ["Hanuman", "Garuda", "Karna", "Rama"],
      correctAnswer: "Hanuman",
    },
    {
      question: "Who is the god of destruction in Hindu mythology?",
      options: ["Shiva", "Vishnu", "Brahma", "Indra"],
      correctAnswer: "Shiva",
    },
    {
      question: "Who is the king of gods in Hindu mythology?",
      options: ["Indra", "Vishnu", "Brahma", "Shiva"],
      correctAnswer: "Indra",
    },
    {
      question:
        "Who is the goddess of knowledge, music, and arts in Hindu mythology?",
      options: ["Saraswati", "Lakshmi", "Durga", "Parvati"],
      correctAnswer: "Saraswati",
    },
    {
      question: "Who is the divine architect in Hindu mythology?",
      options: ["Vishwakarma", "Kubera", "Yama", "Varuna"],
      correctAnswer: "Vishwakarma",
    },
    {
      question: "Who is the goddess of power and war in Hindu mythology?",
      options: ["Durga", "Kali", "Sita", "Radha"],
      correctAnswer: "Durga",
    },
    {
      question: "Who is the supreme god in Vaishnavism?",
      options: ["Vishnu", "Brahma", "Shiva", "Indra"],
      correctAnswer: "Vishnu",
    },
    {
      question: "Who is the river goddess in Hindu mythology?",
      options: ["Ganga", "Yamuna", "Saraswati", "Godavari"],
      correctAnswer: "Ganga",
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
