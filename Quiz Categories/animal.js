document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const questions = [
    {
      question: "What is the fastest land animal?",
      options: ["Cheetah", "Lion", "Leopard", "Gazelle"],
      correctAnswer: "Cheetah",
    },
    {
      question: "What is the largest living terrestrial animal?",
      options: ["Elephant", "Giraffe", "Hippo", "Rhino"],
      correctAnswer: "Elephant",
    },
    {
      question: "Which bird is known for its ability to mimic human speech?",
      options: ["Parrot", "Crow", "Pigeon", "Seagull"],
      correctAnswer: "Parrot",
    },
    {
      question: "What is the largest fish in the ocean?",
      options: ["Whale Shark", "Great White Shark", "Blue Whale", "Manta Ray"],
      correctAnswer: "Whale Shark",
    },
    {
      question:
        "Which animal sleeps the most, spending up to 22 hours a day asleep?",
      options: ["Sloth", "Koala", "Panda", "Brown Bat"],
      correctAnswer: "Sloth",
    },
    {
      question: "What is the world's tallest animal?",
      options: ["Giraffe", "Elephant", "Hippo", "Rhino"],
      correctAnswer: "Giraffe",
    },
    {
      question: "Which big cat is known for its distinctive black mane?",
      options: ["Lion", "Tiger", "Leopard", "Jaguar"],
      correctAnswer: "Lion",
    },
    {
      question: "Which animal can live the longest?",
      options: ["Bowhead Whale", "Galapagos Tortoise", "Elephant", "Human"],
      correctAnswer: "Galapagos Tortoise",
    },
    {
      question: "Which animal has the longest tongue relative to its size?",
      options: ["Chameleon", "Giraffe", "Anteater", "Frog"],
      correctAnswer: "Chameleon",
    },
    {
      question: "What is the only mammal capable of sustained flight?",
      options: ["Bat", "Bird", "Flying Squirrel", "Pterosaur"],
      correctAnswer: "Bat",
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
