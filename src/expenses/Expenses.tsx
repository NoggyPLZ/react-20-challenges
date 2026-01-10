import Layout from "../components/Layout/Layout";
import { useState, useMemo } from "react";

type List = {
    type: "+" | "-";
    value: string;
    id: string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function Expenses(){
    const [operator, setOperator] = useState('-')
    const [formNumber, setFormNumber] = useState('')
    const [list, setList] = useState<List[]>([])

    const handleNumberChange = (e: ChangeEvent) =>{
        if(/^\d*$/.test(e.target.value)){
            setFormNumber(e.target.value)
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(formNumber !== ''){
            setList(prev => [
                ...prev,
                { type: operator as "+" | "-", value:formNumber, id:Date.now().toString() }
            ]);
            setFormNumber('');
        }
    }

    const removeItem = (listedItem: List) =>{
        setList(list.filter(item => item.id !== listedItem.id))
    }

    const total = useMemo(() =>{
        return list.reduce((acc, item) =>{
            const value = Number(item.value);
            return item.type === '+' ? acc + value : acc - value;
        }, 0);
    }, [list])

    return ( 
        <Layout>
            <div className="text-center text-3xl uppercase">
                <span className="font-black">total:</span> 
                {total >= 0 ? 
                    <span className="text-green-500">{total}</span>
                    : <span className="text-red-500">{total}</span>
                }
            </div>
            <form onSubmit={submitHandler} className="flex flex-row gap-8 max-w-[600] mx-auto">
                <input onChange={handleNumberChange} value={formNumber} type="text" className="border-b-gray-100 border-b-2 focus:outline-0" placeholder="Enter a number" required />
                <select onChange={(e) => setOperator(e.target.value)} value={operator} className="p-4 pl-10 pr-10 rounded-2xl bg-gray-700 text-md text-gray-100 hover:bg-gray-900 cursor-pointer">
                    <option value="-">Expense</option>
                    <option value="+">Revenue</option>
                </select>
                <button type="submit" className="p-4 pl-10 pr-10 rounded-2xl bg-gray-100 text-md text-gray-800 hover:bg-gray-400 cursor-pointer">Submit</button>
            </form>
            <div className="max-w-[400] mx-auto gap-3 flex flex-col">
                {list.length > 0 && list.map((t) =>(
                    <ListItem listItem={t} removeItem={removeItem} key={t.id} />
                ))}
            </div>
        </Layout>
    )
}

type ListItemProp ={
    listItem: List;
    removeItem: (item: List) => void;
}

const ListItem = (props: ListItemProp) =>{
    const {listItem, removeItem} = props;

    return(
        <div className={`flex flex-row gap-10 rounded-2xl p-8 text-gray-100 font-bold justify-between items-center ${listItem.type === '-' ? `bg-red-600`: `bg-green-600`}`}>
            <span className="text-2xl">
                {listItem.type === '-' ? 'Exspense -$' : 'Revenue +$'}
                {listItem.value}
            </span>
            <button className="p-4 pl-10 pr-10 rounded-2xl bg-gray-100 text-md text-gray-800 hover:bg-gray-400 cursor-pointer" onClick={() => removeItem(listItem)}> remove </button>
        </div>
    )
}