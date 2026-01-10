import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout";


type GameBoard = string[][];
type Select = {row: number; col: number;}

export default function Memory(){
    const [board, setBoard] = useState<GameBoard>([
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
    ]);
    const [solvedBoard, setSolvedBoard] = useState<GameBoard>([
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
    ]);
    const [selectedTile, setSelectedTile] = useState<Select[]>([])
    const [score, setScore] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const emojis = ['🍎','🎲','💧','🐈','🌞','🦈','🔥','💖','🍎','🎲','💧','🐈','🌞','🦈','🔥','💖']

    const randomBoard = () =>{
        const emojiBoard: GameBoard = Array.from({length:4}, () => Array.from({length:4}, () => '')
        );  
        
        let count = 0;
        
        while(emojiBoard.some(row => row.includes('')) && count < 16){
            const randomRow = Math.floor(Math.random() * emojiBoard.length);
            const randomCol = Math.floor(Math.random() * emojiBoard[0].length);
            if(emojiBoard[randomRow][randomCol] === ''){
                emojiBoard[randomRow][randomCol] = emojis[count]
                count++;
            }
        }
        setSolvedBoard(emojiBoard);
    };

    const paircCheck = (tiles:Select[]) =>{
        setIsLocked(true);
        const [first, second] = tiles;
        const firstVal = solvedBoard[first.row][first.col];
        const secondVal = solvedBoard[second.row][second.col];
        if(firstVal !== secondVal){
            setTimeout(() =>{
                setBoard((prev) =>{
                const tempBoard = [...prev.map(row => [...row])];
                tempBoard[first.row][first.col] = '';
                tempBoard[second.row][second.col] = '';
                return tempBoard;
            });
            setSelectedTile([]);
            setIsLocked(false);
            },500)
            
        }else{
            setScore(prev => prev + 1);
            setSelectedTile([]);
            setIsLocked(false);
        }
    };

    const clickHandler = (rowIndex: number, colIndex: number) =>{
        if(isLocked) return;
        if(board[rowIndex][colIndex] !== '') return;
        
        const cellValue = solvedBoard[rowIndex][colIndex];
        
        setBoard((prev) =>{
            const tempBoard = [...prev.map(row => [...row])];
            tempBoard[rowIndex][colIndex] = cellValue;
            return tempBoard;
        });

        const newSelect = [...selectedTile, {row: rowIndex, col: colIndex}];
        setSelectedTile(newSelect)

        if(newSelect.length === 2){
            paircCheck(newSelect);
        }
    };

    const reset = () =>{
        setBoard((prev) =>{
            const tempBoard: GameBoard = prev.map(row => row.map(() => ''));
            return tempBoard;
        })
        setSelectedTile([]);
        setScore(0);
        randomBoard();
    };


    useEffect(() =>{
        randomBoard();
    },[]);

    return(
        <Layout>
            {score === 8 ?
            <div className="flex flex-col justify-center place-items-center text-center gap-12">
                <p className="text-5xl font-black uppercase">You Win!</p>
                <button onClick={reset} className="font-bold p-4 pl-10 pr-10 rounded-2xl bg-gray-100 text-md text-gray-800 hover:bg-gray-400 cursor-pointer">Play Again?</button>
            </div>
            : 
            <>
            <div className="text-6xl border-2 border-gray-100 rounded-2xl p-8 text-center mx-auto">{`Score: ${score}`}</div>
            <div className="grid grid-rows-4 gap-4 mx-auto w-full max-w-[700px] border-2 border-gray-100 p-4 rounded-2xl">
                {board.map((row, i) =>(
                    <div key={i} className="grid gap-4 grid-cols-4">
                        {row.map((cell, j)=>(
                            <button key={j} value={cell} onClick={() => clickHandler(i,j)} className="border-2 border-gray-100 cursor-pointer rounded-2xl text-6xl aspect-square">
                                <p>{cell}</p>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            </>
            }
           
        </Layout>
    )
}