import { useState, useEffect } from "react";
import "./quizapp.css";

const addQuestions = [
  {
    question: "What is the Capital of France?",
    op1: "Paris",
    op2: "London",
    op3: "Berlin",
    op4: "Madrid",
    Answer: "Paris",
  },
  {
    question: "2 + 2 = ?",
    op1: 3,
    op2: 4,
    op3: 5,
    op4: 6,
    Answer: 4,
  },
];

function QuizApp() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestion] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState([]);

  useEffect(() => {
    setQuizQuestion(addQuestions);
    setDisabledButtons(new Array(addQuestions.length).fill(false));
  }, []);

  const handleClick = (e, q, index) => {
    const clickedValue = e.target.value;
    const correctValue = q.Answer;

    const newDisabled = [...disabledButtons];
    newDisabled[index] = true;
    setDisabledButtons(newDisabled);

    const buttons = e.target.parentElement.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (btn.value === correctValue) btn.style.background = "green";
      else if (btn.value === clickedValue) btn.style.background = "red";
    });
    if (clickedValue === correctValue) setFinalScore(finalScore + 1);
    else setFinalScore(finalScore - 1);
  };

  return (
    <div className="quiz-wrapper">
      <h1>Welcome to the Quiz!</h1>
      <p>Press start to begin the quiz.</p>

      <button
        className="start-btn"
        onClick={() => {
          setShowQuiz(true);
          setFinalScore(0);
        }}
        disabled={showQuiz}
      >
        Start Quiz
      </button>

      <button
        className="end-btn"
        onClick={() => setShowQuiz(false)}
        disabled={!showQuiz}
      >
        End Quiz
      </button>

      {showQuiz && (
        <>
          <h4>Final Score: {finalScore}</h4>

          {quizQuestions.map((q, index) => (
            <div className="card" key={index}>
              <h2>{q.question}</h2>
              <div className="options">
                {[q.op1, q.op2, q.op3, q.op4].map((opt) => (
                  <button
                    key={opt}
                    value={opt}
                    disabled={disabledButtons[index]}
                    onClick={(e) => handleClick(e, q, index)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default QuizApp;
