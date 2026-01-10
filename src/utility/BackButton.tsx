import { Link } from "react-router";

export default function BackButton(){
    return (
        <Link 
        className="bg-gray-100 pl-10 pr-10 p-5 text-gray-900 hover:bg-gray-400 rounded-2xl cursor-pointer font-bold uppercase" 
        to="/">
           ← Return to Main
        </Link>
    )
}