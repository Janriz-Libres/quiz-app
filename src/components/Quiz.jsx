import { useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const questionIdx = answers.length;
  const quizOver = answers.length === QUESTIONS.length;

  function handleSelectAnswer(answer) {
    setAnswers((prev) => [...prev, answer]);
  }

  if (quizOver) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[questionIdx].answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div id="quiz">
      <div id="question">
        <p>{QUESTIONS[questionIdx].text}</p>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
