import { useState, useEffect } from "react";
import "./quiztimer.css";

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "2 + 2 = ?",
    options: [3, 4, 5, 6],
    answer: 4,
  },
];

function QuizTimerApp() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds === 0) {
      setIsDisabled(true);
      setIsRunning(false);
      setScore((prev) => prev - 1); // missed question penalty
    }
    return () => clearTimeout(timer);
  }, [isRunning, seconds]);

  // Handle option click
  const handleOptionClick = (opt) => {
    if (isDisabled) return;

    setSelectedOption(opt);
    setIsDisabled(true);
    setIsRunning(false);

    if (opt === quizQuestions[currentQIndex].answer) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => prev - 1);
    }
  };

  // Next question
  const handleNext = () => {
    setCurrentQIndex((prev) => (prev + 1) % quizQuestions.length);
    setSeconds(10);
    setIsDisabled(false);
    setIsRunning(true);
    setSelectedOption("");
  };

  return (
    <div className="quiz-wrapper">
      <h1>Quiz Timer App</h1>
      <h2>Score: {score}</h2>
      <h3>Time Left: {seconds}</h3>

      <div className="card">
        <h2>{quizQuestions[currentQIndex].question}</h2>
        <div className="options">
          {quizQuestions[currentQIndex].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              disabled={isDisabled}
              style={{
                backgroundColor:
                  selectedOption === opt
                    ? opt === quizQuestions[currentQIndex].answer
                      ? "green"
                      : "red"
                    : "",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleNext}>Next Question</button>
      <button onClick={() => setIsRunning(true)}>Start Timer</button>
      <button onClick={() => setIsRunning(false)}>Stop Timer</button>
    </div>
  );
}

export default QuizTimerApp;
