import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";

type Alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' |
                'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' |
                'u' | 'v' | 'w' | 'x' | 'y' | 'z';

type LetterAmount = {
    [key in Alphabet]: number;
}

export default function Histogram(){
    const [letterAmount, setLetterAmount] = useState<LetterAmount>({
        a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0,
        h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0,
        o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0,
        v: 0, w: 0, x: 0, y: 0, z: 0
    })
    const [input, setInput] = useState('');
    const [lastWord, setLastWord] = useState('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.currentTarget.value;
        if(/^[\p{L}\s.,!?'"():;\-]*$/u.test(value)){
            setInput(value);
        }
    }

    const updateHisto = () =>{
        const updated = Object.fromEntries(Object.keys(letterAmount).map((letter) => [letter,0])
        ) as LetterAmount;
        const chars = input.toLowerCase().split('');
        for(let char of chars){
            if(/^[a-zA-Z]*$/.test(char)){
                updated[char as Alphabet]++
            }
        }
        setLetterAmount(updated);
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLastWord(input);
        updateHisto();
        setInput('');
    }

    useEffect(()=>{
        console.log(letterAmount)
    },[letterAmount])

    return (
        <Layout>
            <div>
                <form onSubmit={submitHandler} className="flex gap-8 justify-center place-items-center">
                    <input onChange={changeHandler} className="border-b-gray-100 border-b-2 focus:outline-0 text-3xl w-[500px]" value={input} placeholder="Type a word or sentence..." />
                    <button type="submit" className="p-4 pl-10 pr-10 rounded-2xl bg-gray-100 text-md text-gray-800 hover:bg-gray-400 cursor-pointer">Submit</button>
                    
                </form>
            </div>
            <div className="border-2 border-gray-100 p-5 rounded-2xl mx-auto">
                <p className="text-center font-bold text-2xl">{lastWord}</p>
                <div className="flex-row flex gap-5 justify-center place-items-end h-[200px]">
                    {Object.entries(letterAmount).map(([letter, count]) =>(
                        <div 
                        className="flex md:flex-col w-full flex-row md:h-full place-items-center justify-end gap-1 uppercase font-bold text-2xl" 
                        key={letter}>
                            {count > 0 ? 
                            <div className="h-full flex place-items-end">
                                <div style={{height: `${Math.floor((count / Math.max(...Object.values(letterAmount))) * 100)}%`}} className="bg-green-600 rounded-sm pl-3 pr-3">
                                {count}
                                </div>
                            </div>
                            :
                            <div className="rounded-sm pl-3 pr-3 h-[1px]"></div>
                            }
                            <p>{letter}</p></div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}