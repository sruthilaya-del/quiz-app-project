const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None of the above"
    ],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correct: 3
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

function loadQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  optionButtons.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.disabled = false;
    btn.style.background = "#f0f0f0";
  });

  nextBtn.style.display = "none";
  startTimer();
}

function selectAnswer(index) {
  const correctIndex = questions[currentQuestion].correct;

  optionButtons.forEach(btn => btn.disabled = true);

  if (index === correctIndex) {
    score++;
    optionButtons[index].style.background = "#9aeabc";
  } else {
    optionButtons[index].style.background = "#ff9393";
    optionButtons[correctIndex].style.background = "#9aeabc";
  }

  clearInterval(timer);
  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizEl.classList.remove("hidden");
  resultEl.classList.add("hidden");
  loadQuestion();
}

loadQuestion();

