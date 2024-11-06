import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
