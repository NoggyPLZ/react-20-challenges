import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";

export default function SpeedTyping(){
    const [timer, setTimer] = useState(0);
    const [sentence, setSentence] = useState('');
    const [errors, setErrors] = useState(0);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [start, setStart] = useState(false);

    const SENTENCES = [
        'The Great Fire of London destroyed most of the city in 1666.',
        'Julius Caesar was assassinated on the Ides of March in 44 BCE.',
        'The Berlin Wall fell in 1989, symbolizing the end of the Cold War.',
        'Neil Armstrong walked on the Moon in July 1969.',
        'The Titanic sank on its maiden voyage in April 1912.',
        'The Declaration of Independence was signed in 1776.',
        'Mahatma Gandhi led peaceful protests against British rule in India.',
        'The printing press was invented by Johannes Gutenberg around 1440.',
        'The Black Death killed millions in Europe during the 14th century.',
        'The Wright brothers achieved the first powered flight in 1903.',
    ];

    const randomSentence = () =>{
        return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    }

    const playGame = () =>{
        setSentence(randomSentence());
        setPlayerIndex(0);
        setTimer(Date.now());
        setStart(true);
        setErrors(0);
    }


    useEffect(() =>{
        playGame();
    },[])

    useEffect(() =>{
        const handleKeyDown = (e: KeyboardEvent) =>{
            if(!start) return;
            
            let key = e.key;

            if(key === sentence[playerIndex]){
                setPlayerIndex(prev => prev + 1);
            }else if (key !== sentence[playerIndex] && !e.shiftKey && !e.ctrlKey){
                setErrors(prev => prev + 1);
            }

            if(playerIndex + 1 === sentence.length && key === sentence[playerIndex]){
                setStart(false);
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[sentence, playerIndex, start])

    return (
        <Layout>
            {start ? 
            <div className="max-w-[600pwx] mx-auto text-center">
            <p className="text-4xl">{sentence.split('').map((letter, i) =>(
                <span 
                key={i} 
                className={`font-semibold ${playerIndex === i ? 'text-sky-500 bg-gray-100 rounded-sm' : 'text-gray-100'}`}>{letter}</span>
            ))}</p>
            </div>
            :
            <div className="w-[600px] flex flex-col justify-center place-items-center mx-auto gap-8">
                <p className="text-3xl font-bold">Time: {((Date.now() - timer)/1000).toFixed(2)}s</p>
                <p className="text-3xl font-bold">Accuracy: {(100-(errors/sentence.split('').length)*100).toFixed(1)}%</p>
                <p className="text-3xl font-bold">Words Per Min: {((sentence.split('').length/5)/( ((Date.now() - timer)/1000)/60 )).toFixed(1)}</p>
                <p className="text-3xl font-bold">Characters Per Min: {((sentence.split('').length)/( ((Date.now() - timer)/1000)/60 )).toFixed(1)}</p>
                <button onClick={playGame} className="bg-gray-100 text-gray-800 pl-15 pr-15 p-5 font-bold rounded-2xl hover:bg-gray-300 cursor-pointer">Play Again</button>
            </div>
        }
        </Layout>
    )
}