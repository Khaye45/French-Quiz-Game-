//DOM ELEMENTS
const startScreen=document.querySelector('#start-screen');
const quizScreen=document.querySelector('#quiz-screen');
const resultScreen = document.querySelector("#results-screen");
const startButton = document.querySelector("#start-btn");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers-container");
const currentQuestionSpan = document.querySelector("#current-question");
const totalQuestionsSpan = document.querySelector("#total-questions");
const scoreSpan = document.querySelector("#score");
const finalScoreSpan = document.querySelector("#final-score");
const maxScoreSpan = document.querySelector("#max-score");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector(".restart-btn");
const progressBar = document.querySelector(".progress");

const quizQuestions = [
    {
      question: "What would you say to your friend when you're leaving school for the day?",
      answers: [
        { text: "Bonjour", correct: false },
        { text: "Comment ça va?", correct: false },
        { text: "A demain!", correct: true },
        { text: "Bienvenue", correct: false },
      ],
    },
    {
      question: "What would you say to your family before they start eating?",
      answers: [
        { text: "Merci beaucoup!", correct: false },
        { text: "Bon appetit!", correct: true },
        { text: "Enchanté!", correct: false },
        { text: "Je suis fatigué!", correct: false },
      ],
    },
    {
      question: "What would you say to someone who just helped you carry your books?",
      answers: [
        { text: "Excusez-moi!", correct: false },
        { text: "De rien", correct: false },
        { text: "Je vais bien!", correct: false },
        { text: "Merci!", correct: true },
      ],
    },
    {
        question: "You are late for class.What would you say to the teacher when you walk in?",
        answers: [
          { text: "Salut!", correct: false },
          { text: "Bonsoir!", correct: false },
          { text: "Pardon pour le retard.", correct: true },
          { text: "Bonne nuit!", correct: false },
        ],
      },
      {
        question: "What do you say to greet your teacher in the morning?",
        answers: [
          { text: "Bonne nuit", correct: false },
          { text: "Bon après midi", correct: false },
          { text: "Bonjour", correct: true },
          { text: "Bonsoir", correct: false },
        ],
      },

      {
        question: "Your friend is leaving for the weekend. What do you say?",
        answers: [
          { text: "Merci", correct: false },
          { text: "S'il te plait", correct: false },
          { text: "A lundi", correct: true },
          { text: "De rien", correct: false },
        ],
      },
      {
        question: "You meet someone at a party.What's the most polite thing to say?",
        answers: [
          { text: "Salut!", correct: false },
          { text: "Comment tu t'appelle?", correct: false },
          { text: "Enchanté", correct: true },
          { text: "A toute a l'heure!", correct: false },
        ],
      },
    ];


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
    // reset state
    answersDisabled = false;
  
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
  
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent +"%";
    
  
    questionText.textContent = currentQuestion.question;
  
    answersContainer.innerHTML = "";
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn");
      button.dataset.correct = answer.correct;

      button.addEventListener("click", selectAnswer);
  
      answersContainer.appendChild(button);
    });
  }

  function selectAnswer(event) {
    // optimization check
    if (answersDisabled) return;
  
    answersDisabled = true;
  
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
  
    // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answersContainer.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      } else if (button === selectedButton) {
        button.classList.add("incorrect");
      }
    });
  
    if (isCorrect) {
      score++;
      scoreSpan.textContent = score;
    }


setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);

  }


  function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
  
    finalScoreSpan.textContent = score;
  
    const percentage = (score / quizQuestions.length) * 100;
  
    if (percentage === 100) {
      resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
      resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
      resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
      resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
      resultMessage.textContent = "Keep studying! You'll get better!";
    }
  }

  function restartQuiz() {
    resultScreen.classList.remove("active");
    
  
    startQuiz();
  }

    