import QUESTIONS from "../questions";
import { useState } from "react";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const questionIdx = answers.length;

  function handleSelectAnswer(answer) {
    setAnswers((prev) => [...prev, answer]);
  }

  return (
    <div id="quiz">
      <div id="question">
        <p>{QUESTIONS[questionIdx].text}</p>
        <ul id="answers">
          {QUESTIONS[questionIdx].answers.map((answer) => (
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
