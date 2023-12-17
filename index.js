const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizeSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizeSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

//    showQuestions(0);
}

// let questionCount = 0;

// const nextBtn = document.querySelector('.next-btn')

// nextBtn.onclick = () => {
//     questionCount++;
//     showQuestions(questionCount);
// }

// //getting questions and options from array

// function showQuestions(index) {
//     const questionText = document.querySelector('.question-text');
//     questionText.textContent = '${questions[index].numb}. ${questions[index].question}';
// }
