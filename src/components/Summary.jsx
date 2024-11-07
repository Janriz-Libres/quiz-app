import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

function setStyles(answer, correctAnswer) {
  if (!answer) return "skipped";
  return answer === correctAnswer ? "correct" : "wrong";
}

export default function Summary({ answers }) {
  const skipped = answers.filter((answer) => !answer).length;
  const correct = answers.filter(
    (answer, idx) => answer === QUESTIONS[idx].answers[0]
  ).length;

  const skippedPercentage = Math.round((skipped / answers.length) * 100);
  const correctPercentage = Math.round((correct / answers.length) * 100);
  const wrongPercentage = 100 - skippedPercentage - correctPercentage;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Quiz complete" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, idx) => {
          const styles = setStyles(answer, QUESTIONS[idx].answers[0]);

          return (
            <li key={idx}>
              <h3>{idx + 1}</h3>
              <p className="question">{QUESTIONS[idx].text}</p>
              <p className={`user-answer ${styles}`}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
