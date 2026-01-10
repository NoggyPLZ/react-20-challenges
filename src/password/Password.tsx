import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'

type PasswordGen = {
    length: number;
    uppercase: boolean;
    numbers: boolean;
    lowercase: boolean;
    special: boolean;
}

type BooleanKeys = Exclude<keyof PasswordGen, 'length'>

export default function Password(){
    const [passwordGen, setPasswordGen] = useState<PasswordGen>({
        length: 8,
        uppercase: true,
        numbers: true,
        lowercase: true,
        special: false,
    });
    const [newPassword, setNewPassword] = useState('');
    const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const NUMBERS = '0123456789';
    const SPECIAL = '!@#$%^&*()_-+=';

    const handleRange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPasswordGen(prev => ({
            ...prev,
            length: Number(e.target.value),
        }))
    };

    const handleChange = (value: BooleanKeys) =>{
        setPasswordGen(prev => ({
            ...prev,
            [value]: !prev[value],
        }))
    };

    const generatePassword = () =>{
        let allowed = [];
        let password = []
        if(passwordGen.uppercase) allowed.push(UPPERCASE);
        if(passwordGen.lowercase) allowed.push(LOWERCASE);
        if(passwordGen.numbers) allowed.push(NUMBERS);
        if(passwordGen.special) allowed.push(SPECIAL);

        for(let i = 0; i < passwordGen.length; i++){
            let randomAllowedIndex = Math.floor(Math.random()*allowed.length);
            password.push(allowed[randomAllowedIndex][Math.floor(Math.random()* allowed[randomAllowedIndex].length)])
        }
        setNewPassword(password.join(''));
    }

    const handleCopy = () =>{
        navigator.clipboard.writeText(newPassword);
        toast.success('Copied!', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'dark',
        });
    }

    useEffect(() =>{
        console.log(passwordGen)
        generatePassword();
    },[passwordGen]);

    return ( 
        <Layout>
        <div className="mx-auto w-full max-w-[800px] bg-gray-100 text-gray-800 rounded-2xl p-8 gap-8 flex flex-col">
            <div className="grid grid-cols-2 border-b-2 border-b-gray-200 pb-5">
                <label htmlFor="length" className="col-span-2 font-bold uppercase">length</label>
                <input value={passwordGen.length} onChange={handleRange} id="length" className="mr-5" type="range" min="8" max="32"/>
                <input value={passwordGen.length} disabled className="rounded-2xl bg-gray-800 text-gray-100 p-2 w-[50px] text-center" />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div>
                    <input id="uppercase" type="checkbox" onChange={() => handleChange('uppercase')} checked={passwordGen.uppercase} /> 
                    <label htmlFor="uppercase"> uppercase</label>
                </div>
                <div>
                    <input id="numbers" type="checkbox" onChange={() => handleChange('numbers')} checked={passwordGen.numbers}/> 
                    <label htmlFor="numbers"> numbers</label>
                </div>
                <div>
                    <input id="lowercase" type="checkbox" onChange={() => handleChange('lowercase')} checked={passwordGen.lowercase} /> 
                    <label htmlFor="lowercase"> lowercase</label>
                </div>
                <div>
                    <input id="special" type="checkbox" onChange={() => handleChange('special')} checked={passwordGen.special} /> 
                    <label htmlFor="special"> special</label>
                </div>
            </div>
        </div>
        <div className="mx-auto w-full max-w-[800px] bg-gray-100 text-gray-800 rounded-2xl p-8 gap-8 flex flex-row">
            <input type="text" value={newPassword} className="rounded-2xl bg-gray-800 text-gray-100 p-2 w-[350px]" disabled />
            <button onClick={handleCopy} className="cursor-pointer">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
            </button>
            <ToastContainer />
        </div>
        </Layout>
    )
}