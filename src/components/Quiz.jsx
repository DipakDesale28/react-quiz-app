import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const handleAnswerClick = useCallback(function handleAnswerClick(selectedAnswer) {

        setAnswerState('answered');
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers, selectedAnswer]
        });

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000)
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleAnswerClick(null), [handleAnswerClick])

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length
    if(quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy image"></img>
            <h2>Quiz Complete!</h2>
        </div>
    }

    return (
        <div id="quiz"> 
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleAnswerClick}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
            />        
        </div>
    );
}