import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

function getQuestionIdx(answerState, answers) {
  return answerState.selectedAnswer === ""
    ? answers.length
    : answers.length - 1;
}

function getTimer(answerState) {
  if (answerState.isCorrect !== null) return 2000;
  if (answerState.selectedAnswer) return 1000;
  return 10000;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Quiz() {
  const [answerState, setAnswerState] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  const [answers, setAnswers] = useState([]);

  const questionIdx = getQuestionIdx(answerState, answers);
  const quizOver = questionIdx === QUESTIONS.length;
  const timer = getTimer(answerState);

  const handleSelectAnswer = useCallback(
    async (answer) => {
      setAnswerState((prev) => ({
        ...prev,
        selectedAnswer: answer,
      }));
      setAnswers((prev) => [...prev, answer]);

      setTimeout(1000);
      await delay(1000);

      setAnswerState((prev) => ({
        ...prev,
        isCorrect: answer === QUESTIONS[questionIdx].answers[0],
      }));

      setTimeout(2000);
      await delay(2000);

      setAnswerState((prev) => ({
        ...prev,
        selectedAnswer: "",
        isCorrect: null,
      }));
    },
    [questionIdx]
  );

  const handleSkipAnswer = useCallback(() => {
    setAnswers((prev) => [...prev, null]);
  }, []);

  if (quizOver) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question" key={questionIdx}>
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[questionIdx].text}</h2>
        <Answers
          answers={QUESTIONS[questionIdx].answers}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
