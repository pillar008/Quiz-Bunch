const questuion = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: "What doees HTML Stands For?",
        choice1: "Hyper Text Multi Language",
        choice2: "Hyper Text Multiple Language",
        choice3: "Hyper Text Markup Language",
        choice4: "Home Text Multi Language",
        answer: 3
    },
    {
        question: "The full form of CSS is",
        choice1: "Cascade style sheets",
        choice2: "Color and style sheets",
        choice3: "Cascading style sheets",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "The property in CSS used to change the background color of an element is",
        choice1: "bgcolor",
        choice2: "background-color",
        choice3: "color",
        choice4: "All of the above",
        answer: 2
    },
    {
        question: "What does PHP stands for?",
        choice1: "HyperText Preprocessor",
        choice2: "Hometext Programming",
        choice3: "Hypertext Preprogramming",
        choice4: "Programming Hypertext Preproessor",
        answer: 1
    },
    {
        question: "Which type of JavaScript language is",
        choice1: "Object-Oriented",
        choice2: "Object-Based",
        choice3: "Assembly-language",
        choice4: "High-level",
        answer: 1
    }
];


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //GO TO THE END PAGE
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question : ${questionCounter}/${MAX_QUESTIONS}`;
    //UPDATE THE PROGRESS BAR
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex =  Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    questuion.innerText = currentQuestion.question;

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

        if(classToApply === "correct")
        {
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
    score+=num;
    scoreText.innerText = score;
}

startGame();