import { useState } from "react"
import Layout from "../components/Layout/Layout";

type GameCell = 'O' | 'X' | '';
type GameWon = {
    gameOver: boolean;
    winner: 'X' | 'O' | 'Tie' | null;
}

export default function TicTacToe(){
    const [gameState, setGameState] = useState<GameCell[][]>([
        ['','',''],
        ['','',''],
        ['','','']
    ])
    const [player, setPlayer] = useState(true);
    const [gameWon, setGameWon] = useState<GameWon>({
        gameOver:false,
        winner: null
    });

    const winCon = (col:number, row:number, board: GameCell[][]) =>{
        const currentPlayer = board[row][col];

        if(currentPlayer === '') return false; //exluding empty squares
        const directions: number[][][] = [
            [[0,-1],[0,1]],
            [[1,0],[-1,0]],
            [[1,1],[-1,-1]],
            [[1,-1],[-1,1]],
        ];
        //looping through the directions, a bit nuts to use BFS for this but it was interesting
        //we loop over the pair of arrays where in directions[0] dir1 and dir2 are left and right for example
        for(const [dir1, dir2] of directions){
            let count = 1
            //we loop over the two indices of each direction, then move in that direction to check if the 
            //current cell is === to the currentPlayer
            for(const [dirR, dirC] of [dir1,dir2]){
                let searchR = dirR + row;
                let searchC = dirC + col;
                //We define bounds to keep our search within the gameboard at least 0 to 2
                //We check here if the board[currentRowSearch][currentColSearch] === currentPlayer, if it's X while X is playing
                while((searchR >= 0 && searchR < 3) &&
                    (searchC >= 0 && searchC < 3) &&
                    board[searchR][searchC] === currentPlayer){
                        count++;
                        searchR += dirR;
                        searchC += dirC;
                }
            }
            //win state
            if(count === 3) return true; 
        }
        //no win found
        return false;

    }

    const clickHandler = (rowIndex:number, colIndex:number) =>{
        const move = player ? 'X' : 'O';

        if(gameState[rowIndex][colIndex] !== '') return;

        const updated = [...gameState];
        const newRow = [...updated[rowIndex]];
        newRow[colIndex] = move;
        updated[rowIndex] = newRow;

        
        const isWinner = winCon(colIndex, rowIndex, updated)

        if((updated.every(row => row.every(cell => cell !== '')))&& !isWinner){
            setGameWon(prev => ({
                ...prev,
                gameOver:true,
                winner: 'Tie',
            }))
        }

        if(isWinner){ 
            setGameWon(prev => ({
                ...prev,
                gameOver: true,
                winner: move
            }));
        }else{
            setGameState(updated);
            setPlayer(prev => !prev);
        }  
    }

    const reset = () =>{
        setPlayer(true);
        setGameWon(prev => ({
            ...prev,
            gameOver:false,
            winner: null
        }));
        setGameState([
            ['','',''],
            ['','',''],
            ['','','']
        ]);
    }

    return (
       <Layout>
            {gameWon.gameOver ? 
            <div className="flex flex-col w-4/12 mx-auto gap-10 justify-center">
                <p className="text-center text-5xl font-black">{gameWon.winner !== 'Tie' ? `${gameWon.winner} is the Winner!`: "It's a Tie!"}</p>
                <button 
                className="bg-gray-100 text-gray-800 rounded-2xl hover:bg-gray-400 font-bold p-5"
                onClick={reset}
                >Try Again?</button>
            </div>
            :
            <div className="grid grid-rows-3 mx-auto gap-3 rounded-2xl border-2 border-gray-100 justify-items-stretch p-4 md:p-8 w-full max-w-[600px]">
                {gameState.map((row,rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-3 gap-3">
                    {row.map((cell, colIndex) => (
                        <button 
                        disabled={cell !== ''}
                        key={colIndex} 
                        value={cell} 
                        onClick={() => clickHandler(rowIndex, colIndex)} 
                        className={"disabled:cursor-not-allowed cursor-pointer p-10 md:p-10 border-2 border-gray-100 rounded-2xl text-center place-self-stretch text-8xl flex items-center justify-center aspect-square"}>
                            <p className="text-center">{cell}</p>
                    </button>
                    ))}
                    </div>
                ))}
               
            </div>
             }
        </Layout>
    )
}