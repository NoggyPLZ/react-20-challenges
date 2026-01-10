import { useState } from "react"
import Layout from "../components/Layout/Layout";

type Gradient = {
    color1: string;
    color2:string;
    direction: string;
}

export default function Gradients(){
    const [gradient, setGradient] = useState<Gradient>({
        color1: '#000000',
        color2: '#FFFFFF',
        direction:'to right',
    });

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {id, value} = e.currentTarget;
        setGradient(prev => ({
            ...prev,
            [id]: value}))
    }

    return(
        <Layout>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="p-8 flex-col flex md:flex-grow-1 gap-2 bg-gray-400 rounded-2xl text-gray-800">
                <label htmlFor="color1" className="font-bold uppercase pt-5">Color 1</label>
                <input onChange={changeHandler} value={gradient.color1} id="color1" className="border-2 border-gray-500 p-2 rounded-2xl" />
                <label htmlFor="color2" className="font-bold uppercase pt-5">Color 2</label>
                <input onChange={changeHandler} value={gradient.color2} id="color2" className="border-2 border-gray-500 p-2 rounded-2xl" />
                <label htmlFor="direction" className="font-bold uppercase pt-5">Direction</label>
                <select onChange={changeHandler} id="direction" defaultValue="to right" className="border-2 border-gray-500 p-2 rounded-2xl">
                    <option value='to right'>Right</option>
                    <option value='to left'>Left</option>
                    <option value='to top'>Top</option>
                    <option value='to bottom'>Bottom</option>
                </select>
                </div>

                <div className="md:flex-grow-6 p-8 bg-gray-400 rounded-2xl">
                    <div 
                    style={{backgroundImage: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`}} 
                    className="rounded-2xl min-h-200 border-2">
                    </div>
                </div>
            </div>
        </Layout>
    )
}