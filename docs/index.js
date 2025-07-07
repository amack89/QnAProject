const answerOptions = [
  { text: 'Yes', score: 1.0 },
  { text: 'Somewhat', score: 0.5 },
  { text: 'No', score: 0.0 }
];
const questions = [
  { question: 'Do you have a Career Management Plan?', answers: answerOptions },
  { question: 'Do you have an updated resume?', answers: answerOptions },
  { question: 'Do you contribute to your Field of Work? (Articles, Post, Answer Questions)', answers: answerOptions },
  { question: 'Do you actively participate in an association in your Field of Work?', answers: answerOptions },
  { question: 'Do you volunteer in your Field of Work?', answers: answerOptions },
  { question: 'Do you mentor anyone in your Field of Work?', answers: answerOptions },
  { question: 'Have you been recently certified, trained or some form of continuing education in your Field of Work?', answers: answerOptions },
  { question: 'Do you have a LinkedIn Profile?', answers: answerOptions },
  { question: 'Do you have a Personal Brand?', answers: answerOptions },
  { question: 'Do you have a professional development budget that you actively use?', answers: answerOptions },
  { question: 'Are you financially prepared to make a career move or take a calculated risk if needed?', answers: answerOptions },
  { question: 'Do you research market trends in your industry to anticipate shifts and prepare accordingly?', answers: answerOptions },
  { question: 'Do you have a Plan B (or Plan C) in case of unexpected career disruption or job loss?', answers: answerOptions },
  { question: 'Do you proactively seek feedback and act on it to grow in your role?', answers: answerOptions },
  { question: 'Have you identified your core strengths and know how to articulate them clearly in interviews or networking settings?', answers: answerOptions }
];

let currentQuestion = 0;
const userAnswers = Array(questions.length).fill(null);

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const answersEl = document.getElementById('answers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function renderQuestion() {
  const q = questions[currentQuestion];
  questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionTextEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.textContent = ans.text;
    btn.className = userAnswers[currentQuestion] === idx ? 'selected' : '';
    btn.onclick = () => {
      userAnswers[currentQuestion] = idx;
      renderQuestion();
    };
    answersEl.appendChild(btn);
  });
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Finish' : 'Next';
  nextBtn.disabled = userAnswers[currentQuestion] === null;
}

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
};

nextBtn.onclick = () => {
  if (userAnswers[currentQuestion] === null) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    // Calculate and show score
    let total = 0;
    for (let i = 0; i < questions.length; i++) {
      const ansIdx = userAnswers[i];
      if (ansIdx !== null) {
        total += questions[i].answers[ansIdx].score;
      }
    }
    questionNumberEl.textContent = '';
    questionTextEl.textContent = `Quiz complete! Your score: ${total} / ${questions.length}`;
    answersEl.innerHTML = '';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
};

// Initialize
renderQuestion();
