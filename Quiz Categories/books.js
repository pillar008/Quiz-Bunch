document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "Who is the author of 'To Kill a Mockingbird'?",
      options: [
        "Harper Lee",
        "J.K. Rowling",
        "Stephen King",
        "Charles Dickens",
      ],
      correctAnswer: "Harper Lee",
    },
    {
      question: "Which novel is set in the fictional Maycomb County?",
      options: [
        "To Kill a Mockingbird",
        "Pride and Prejudice",
        "1984",
        "The Great Gatsby",
      ],
      correctAnswer: "To Kill a Mockingbird",
    },
    {
      question: "Who wrote the 'Harry Potter' series?",
      options: [
        "J.K. Rowling",
        "George Orwell",
        "J.R.R. Tolkien",
        "C.S. Lewis",
      ],
      correctAnswer: "J.K. Rowling",
    },
    {
      question:
        "What is the title of the first book in J.R.R. Tolkien's 'The Lord of the Rings' trilogy?",
      options: [
        "The Fellowship of the Ring",
        "The Two Towers",
        "The Return of the King",
        "The Hobbit",
      ],
      correctAnswer: "The Fellowship of the Ring",
    },
    {
      question: "In 'Pride and Prejudice', who is the author of the novel?",
      options: [
        "Jane Austen",
        "Emily Brontë",
        "Charlotte Brontë",
        "Charles Dickens",
      ],
      correctAnswer: "Jane Austen",
    },
    {
      question:
        "What is the name of the protagonist in 'The Catcher in the Rye'?",
      options: [
        "Holden Caulfield",
        "Jay Gatsby",
        "Atticus Finch",
        "Huckleberry Finn",
      ],
      correctAnswer: "Holden Caulfield",
    },
    {
      question: "Who wrote 'The Great Gatsby'?",
      options: [
        "F. Scott Fitzgerald",
        "Ernest Hemingway",
        "John Steinbeck",
        "William Faulkner",
      ],
      correctAnswer: "F. Scott Fitzgerald",
    },
    {
      question:
        "Which novel is about a dystopian society where critical thought is suppressed?",
      options: [
        "1984",
        "Brave New World",
        "Fahrenheit 451",
        "The Handmaid's Tale",
      ],
      correctAnswer: "1984",
    },
    {
      question: "Who is the author of 'To the Lighthouse'?",
      options: [
        "Virginia Woolf",
        "James Joyce",
        "D.H. Lawrence",
        "F. Scott Fitzgerald",
      ],
      correctAnswer: "Virginia Woolf",
    },
    {
      question: "What is the first book in the 'Game of Thrones' series?",
      options: [
        "A Game of Thrones",
        "A Clash of Kings",
        "A Storm of Swords",
        "A Feast for Crows",
      ],
      correctAnswer: "A Game of Thrones",
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
