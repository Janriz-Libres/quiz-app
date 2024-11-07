import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";
import { Timers } from "../constants";
import Summary from "./Summary";

function getQuestionIdx(answerState, answers) {
  return answerState.selectedAnswer === ""
    ? answers.length
    : answers.length - 1;
}

function getTimer(answerState) {
  if (answerState.isCorrect !== null) return Timers.scored;
  if (answerState.selectedAnswer) return Timers.answered;
  return Timers.unanswered;
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

  async function handleSelectAnswer(answer) {
    setAnswerState((prev) => ({
      ...prev,
      selectedAnswer: answer,
    }));
    setAnswers((prev) => [...prev, answer]);

    await delay(Timers.answered);
    setAnswerState((prev) => ({
      ...prev,
      isCorrect: answer === QUESTIONS[questionIdx].answers[0],
    }));

    await delay(Timers.scored);
    setAnswerState((prev) => ({
      ...prev,
      selectedAnswer: "",
      isCorrect: null,
    }));
  }

  const handleSkipAnswer = useCallback(() => {
    setAnswers((prev) => [...prev, null]);
  }, []);

  if (quizOver) {
    return <Summary answers={answers} />;
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
