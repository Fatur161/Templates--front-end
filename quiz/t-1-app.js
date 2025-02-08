class Quiz {
  constructor(container, quizData, type = "quiz") {
    this.container = container; // DOM-элемент, куда вставлять квиз
    this.quizData = quizData;   // Данные квиза: массив вопросов и ответов
    this.type = type;           // Тип квиза: "quiz" (с правильными ответами) или "poll" (опросник)
    this.currentQuestionIndex = 0; // Индекс текущего вопроса
    this.answers = [];             // Массив выбранных ответов
    this.correctAnswersCount = 0;  // Счетчик правильных ответов
    this.render();                 // Отрисовка первого состояния
  }
  
  // Отрисовка интерфейса
  render() {
    const { question, answers } = this.quizData[this.currentQuestionIndex];
    const totalQuestions = this.quizData.length;
    
    // Очистка контейнера
    this.container.innerHTML = "";
    
    // Создание заголовка
    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.className = "title";
    title.innerHTML = `Question <strong>${this.currentQuestionIndex + 1}</strong>: ${question}`;
    header.appendChild(title);
    
    // Создание списка ответов
    const main = document.createElement("main");
    const ul = document.createElement("ul");
    ul.className = "quiz__list";
    
    answers.forEach((answer, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.className = "quiz__btn quiz__btn--default";
      button.textContent = answer.text;
      button.dataset.index = index;
      
      // Обработчик клика на кнопку
      button.addEventListener("click", () => this.handleAnswerClick(index));
      
      li.appendChild(button);
      ul.appendChild(li);
    });
    
    main.appendChild(ul);
    
    // Создание футера
    const footer = document.createElement("footer");
    const p = document.createElement("p");
    p.innerHTML = `question: <span id="current-question">${
      this.currentQuestionIndex + 1
    }</span> / <span id="all-questions">${totalQuestions}</span>`;
    footer.appendChild(p);
    
    // Сборка компонентов
    this.container.appendChild(header);
    this.container.appendChild(main);
    this.container.appendChild(footer);
  }
  
  // Обработка клика по ответу
  handleAnswerClick(selectedIndex) {
    const currentQuestion = this.quizData[this.currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers[selectedIndex];
    
    // Сохраняем выбранный ответ
    this.answers.push({ question: currentQuestion.question, answer: selectedAnswer.text });
    
    // Если это квиз с правильными ответами, подсвечиваем результат
    if (this.type === "quiz") {
      if (selectedAnswer.isCorrect) {
        this.correctAnswersCount++; // Увеличиваем счетчик правильных ответов
      }
      this.highlightAnswer(selectedIndex, selectedAnswer.isCorrect);
    } else {
      // Для опросника просто переходим к следующему вопросу
      this.nextQuestion();
    }
  }
  
  // Подсветка ответа (правильный/неправильный)
  highlightAnswer(selectedIndex, isCorrect) {
    const buttons = this.container.querySelectorAll(".quiz__btn");
    
    buttons.forEach((button, index) => {
      if (index === selectedIndex) {
        button.classList.remove("quiz__btn--default");
        button.classList.add(isCorrect ? "quiz__btn--right" : "quiz__btn--wrong");
      } else if (this.quizData[this.currentQuestionIndex].answers[index].isCorrect) {
        button.classList.remove("quiz__btn--default");
        button.classList.add("quiz__btn--right");
      } else {
        button.classList.add("quiz__btn--unactive");
      }
      
      button.disabled = true; // Отключаем кнопки после выбора
    });
    
    // Переход к следующему вопросу через таймаут
    setTimeout(() => this.nextQuestion(), 1000);
  }
  
  // Переход к следующему вопросу
  nextQuestion() {
    if (this.currentQuestionIndex < this.quizData.length - 1) {
      this.currentQuestionIndex++;
      this.render();
    } else {
      this.showResults();
    }
  }
  
  // Отображение результатов
  showResults() {
    this.container.innerHTML = "";
    
    if (this.type === "quiz") {
      // Для квиза с правильными ответами
      const resultsTitle = document.createElement("h2");
      resultsTitle.textContent = "Quiz Results";
      
      const resultsText = document.createElement("p");
      resultsText.textContent = `You answered ${this.correctAnswersCount} out of ${this.quizData.length} questions correctly.`;
      
      this.container.appendChild(resultsTitle);
      this.container.appendChild(resultsText);
    } else {
      // Для опросника
      const thankYouMessage = document.createElement("h2");
      thankYouMessage.textContent = "Thank you for completing the poll!";
      this.container.appendChild(thankYouMessage);
    }
  }
}

const quizData = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Madrid", isCorrect: false },
      { text: "Rome", isCorrect: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Jupiter", isCorrect: false },
      { text: "Venus", isCorrect: false },
    ],
  },
];

const pollData = [
  {
    question: "Are you straight?",
    answers: [
      {text: "Yep"},
      {text: "Nope"},
    ],

  },
  {
    question: "Are u older then 21?",
    answers: [
      {text: "Yep"},
      {text: "Nope"},
    ],
  },
];

const quizContainer = document.querySelector("#first-quiz");
// Для квиза с правильными ответами
const quiz = new Quiz(quizContainer, quizData, "quiz");

const pollContainer = document.querySelector("#first-poll")
// Для опросника
const poll = new Quiz(pollContainer, pollData, "poll");
