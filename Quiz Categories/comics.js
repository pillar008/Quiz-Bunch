document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const scoreScreen = document.getElementById("score-screen");
  const scoreCanvas = document.getElementById("score-canvas");
  const questions = [
    {
      question: "Who is the alter ego of Batman?",
      options: ["Bruce Wayne", "Clark Kent", "Peter Parker", "Tony Stark"],
      correctAnswer: "Bruce Wayne",
    },
    {
      question: "Which superhero is known as the 'Man of Steel'?",
      options: ["Superman", "Spider-Man", "Iron Man", "Wolverine"],
      correctAnswer: "Superman",
    },
    {
      question: "Who is the archenemy of Spider-Man?",
      options: ["Green Goblin", "The Joker", "Lex Luthor", "Magneto"],
      correctAnswer: "Green Goblin",
    },
    {
      question: "Which comic book character is the king of Wakanda?",
      options: ["Black Panther", "Captain America", "Thor", "Hulk"],
      correctAnswer: "Black Panther",
    },
    {
      question: "Who is the strongest mutant in the X-Men?",
      options: ["Jean Grey", "Wolverine", "Cyclops", "Storm"],
      correctAnswer: "Jean Grey",
    },
    {
      question: "Who is the main villain in the 'Infinity Gauntlet' storyline?",
      options: ["Thanos", "Doctor Doom", "Darkseid", "Joker"],
      correctAnswer: "Thanos",
    },
    {
      question: "Which superhero is known as the 'Scarlet Speedster'?",
      options: ["The Flash", "Green Lantern", "Aquaman", "Wonder Woman"],
      correctAnswer: "The Flash",
    },
    {
      question: "What is the real name of Captain America?",
      options: ["Steve Rogers", "Bruce Banner", "Tony Stark", "Clark Kent"],
      correctAnswer: "Steve Rogers",
    },
    {
      question: "Who is the creator of the Teenage Mutant Ninja Turtles?",
      options: [
        "Kevin Eastman & Peter Laird",
        "Stan Lee",
        "Todd McFarlane",
        "Frank Miller",
      ],
      correctAnswer: "Kevin Eastman & Peter Laird",
    },
    {
      question:
        "Which comic book series features characters such as Cyclops, Wolverine, and Professor X?",
      options: ["X-Men", "Avengers", "Justice League", "Fantastic Four"],
      correctAnswer: "X-Men",
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
