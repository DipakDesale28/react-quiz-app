import { useState, useEffect } from "react";

export default function QuestionTimer({onTimeout, timeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log("SETTING TIMER")
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout])

    useEffect(() => {
        console.log("SETTING INTERVAL")
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return <progress id="question-time" max={timeout} value={remainingTime}></progress>
}