import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const handleAnswerClick = useCallback(
    function handleAnswerClick(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleAnswerClick(null),
    [handleAnswerClick]
  );

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy image"></img>
        <h2>Quiz Complete!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleAnswerClick}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
