import Layout from "../components/Layout/Layout";
import { useState } from "react";

type PoleArr = number[]

export default function Hanoi(){
    const [poleArr, setPoleArr] = useState<PoleArr[]>([
        [1,2,3],
        [],
        [],
    ]);
    const [select, setSelect] = useState<number | null>(null);

    const disks = (disks: number[]) =>{
        return [...disks].map((disk) =>{
            const diskSize = {
                1:'w-[150px]',
                2:'w-[250px]',
                3:'w-[350px]',
            }
            return (
            <div className={`border-2 border-gray-100 h-[100px] ${diskSize[disk as 1 | 2 | 3]}`}></div>
            )
        })
    }

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) =>{
        const value = Number(e.currentTarget.value);
        if(select === null){
            setSelect(value);
            return;
        }

        const from = poleArr[select][0];
        const to = poleArr[value][0];

        const isLegalMove = to === undefined || from < to
        if(isLegalMove){
            setPoleArr(prev =>{
                const updated = prev.map(pole => [...pole])
                const diskToMove = updated[select].shift()
                if(diskToMove !== undefined){
                    updated[value].unshift(diskToMove);
                }
                return updated;
            })
        }
        setSelect(null);
    }

    return (
        <Layout>
            <div className="flex flex-row mx-auto gap-8">
                {Array.from({length:3}).map((__, i) =>(
                    <div key={i} className="flex flex-col mx-auto h-[600px] w-[400px] justify-center place-items-center">
                        <button onClick={clickHandler} value={i} className={`cursor-pointer w-[20px] h-full ${select === i ? 'bg-blue-400' : 'bg-gray-100'}`}></button>
                        {disks(poleArr[i])}
                    </div>
                ))}
            </div>
        </Layout>
    )
}