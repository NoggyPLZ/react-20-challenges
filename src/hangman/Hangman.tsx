import Layout from "../components/Layout/Layout";
import { useState, useEffect, useRef } from "react";

export default function Hangman(){
    const [word, setWord] = useState<string[]>([]);
    const [lives, setLives] = useState(0);
    const [guess, setGuess] = useState('');
    const [correct, setCorrect] = useState<boolean[]>([])
    const inputRef = useRef<HTMLInputElement>(null);

    const WORD_BANK = [ 
        "apple",       // 5
        "keyboard",    // 8
        "jungle",      // 6
        "astronaut",   // 9
        "puzzle",      // 6
        "volcano",     // 7
        "backpack",    // 8
        "island",      // 6
        "giraffe",     // 7
        "moonlight"    // 9
    ];

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(/^[a-zA-Z]*$/.test(e.target.value) && e.target.value.length < 2){
            setGuess(e.target.value);
        }
    }
    
    const letterCheck = (wordArr: string[]) =>{
        let live = false;
        for(let i = 0; i< wordArr.length; i++){
            if(guess === wordArr[i]){
                console.log(i)
                if(correct[i] === false){
                    setCorrect(prev => {
                        const updated = [...prev];
                        updated[i] = true;
                        return updated;
                    });
                    console.log(i)
                }
                live = true;
            }
        }
       return live;
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const wordArr = word;
        if(!letterCheck(wordArr)){
            setLives(prev => prev - 1)
        }
        setGuess('')
        inputRef.current?.focus();
    }

    const randomWord = () =>{
        return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)].split('')
    }

    const reset = () =>{
        let gameWord = randomWord();
        let attempts = 0;
        while(word === gameWord && attempts < 10){
            gameWord = randomWord();
            attempts++;
        }
        setWord(gameWord);
        setCorrect(Array(gameWord.length).fill(false));
        setLives(gameWord.length);
        inputRef.current?.focus();
    }

    useEffect(()=>{
        reset();
    },[])

    return (
        <Layout>
            {lives <= 0 ? 
            <div className="flex-col flex gap-8 max-w-[400] mx-auto text-center">
                <p className="text-5xl font-black uppercase">You lost! The Word was {word}</p>
                <button className="font-bold p-4 pl-10 pr-10 rounded-2xl bg-gray-100 text-md text-gray-800 hover:bg-gray-400 cursor-pointer" onClick={reset}>Try again?</button>
            </div> 
            :<>
            {correct.every((i) => i) ? 
    
                <div className="flex-col flex gap-8 max-w-[400] mx-auto text-center">
                    <p className="text-5xl font-black uppercase">You Won! The Word was {word}</p>
                    <button className="font-bold p-4 pl-10 pr-10 rounded-2xl bg-gray-100 text-md text-gray-800 hover:bg-gray-400 cursor-pointer" onClick={reset}>Try again?</button>
                </div> 
            
            : <>
            <div className="text-center text-4xl font-black">
                Lives: <span className={lives !== 0 ? 'text-green-500' : 'text-red-700'}>{lives}</span>
            </div>
            <div className="flex flex-row gap-8 justify-center">
                
                {word.map((letter, index)=>(
                    <div className={`bg-gray-500 rounded-2xl aspect-square size-30 text-center p-10 font-black text-3xl ${correct[index] && `bg-green-600`}`} key={index}>{correct[index] && letter.toUpperCase()}</div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit} className="flex-row flex justify-center gap-8">
                    <input 
                    placeholder="Enter a letter to guess..." 
                    autoFocus key={`guessfield`} 
                    ref={inputRef} type="text" 
                    onChange={handleChange} 
                    className="border-b-gray-100 border-b-2 focus:outline-0 text-3xl" 
                    value={guess} 
                    required  />
                    <button type="submit" className="font-bold p-4 pl-10 pr-10 rounded-2xl bg-green-600 text-md text-gray-100 hover:bg-green-700 border-1 border-transparent hover:outline-1 hover:outline-green-300 cursor-pointer">Guess</button>
                </form>
            </div>
            </>
            }
            </>
            }
        </Layout>
    )
}