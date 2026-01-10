import Layout from "../components/Layout/Layout";
import { useState } from "react";

export default function Split(){
    const [numberCols, setNumberCols] = useState(1);
    


    return ( 
        <Layout>
            <div className="flex place-items-center justify-center h-dvh items-stretch text-gray-100 font-bold text-3xl">
                <button 
                onClick={() => setNumberCols(prev => prev + 1)} 
                className="w-full bg-gray-500 cursor-pointer"
                >+</button>
                {Array(numberCols).fill('+').map((__, i) => {
                    const randomColor = `hsla(${Math.random() * 360}, 70%, 80%)`;
                    return (
                    <div key={i} className="flex flex-col w-full">
                        <ColButton direction='column' color={randomColor} />
                    </div>
                    )
                })};
                
            </div>
        </Layout>
    )
}

type SplitProps = {
    direction: 'row' | 'column';
    color: string;
}

function ColButton({direction, color}: SplitProps){
    const [children, setChildren] = useState<React.ReactElement[]>([]);
    
    const handleClick = () =>{
        const randomColor = `hsla(${Math.random() * 360}, 70%, 80%)`;
        const nextDir = direction === 'column' ? 'row' : 'column'
        setChildren([...children, <ColButton key={crypto.randomUUID()} direction={nextDir} color={randomColor} />])
    }

    return(
    <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} w-full h-full`}>
        <button onClick={handleClick} style={{ backgroundColor: color }} className="w-full cursor-pointer items-stretch h-full">+</button>
        {children}
    </div>
    )
}