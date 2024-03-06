document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Who was the first Emperor of India?",
      options: [
        "Chandragupta Maurya",
        "Ashoka the Great",
        "Akbar the Great",
        "Chandragupta II",
      ],
      correctAnswer: "Chandragupta Maurya",
    },
    {
      question: "In which year did the Indian independence movement begin?",
      options: ["1857", "1905", "1919", "1947"],
      correctAnswer: "1857",
    },
    {
      question: "Who was the founder of the Maurya Empire?",
      options: [
        "Chandragupta Maurya",
        "Ashoka the Great",
        "Bimbisara",
        "Bindusara",
      ],
      correctAnswer: "Chandragupta Maurya",
    },
    {
      question: "Which Indian king is known as 'The Great'?",
      options: ["Ashoka", "Chandragupta Maurya", "Akbar", "Shivaji"],
      correctAnswer: "Ashoka",
    },
    {
      question: "Who was the last Viceroy of India?",
      options: [
        "Lord Mountbatten",
        "Lord Dalhousie",
        "Lord Curzon",
        "Lord Canning",
      ],
      correctAnswer: "Lord Mountbatten",
    },
    {
      question: "Who was the first President of the Indian National Congress?",
      options: [
        "Womesh Chunder Bonnerjee",
        "Dadabhai Naoroji",
        "Surendranath Banerjee",
        "A.O. Hume",
      ],
      correctAnswer: "Womesh Chunder Bonnerjee",
    },
    {
      question:
        "Which battle is considered as the decisive victory of the British East India Company in India?",
      options: [
        "Battle of Plassey",
        "Battle of Buxar",
        "Battle of Panipat",
        "Battle of Talikota",
      ],
      correctAnswer: "Battle of Plassey",
    },
    {
      question: "Who was the first female Prime Minister of India?",
      options: [
        "Indira Gandhi",
        "Sarojini Naidu",
        "Sonia Gandhi",
        "Pratibha Patil",
      ],
      correctAnswer: "Indira Gandhi",
    },
    {
      question: "Which Mughal emperor built the Taj Mahal?",
      options: ["Shah Jahan", "Akbar", "Jahangir", "Aurangzeb"],
      correctAnswer: "Shah Jahan",
    },
    {
      question: "Who is known as the 'Father of the Indian Constitution'?",
      options: [
        "B.R. Ambedkar",
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
        "Sardar Patel",
      ],
      correctAnswer: "B.R. Ambedkar",
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
