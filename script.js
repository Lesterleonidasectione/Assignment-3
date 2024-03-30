// Quiz Data
const quizData = [
    {
      question: "Who is considered the first Computer Programmer?",
      options: ["Steve Jobs", "Lady Ada Lovelace", "Bill Gates", "John Wick"],
      answer: "Lady Ada Lovelace"
    },
    {
      question: "How many members does the Horsemen of Apocalypse have?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "What does 'Carpe Diem' mean?",
      options: ["Seize that guy", "Seize the day", "Size 6", "Seize the night"],
      answer: "Seize the day"
    },
    {
      question: "What does 'Ora et Labora' mean?",
      options: ["Oral and Work", "Aura and Work", "Odor and Giving Birth", "Pray and Work"],
      answer: "Pray and Work"
    }
  ];
  
  // Variables
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Functions
  function displayQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";
  
    const questionObj = quizData[currentQuestionIndex];
  
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
  
    const question = document.createElement("p");
    question.textContent = `${currentQuestionIndex + 1}. ${questionObj.question}`;
    questionDiv.appendChild(question);
  
    questionObj.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.setAttribute("type", "radio");
      optionInput.setAttribute("name", "answer");
      optionInput.setAttribute("value", option);
      optionInput.classList.add("option");
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      questionDiv.appendChild(optionLabel);
    });
  
    questionContainer.appendChild(questionDiv);
  }
  
  function checkAnswer(event) {
    event.preventDefault();
  
    const selectedOption = document.querySelector('input[type="radio"]:checked');
  
    if (!selectedOption) {
      return;
    }
  
    const selectedAnswer = selectedOption.value;
    const correctAnswer = quizData[currentQuestionIndex].answer;
  
    if (selectedAnswer === correctAnswer) {
      score++;
      selectedOption.parentNode.classList.add("correct");
    } else {
      selectedOption.parentNode.classList.add("incorrect");
      const correctOptionLabel = document.querySelector(`input[value="${correctAnswer}"]`).parentNode;
      correctOptionLabel.classList.add("correct");
    }
  
    setTimeout(nextQuestion, 1000);
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      displayQuestion();
    } else {
      displayScore();
    }
  }
  
  function displayScore() {
    const totalQuestions = quizData.length;
    const percentage = (score / totalQuestions) * 100;
    const alertMessage = `Your quiz score is ${percentage.toFixed(2)}%`;
  
    alert(alertMessage);
  
    const retakeConfirmation = confirm("Do you want to retake the quiz?");
  
    if (retakeConfirmation) {
      currentQuestionIndex = 0;
      score = 0;
      displayQuestion();
    }
  }
  
  // Initial function call
  displayQuestion();
  
  // Event listener for form submission
  document.getElementById("quizForm").addEventListener("submit", checkAnswer);
  