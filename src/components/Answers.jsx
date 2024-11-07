import { useRef } from "react";

function getCssClasses(answerState, answer) {
  if (answerState.isCorrect) return "correct";
  if (answerState.isCorrect === false) return "wrong";
  if (answerState.selectedAnswer) return "selected";
  return "";
}

export default function Answers({ answers, answerState, onSelect }) {
  const shuffledAnswers = useRef([...answers].sort(() => Math.random() - 0.5));

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = answerState.selectedAnswer === answer;
        const cssClasses = getCssClasses(answerState, answer);

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={`${isSelected ? cssClasses : ""}`}
              disabled={answerState.selectedAnswer}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
