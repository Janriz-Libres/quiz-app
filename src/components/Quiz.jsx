import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const AnswerStates = Object.freeze({
  UNANSWERED: Symbol("unanswered"),
  ANSWERED: Symbol("answered"),
  CORRECT: Symbol("correct"),
  WRONG: Symbol("wrong"),
});

export default function Quiz() {
  const [answerState, setAnswerState] = useState(AnswerStates.UNANSWERED);
  const [answers, setAnswers] = useState([]);

  const questionIdx =
    answerState === AnswerStates.UNANSWERED
      ? answers.length
      : answers.length - 1;
  const quizOver = questionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (answer) => {
      setAnswerState(AnswerStates.ANSWERED);
      setAnswers((prev) => [...prev, answer]);

      setTimeout(() => {
        if (answer === QUESTIONS[questionIdx].answers[0]) {
          setAnswerState(AnswerStates.CORRECT);
        } else {
          setAnswerState(AnswerStates.WRONG);
        }

        setTimeout(() => setAnswerState(AnswerStates.UNANSWERED), 2000);
      }, 1000);
    },
    [questionIdx]
  );

  if (quizOver) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[questionIdx].answers].sort(() => {
    Math.random() - 0.5;
  });

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={questionIdx}
          timeout={10000}
          onTimeout={handleSelectAnswer}
        />
        <h2>{QUESTIONS[questionIdx].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = answers[answers.length - 1] === answer;

            let cssClasses = "";

            switch (answerState) {
              case AnswerStates.ANSWERED:
                cssClasses = "selected";
                break;
              case AnswerStates.CORRECT:
                cssClasses = "correct";
                break;
              case AnswerStates.WRONG:
                cssClasses = "wrong";
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={`${isSelected ? cssClasses : ""}`}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
