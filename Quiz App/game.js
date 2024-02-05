const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0,loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })

            return formattedQuestion;
        });
        //questions = loadedQuestions;
        game.classList.remove("hidden");
        loader.classList.add("hidden");
        startGame();
    })
    .catch(err => {
        console.error(err);
    });


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //GO TO THE END PAGE
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question : ${questionCounter}/${MAX_QUESTIONS}`;
    //UPDATE THE PROGRESS BAR
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestion.splice(questionIndex, 1);

    acceptingAnswer = true;
};

// choices.forEach(choice => {
//     choice.addEventListener('click', e => {
//         if(!acceptingAnswer) return;

//         acceptingAnswer = false;
//         const selectedChoice = e.target;
//         const selectedAnswer = selectedChoice.dataset['number'];


//         const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";


//         selectedChoice.parentElement.classList.add(classToApply);

//         setTimeout(() => {
//             selectedChoice.parentElement.classList.remove(classToApply);
//             getNewQuestion();
//         },1000);
//     });
// });


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const correctAnswer = currentQuestion.answer;

        // Highlight the correct choice
        const correctChoice = choices.find(choice => choice.dataset['number'] == correctAnswer);
        correctChoice.parentElement.classList.add("correct");

        // Add the appropriate class based on the correctness of the selected choice
        const classToApply = selectedAnswer == correctAnswer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            // Remove classes for both correct and incorrect after a delay
            selectedChoice.parentElement.classList.remove(classToApply);
            correctChoice.parentElement.classList.remove("correct");
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
