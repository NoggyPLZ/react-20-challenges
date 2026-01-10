import Layout from "../components/Layout/Layout";
import { useState,useEffect } from "react";

export default function StopWatch(){
    const [run, setRun] = useState(false);
    const [timer, setTimer] = useState(0);
    

    useEffect(() =>{
        if(!run) return;
        const intervalId = setInterval(() => {
                setTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(intervalId)
    },[run])

    const reset = () =>{
        setTimer(0);
        setRun(prev => !prev);
    }

    return(
        <Layout>
            <div className="flex flex-col basis w-3/12 ml-auto mr-auto border-2 gap-8 p-10 rounded-2xl">
                <div className="border-1 border-gray-200 p-10 rounded-2xl w-6/12 ml-auto mr-auto">
                    {timer}
                </div>
                <div className="flex gap-5 justify-center">
                    <button onClick={() => setRun(prev => !prev)} className={`bg-gray-100 font-black text-2xl pl-10 pr-10 p-5 border-2 border-transparent hover:border-teal-400 hover:border-2 rounded-2xl cursor-pointer ${run ? `bg-red-500 text-gray-100`:`bg-green-600 text-gray-100`}`} >{run ? 'Stop' : 'Start'}</button>
                    <button onClick={reset} className="p-5 text-2xl bg-gray-200 text-gray-800 font-black rounded-2xl cursor-pointer">Reset</button>
                </div>
            </div>
        </Layout>
    )
}