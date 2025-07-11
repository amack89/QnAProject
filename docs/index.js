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


let currentQuestion = -1; // -1 means start page
const userAnswers = Array(questions.length).fill(null);

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const answersEl = document.getElementById('answers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function renderStartPage() {
  questionNumberEl.textContent = '';
  questionTextEl.innerHTML = '<strong>Are you the CEO of your career?</strong><br><br>This quiz will ask you 15 questions about your career management. Click Start to begin.';
  answersEl.innerHTML = '';
  prevBtn.style.display = 'none';
  nextBtn.textContent = 'Start';
  nextBtn.disabled = false;
  nextBtn.style.display = '';
  setQuizBgImage();
}

function renderQuestion() {
  if (currentQuestion === -1) {
    renderStartPage();
    return;
  }
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
  prevBtn.style.display = '';
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

// Set background image for each question
function setQuizBgImage() {
  let bg = document.getElementById('quiz-bg');
  if (!bg) return;
  let img = bg.querySelector('.quiz-bg-image');
  if (!img) {
    img = document.createElement('img');
    img.className = 'quiz-bg-image';
    bg.insertBefore(img, bg.firstChild);
  }
  if (currentQuestion === -1) {
    // Try both .jpg and .png for cover image
    img.src = '';
    img.alt = 'Quiz cover background';
    img.classList.add('cover-fit');
    // Prefer .png, fallback to .jpg if .png fails
    const tryPng = () => {
      img.src = 'img/Cover.png';
      img.onerror = () => {
        img.onerror = null;
        img.src = 'img/Cover.jpg';
      };
    };
    tryPng();
  } else {
    // Use question number (1-based) for image name
    const imgNum = currentQuestion + 1;
    img.src = `img/${imgNum}.png`;
    img.alt = `Background for question ${imgNum}`;
    img.classList.remove('cover-fit');
    img.onerror = null;
  }
}

// Update renderQuestion to also update background
function renderQuestionWithBg() {
  renderQuestion();
  setQuizBgImage();
}

// Navigation
prevBtn.onclick = () => {
  if (currentQuestion === 0) {
    currentQuestion = -1;
    renderQuestionWithBg();
    return;
  }
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestionWithBg();
  }
};

nextBtn.onclick = () => {
  if (currentQuestion === -1) {
    currentQuestion = 0;
    renderQuestionWithBg();
    return;
  }
  if (userAnswers[currentQuestion] === null) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestionWithBg();
  } else {
    // Calculate and show score
    let total = 0;
    for (let i = 0; i < questions.length; i++) {
      const ansIdx = userAnswers[i];
      if (ansIdx !== null) {
        total += questions[i].answers[ansIdx].score;
      }
    }
    // Show end background
    let bg = document.getElementById('quiz-bg');
    if (bg) {
      let img = bg.querySelector('.quiz-bg-image');
      if (!img) {
        img = document.createElement('img');
        img.className = 'quiz-bg-image';
        bg.insertBefore(img, bg.firstChild);
      }
      img.src = 'img/end.png';
      img.alt = 'Quiz end background';
    }
    questionNumberEl.textContent = '';
    let resultMsg = '';
    if (total >= 13) {
      resultMsg = 'You are the CEO';
    } else if (total >= 10) {
      resultMsg = 'Manager in Training - You have some work to do!';
    } else {
      resultMsg = 'We need to help you rise from Employee to Executive Mindset';
    }
    questionTextEl.innerHTML = `Quiz complete! Your score: ${total} / ${questions.length}<br><br><strong>${resultMsg}</strong>`;
    // Add reset button
    answersEl.innerHTML = '<button id="reset-btn" class="reset-btn">Restart Quiz</button>';
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        for (let i = 0; i < userAnswers.length; i++) userAnswers[i] = null;
        currentQuestion = -1;
        prevBtn.style.display = '';
        nextBtn.style.display = '';
        renderQuestionWithBg();
      };
    }
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
};

// Initial render
renderQuestionWithBg();
