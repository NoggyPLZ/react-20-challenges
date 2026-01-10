import Layout from "../components/Layout/Layout";
import { useState, useEffect, useRef } from "react";

type Colors = 'blue' | 'green' | 'yellow' | 'red';


export default function Simon(){
    const [playerTurn, setPlayerTurn] = useState(false);
    const [level, setLevel] = useState(1);
    const [pattern, setPattern] = useState<Colors[]>([]);
    const [currentColor, setCurrentColor] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const clickIndex = useRef<number>(0);

    const randomChoice = () =>{
        const choices: Colors[] = ['blue', 'green', 'yellow', 'red']
        let selection: Colors = choices[Math.floor(Math.random()*4)];
        setPattern(prev => [...prev, selection]);
    }

    const playerClick = (e:React.MouseEvent<HTMLButtonElement>) =>{
        if(!playerTurn) return;

        let value = e.currentTarget.value as Colors;
        if(value === pattern[clickIndex.current]){
            clickIndex.current += 1;
        }else{
            setGameOver(true);
        }
        if(clickIndex.current === pattern.length){
            setPlayerTurn(false);
            clickIndex.current = 0;
            setLevel(prev => prev + 1);
            randomChoice();
        }
    }

    const playGame = () =>{
        randomChoice();
    }

    const playSeq = (num: number = 0) =>{
        if(pattern.length === 0) return;

        if(num >= pattern.length && num > 0) {
            setPlayerTurn(true);
            return
        };
        setCurrentColor(pattern[num]);
        setTimeout(() =>{
            setCurrentColor('');
                setTimeout(() =>{
                    playSeq(num + 1);
                },500)
        },1000)
    }

    const reset = () =>{
        setPattern([]);
        setPlayerTurn(false);
        setLevel(1);
        clickIndex.current = 0;
        setGameOver(false);
    }

    useEffect(() =>{
        setTimeout(() => playSeq(),500)
    },[pattern])

    useEffect(() =>{
        console.log(playerTurn)
    },[playerTurn])

    return(
        <Layout>
            {gameOver ? 
            <div className="flex flex-col justify-center place-items-center text-center mx-auto gap-10 max-w[500px]">
                <p className="text-5xl font-bold">Game Over</p>
                <button onClick={reset} className="bg-gray-100 text-gray-800 rounded-2xl p-5 pl-10 pr-10 font-bold cursor-pointer">Play Again</button>
            </div>
            :
            <>  <div className="text-3xl font-bold text-center">Level: {level}</div>            
                <div className="grid grid-cols-2 max-w-[600px] mx-auto">
                    <button 
                    onClick={playerClick}
                    value="blue"
                    className={` bg-blue-500 opacity-50  p-35 rounded-tl-full ${currentColor === 'blue' && 'opacity-100'} ${playerTurn ? 'hover:opacity-100 cursor-pointer': 'cursor-default'}`}></button>
                    <button 
                    onClick={playerClick}
                    value="green"
                    className={` bg-green-500 opacity-50  p-35 rounded-tr-full ${currentColor === 'green' && 'opacity-100'} ${playerTurn ? 'hover:opacity-100 cursor-pointer': 'cursor-default'}`}></button>
                    <button 
                    onClick={playerClick}
                    value="yellow"
                    className={` bg-yellow-500 opacity-50  p-35 rounded-bl-full ${currentColor === 'yellow' && 'opacity-100'} ${playerTurn ? 'hover:opacity-100 cursor-pointer': 'cursor-default'}`}></button>
                    <button 
                    onClick={playerClick}
                    value="red"
                    className={` bg-red-500 opacity-50  p-35 rounded-br-full ${currentColor === 'red' && 'opacity-100'} ${playerTurn ? 'hover:opacity-100 cursor-pointer': 'cursor-default'}`}></button>
                    
                </div>
                {pattern.length === 0 && <button onClick={playGame} className="bg-gray-100 text-gray-800 rounded-2xl p-5 pl-15 pr-15 font-bold cursor-pointer hover:outline-2 hover:outline-green-500 mx-auto">Start</button>}
                {playerTurn && <p className="text-4xl text-center">Your turn</p>}
            </>
            }
        </Layout>
    )
}