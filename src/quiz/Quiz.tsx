import { useEffect, useState } from "react"
import { quizSelect } from "./quizObj";
import type { Quiz } from "./quizObj";
import Layout from "../components/Layout/Layout";

export default function Quiz(){
    const [quiz, setQuiz] = useState<Quiz>();
    const [qNum, setQNum] = useState(0)
    const [correct, setCorrect] = useState(0);

    useEffect(()=>{
        createQuiz();
    },[qNum])

    const createQuiz = () =>{
        if(qNum <= quizSelect.length){
            setQuiz(quizSelect[qNum])
        }
    }

    const answerHandler = (e:any) =>{
        if(quiz?.answer.answers[quiz.answer.correctIndex] === e.currentTarget.value) setCorrect(prev => prev + 1);
        setQNum(prev => prev + 1);
        createQuiz();
    }

    const reset = () =>{
        setQNum(0);
        setCorrect(0);
    }

    return (
        <Layout>
        {qNum < quizSelect.length ? 
            <div className="flex flex-col md:w-6/12 mx-auto">
                <div className="italic text-5xl text-center p-10">{quiz?.question}</div>
                <div className="grid md:grid-cols-2 gap-8">
                {quiz?.answer.answers.map((ans, i) =>(
                    <button className="p-5 rounded-2xl bg-gray-100 text-2xl text-gray-800 hover:bg-gray-400 cursor-pointer" onClick={answerHandler} value={ans} key={i}>{ans}</button>
                ))}
                </div>
            </div>
            :
            <div className="flex flex-col md:w-4/12 mx-auto">
                <p className="p-10 text-4xl text-center"><span className="font-black uppercase">percentage correct:</span>{`${Math.floor((correct / quizSelect.length)*100)}%`}</p>
                <button className="p-5 rounded-2xl bg-gray-100 text-2xl text-gray-800" onClick={reset}>Try Again?</button>
            </div>
            }
        </Layout>
    )
}