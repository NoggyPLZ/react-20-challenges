import { useState, useEffect, useRef } from "react"
import Layout from "../components/Layout/Layout";

type GameBoard = string[][];

export default function WhackAMole(){
    //Notes we can set an interval to decrease the useEffect interval delay making the game harder as time passes
    //Also, can make a state for Lives and clicking on '' reduces lives -1 when lives == 0 game over with game over screen
    const [board, setBoard] = useState<GameBoard>([
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
    ]);
    const [score, setScore] = useState(0);
    const boardRef = useRef(board);

    const mole: string = "🐭";

    const randomMole = () =>{
        const emptyBoard = boardRef.current.map(row => row.map(() => ''));
        const randomRow = Math.floor(Math.random() * boardRef.current.length);
        const randomCol = Math.floor(Math.random() * boardRef.current[0].length);
        emptyBoard[randomRow][randomCol] = mole;
        setBoard(emptyBoard);
    }

    const toggleCell = (row: number, col: number, value: string) =>{
        setBoard((prev) =>{
            const newBoard = [...prev.map(row => [...row])]
            newBoard[row][col] = value;
            return newBoard;
        })
    }

    const clickHandler = (rowIndex: number, colIndex: number) =>{
        if(board[rowIndex][colIndex] !== mole) return;
        setScore(prev => prev + 1);
        toggleCell(rowIndex, colIndex, '');
    }

    useEffect(() =>{
        boardRef.current = board;
    },[board])

    useEffect(()=> {
        const timer = setInterval(randomMole,1000)
        return () => clearInterval(timer)
    },[])

    return (
        <Layout>
            <div className="text-6xl border-2 border-gray-100 rounded-2xl p-8 text-center mx-auto">{`Score: ${score}`}</div>
            <div className="grid grid-rows-4 gap-4 mx-auto w-full max-w-[700px] border-2 border-gray-100 p-4 rounded-2xl">
                {board.map((row, rowIndex) =>(
                    <div key={rowIndex} className="grid gap-4 grid-cols-4">
                    {row.map((cell, colIndex) =>(
                        <button onClick={() => clickHandler(rowIndex, colIndex)} key={colIndex} className="border-2 border-gray-100 cursor-pointer rounded-2xl text-6xl aspect-square">
                            <p className="animate-bounce">{cell}</p>
                        </button>
                    ))}
                    </div>
                ))}
            </div>
        </Layout>
    )
}