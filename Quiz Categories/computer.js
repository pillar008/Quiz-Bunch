document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Who is the co-founder of Microsoft?",
      options: ["Bill Gates", "Steve Jobs", "Larry Page", "Mark Zuckerberg"],
      correctAnswer: "Bill Gates",
    },
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Processor Unit",
        "Computer Processor Unit",
      ],
      correctAnswer: "Central Processing Unit",
    },
    {
      question:
        "Which programming language is commonly used for web development?",
      options: ["JavaScript", "Python", "Java", "C++"],
      correctAnswer: "JavaScript",
    },
    {
      question: "What is the main function of RAM in a computer?",
      options: [
        "To store temporary data",
        "To store permanent data",
        "To control input/output devices",
        "To perform calculations",
      ],
      correctAnswer: "To store temporary data",
    },
    {
      question: "Which company developed the Java programming language?",
      options: ["Sun Microsystems", "Microsoft", "Apple", "IBM"],
      correctAnswer: "Sun Microsystems",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hypertext Markup Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language",
        "Hypertext Model Language",
      ],
      correctAnswer: "Hypertext Markup Language",
    },
    {
      question: "What is the full form of URL?",
      options: [
        "Uniform Resource Locator",
        "Universal Resource Locator",
        "Uniform Resource Link",
        "Universal Resource Link",
      ],
      correctAnswer: "Uniform Resource Locator",
    },
    {
      question: "Which of the following is NOT a programming language?",
      options: ["Photoshop", "Python", "C++", "Ruby"],
      correctAnswer: "Photoshop",
    },
    {
      question: "What is the primary function of an operating system?",
      options: [
        "To manage hardware and software resources",
        "To create graphics",
        "To manage databases",
        "To develop software applications",
      ],
      correctAnswer: "To manage hardware and software resources",
    },
    {
      question: "What is the binary system?",
      options: [
        "A number system with base 2",
        "A number system with base 10",
        "A number system with base 16",
        "A number system with base 8",
      ],
      correctAnswer: "A number system with base 2",
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
