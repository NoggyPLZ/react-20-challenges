import { useState } from "react"
import Layout from "../components/Layout/Layout";


export default function RockPaperScissors(){

    const gameChoices: string[] = ['rock','paper','scissors'];
    const [results, setResults] = useState<{
        player: string;
        ai: string;
        winner: string;
    }|null>(null);
    const [gameOver, setGameOver] = useState(false);


    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) =>{
        const playerPick = e.currentTarget.value;

        const choices: string[] = ['rock', 'paper', 'scissors'];
        const aiPick: string = choices[Math.floor(Math.random() * choices.length)];

        let winner = ''
        if (playerPick === aiPick) {
            winner = 'Tie';
        } else if (
            (playerPick === 'rock' && aiPick === 'scissors') ||
            (playerPick === 'paper' && aiPick === 'rock') ||
            (playerPick === 'scissors' && aiPick === 'paper')
        ) {
            winner = 'Player';
        } else {
            winner = 'AI';
        }
        setResults({player:playerPick, ai:aiPick, winner})
        setGameOver(prev => !prev);
    }

    const showWinner = () =>{
        if(results){
            return (
                <div>
                <p><strong>Player choice:</strong> {results.player}</p>
                <p><strong>AI choice:</strong> {results.ai}</p>
                <p><strong>the winnner is:</strong> {results.winner}</p>
                <button className="bg-gray-100 pl-10 pr-10 p-5 text-gray-900 hover:bg-gray-400 rounded-2xl cursor-pointer" onClick={() => setGameOver(prev => !prev)}>Play Again!</button>
                </div>
            )
        }
    }

    return (
        <Layout>
            <div className="text-center p-10">
                {gameOver ? showWinner() 
                    : 
                    <section className='flex flex-row gap-10 h-7/12 justify-center'>
                        {gameChoices.map((choice, i) =>(
                            <button key={i} onClick={onClickHandler} value={choice} className="border-grey-100 border-2 rounded-2xl w-2/12 font-bold hover:bg-blue-800 cursor-pointer pt-50 pb-50">{choice}</button>
                        ))}  
                    </section> 
                }
            </div>
            
        </Layout>
    )
}