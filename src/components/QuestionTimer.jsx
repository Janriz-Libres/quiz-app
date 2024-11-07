import { useEffect, useState } from "react";
import { Timers } from "../constants";

const TIME_INTERVAL = 100;

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeout === Timers.unanswered) {
        onTimeout(null);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - TIME_INTERVAL);
    }, TIME_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={timeout === Timers.answered ? "answered" : undefined}
    />
  );
}
