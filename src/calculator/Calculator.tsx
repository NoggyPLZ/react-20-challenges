import Layout from "../components/Layout/Layout";
import { useState, useEffect} from "react";

type Operator = '+' | '-' | '/' | '*' | '';

type CalcList = Operator | string;

export default function Calculator(){
    const [number, setNumber] = useState('')
    const [operator, setOperator] = useState<Operator>('');
    const [calcList, setCalcList] = useState<CalcList[]>([])

    const clearValues = () =>{
        setNumber('');
        setOperator('');
        setCalcList([]);
    }

    const handleOperator = (value: Operator) =>{
        if(number.length > 0){
            setCalcList(prev => [...prev, number, value]);
            setNumber('');
            setOperator(value);
        }
    }

    const handleNumberClick = (value: string) =>{
        if(value === 'clear')return clearValues();
        if(value === '.' && number.includes('.'))return;
        setNumber(prev => prev + value);  
    }

    const handleCalculation = () =>{
        const op = calcList[1] as Operator;
        let result;
        if(op === '+'){
            result = Number(calcList[0]) + Number(number);
            setNumber(result.toString());
        }else if(op === '-'){
            result = Number(calcList[0]) - Number(number);
            setNumber(result.toString());
        }else if(op === '/'){
            result = Number(calcList[0]) / Number(number);
            setNumber(result.toString());
        }else if(op === '*'){
            result = Number(calcList[0]) * Number(number);
            setNumber(result.toString());
        }
        setOperator('');
        setCalcList([]);
    }

    useEffect(() =>{
        const handleKeyDown = (e: KeyboardEvent) =>{
            const key = e.key;
            if(!isNaN(Number(key)) || key === "."){
                handleNumberClick(key);
            }else if(['+','-','/','*'].includes(key)){
                handleOperator(key as Operator);
            }else if(key === 'Enter' || key === '='){
                handleCalculation();
            }else if(key === "Backspace"){
                setNumber(prev => prev.slice(0, -1));
            }else if(key.toLowerCase() === 'c'){
                setNumber('');
            }
        }
        console.log(calcList)
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    },[number, operator,calcList])

    return (
        <Layout>
        <div className="grid grid-cols-4 grid-rows-[repeat(6,_1fr)] aspect-[4/6] w-full max-w-sm border-2 border-gray-100 mx-auto rounded-2xl gap-4 p-5">
            <div className="bg-gray-800 grid border-2 border-gray-600 col-span-4 items-center p-2 pr-5 pl-5 rounded-2xl text-right text-5xl"><span className="animate-pulse">
                {calcList[0]}
                {operator}
                {number}
                </span>
            </div>
            <div className="grid grid-cols-4 col-span-4 gap-2">
                <CalcButton value='+' type='operator' clickHandler={handleOperator}>+</CalcButton>
                <CalcButton value='-' type='operator' clickHandler={handleOperator}>-</CalcButton>
                <CalcButton value='/' type='operator' clickHandler={handleOperator}>/</CalcButton>
                <CalcButton value='*' type='operator' clickHandler={handleOperator}>x</CalcButton>
            </div>
            <div className="row-span-4 col-span-3 grid grid-cols-3 gap-2">
                <CalcButton value='7' type='num' clickHandler={handleNumberClick}>7</CalcButton>
                <CalcButton value='8' type='num' clickHandler={handleNumberClick}>8</CalcButton>
                <CalcButton value='9' type='num' clickHandler={handleNumberClick}>9</CalcButton>

                <CalcButton value='4' type='num' clickHandler={handleNumberClick}>4</CalcButton>
                <CalcButton value='5' type='num' clickHandler={handleNumberClick}>5</CalcButton>
                <CalcButton value='6' type='num' clickHandler={handleNumberClick}>6</CalcButton>

                <CalcButton value='1' type='num' clickHandler={handleNumberClick}>1</CalcButton>
                <CalcButton value='2' type='num' clickHandler={handleNumberClick}>2</CalcButton>
                <CalcButton value='3' type='num' clickHandler={handleNumberClick}>3</CalcButton>
                <CalcButton value='0' type='num' clickHandler={handleNumberClick}>0</CalcButton>
                <CalcButton value='.' type='num' clickHandler={handleNumberClick}>.</CalcButton>
                <CalcButton value='clear' type='num' clickHandler={handleNumberClick}>C</CalcButton>
            </div>
            <div className="grid row-span-4 grid-cols-1 gap-2">
                <button onClick={handleCalculation} className="bg-teal-800 text-gray-100 rounded-2xl p-8 text-3xl flex w-full justify-center items-center cursor-pointer hover:shadow-xl hover:outline-1">=</button></div>
        </div>
        </Layout>
    )
}

type CalcButtonProps<T extends string> ={
    value: T;
    type: string;
    children:React.ReactNode;
    clickHandler: (value: T) => void;
}

function CalcButton<T extends string>({value, type, children, clickHandler}: CalcButtonProps<T>){

    return ( 
        <>
            {type === 'num' ?
            <button value={value} onClick={() => clickHandler(value)} className="bg-teal-800 text-gray-100 rounded-2xl p-8 text-3xl flex w-full aspect-square justify-center items-center cursor-pointer hover:shadow-xl hover:outline-1">{children}</button>
            :
            <button value={value} onClick={() => clickHandler(value)} className="bg-blue-600 text-gray-100 rounded-2xl p-8 text-3xl flex w-full aspect-square justify-center items-center cursor-pointer hover:shadow-xl hover:outline-1">{children}</button>
            }
        </>
    )
}