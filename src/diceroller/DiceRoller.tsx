import { useState } from "react";
import Layout from "../components/Layout/Layout";

type DieFace = 1|2|3|4|5|6;

export default function DiceRoller(){
    const [diceRandom, setDiceRandom] = useState(0);

    const diePositions: Record<DieFace, number[]> = {
        1:[4],
        2:[0,8],
        3:[0,4,8],
        4:[0,2,6,8],
        5:[0,2,4,6,8],
        6:[0,1,2,6,7,8]
    }

    const clickHandler = () =>{
        const random = Math.floor(Math.random()*6)+1;
        setDiceRandom(random);
    }

    const diceRender = () =>{
        if(diceRandom){
            return (
                <div className="">
                    <p className="text-center p-8 text-2xl"><strong>You rolled: {diceRandom}</strong></p>
                    <div className="border-2 border-gray-100 rounded-2xl w-50 h-50 ml-auto mr-auto gap-8 grid grid-rows-3 grid-cols-3 p-5 ">
                        {Array.from({length:9}, () =>0).map((__, i) => (
                            diePositions[diceRandom as DieFace].includes(i) ?
                            <p className="border-1 border-gray-100 text-center rounded-full bg-gray-100">0</p>:
                            <p className="text-center"></p>
                        ))}
                    </div>
                </div>
            )
        }
        return (
            <div className="">
                <div className="border-2 border-gray-100 rounded-2xl w-50 h-50 ml-auto mr-auto gap-8 grid grid-rows-3 grid-cols-3 p-5 "></div>
            </div>
        )
    }

    return (
        <Layout>
            <div className="p-10 flex flex-col gap-8 w-4/12 ml-auto mr-auto">
                {diceRender()}
                <button onClick={clickHandler} className="bg-gray-100 pl-10 pr-10 p-5 text-gray-900 hover:bg-gray-400 rounded-2xl cursor-pointer">Roll the Dice!</button>
            </div>
        </Layout>
    )
}