import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, answered }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeout === 10000) {
        onTimeout(null);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={timeout === 1000 ? "answered" : undefined}
    />
  );
}
