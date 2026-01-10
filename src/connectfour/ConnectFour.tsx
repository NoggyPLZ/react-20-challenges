import Layout from "../components/Layout/Layout";
import { useState } from "react";

type GameCell = 'black' | 'red' | '';


type GameBoard = GameCell[]

type GameState = {
    gameOver: boolean;
    winner: GameCell | 'Tie' | null;
}

export default function ConnectFour(){
    const [board, setBoard] = useState<GameBoard[]>([
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
    ]);
    const [player, setPlayer] = useState<boolean>(true);
    const [gameState, setGameState] = useState<GameState>({
        gameOver: false,
        winner: null,
    })

    const rowCheck = (col:number): number =>{
        let row = 5;
        for(let i = row; i >= 0; i--){
            if(board[i][col] === ''){
                row = i;
                break;
            }
        }
        return row;
    }

    const winCon = (row: number, col: number, newBoard: GameBoard[]) =>{
        
        const currentPlayer = newBoard[row][col];

        const directions: number[][][] =[
            [[0,-1],[0,1]], // left right
            [[1,0],[-1,0]], // down up
            [[1,1],[-1,-1]], // down-right up-left
            [[1,-1],[-1,1]], //down-left up-right
        ];
        for(const [dir1, dir2] of directions){
            let count=1;
            for(const [dirR, dirC] of [dir1, dir2]){
                let searchR = dirR + row;
                let searchC = dirC + col;
                while((searchR >= 0 && searchR <= 5) && (searchC >= 0 && searchC <= 6) && newBoard[searchR][searchC] === currentPlayer){
                    count++;
                    searchR += dirR;
                    searchC += dirC;
                }
            }
            if(count === 4) return true;
        }
        return false;
    }

    const clickHandler = (rowIndex: number, colIndex: number) =>{
        if(gameState.gameOver) return;
        const move = player ? 'red' : 'black';

        if(board[rowIndex][colIndex] !== '') return;

        const updated = [...board].map(row => row.map(cell => cell));
        const newRow: number = rowCheck(colIndex);
        updated[newRow][colIndex] = move;

        const isWinner = winCon(newRow, colIndex, updated);
        console.log('winner? ',isWinner)
        if((updated.every(row => row.every(cell => cell !== ''))) && !isWinner){
            
            setGameState(prev =>({
                ...prev,
                gameOver:true,
                winner:'Tie'
            }));
        }

        if(isWinner){
            setBoard(updated);
            setGameState(prev =>({
                ...prev,
                gameOver:true,
                winner:move,
            }));
        }else{
            setPlayer(prev => !prev);
            setBoard(updated);
        }
        
    }

    const reset = () =>{
        setGameState(prev =>({
            ...prev,
            gameOver:false,
            winner:null
        }));
        setBoard([
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ]);
    }


    return (
        <Layout>
            <p>Connect Four</p>
            {gameState.gameOver ? 
            <div className="flex flex-col text-center w-[600px] mx-auto gap-8 place-items-center justify-center">
                <p className="uppercase text-4xl font-bold">{gameState.winner} Wins!</p>
                <button onClick={reset} className="bg-gray-100 rounded-2xl pl-15 pr-15  p-5 text-gray-800 font-bold cursor-pointer hover:bg-gray-300">Play Again</button>
            </div>
             :
            <div className="grid grid-rows-6 w-[600px] mx-auto ">
                {board.map((row, rowIndex) =>(
                    <div key={rowIndex} className="grid grid-cols-7 ">
                        {row.map((cell, colIndex) =>(
                            <button onClick={() => clickHandler(rowIndex, colIndex)} key={colIndex} className={`border-2 border-gray-100 aspect-square cursor-pointer `}>
                                {cell === 'red' && <div className="w-full aspect-square rounded-full bg-red-600"></div>}
                                {cell === 'black' && <div className="w-full rounded-full aspect-square bg-black"></div>}
                                
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            }
        </Layout>
    )
}