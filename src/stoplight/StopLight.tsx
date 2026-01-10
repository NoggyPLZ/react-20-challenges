import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";


export default function StopLight(){

    return(
        <Layout>
            <div className="flex flex-row justify-center">
            <TrafficLights initialColor="red" />
            <TrafficLights initialColor="yellow" />
            <TrafficLights initialColor="green" />
            </div>
        </Layout>
        )
}

const TrafficLights = ({initialColor}:{initialColor: string}) =>{
    const [lights, setLights] = useState(initialColor)

    useEffect(() =>{
        const timer = setTimeout(() =>{
            if(lights === 'green') setLights('yellow');
            else if(lights === 'yellow') setLights('red');
            else if(lights === 'red') setLights('green');
        }, lights === 'yellow' ? 2000 : 5000);
        
        return (() => clearTimeout(timer))
    },[lights])

    return(
            <div className="flex-col content-center gap-8 flex">
                <div className={`w-50 h-50 rounded-full border-2 border-gray-100 ${lights === 'green' && 'bg-green-600'}`}></div>
                <div className={`w-50 h-50 rounded-full border-2 border-gray-100 ${lights === 'yellow' && 'bg-yellow-600'}`}></div>
                <div className={`w-50 h-50 rounded-full border-2 border-gray-100 ${lights === 'red' && 'bg-red-600'}`}></div>
            </div>
    )
}